<script setup lang="ts">
  import { IOrder } from '~~/composables/types'
  const props = defineProps<{
    onClose?: () => void
    onChange?: (confirm: () => void) => void
  }>()
  const spots: IOrder[] = [
    { id: '1', name: '1 November 2022', qty: 18, stock: 100 },
    { id: '2', name: '2 November 2022', qty: 28, stock: 100 },
    { id: '3', name: '3 November 2022', qty: 17, stock: 100 },
    { id: '4', name: '4 November 2022', qty: 88, stock: 100 },
    { id: '5', name: '5 November 2022', qty: 16, stock: 100 },
  ]

  const bookingList = ref<Map<string, IOrder>>(
    new Map<string, IOrder>([
      [
        Date.now() + '',
        { id: Date.now() + '', name: '1 November 2022', qty: 18, stock: 1 },
      ],
    ])
  )
  const selectedSpots = computed(() =>
    Array.from(bookingList.value.values()).map((f) => f.name)
  )

  function addBooking(order?: IOrder) {
    if (!order) {
      // get spots without the current ones that already updated
      const newBooking = spots.filter(
        (e) => !selectedSpots.value.includes(e.name)
      )?.[0]
      if (!newBooking) return
      return bookingList.value.set(Date.now() + '', newBooking)
    }
    bookingList.value.set(Date.now() + '', order)
  }

  function updateBooking(order: [string,IOrder]) {
    // check if the updated data is the same as
    if (
      JSON.stringify(order) === JSON.stringify(bookingList.value.get(order[1].id))
    )
      return
    bookingList.value.set(order[0], order[1])
  }

  function removeBooking(orderId: string) {
    console.log(orderId)
    if (bookingList.value.size < 2) return
    bookingList.value.delete(orderId)
  }

  onMounted(() => {
    props.onChange?.(() => {
      console.log(bookingList.value.size)
    })
  })

  watch(
    () => bookingList.value.entries(),
    (val, prev) => {
      props.onChange?.(() => {
        console.log(bookingList.value.size)
      })
    }
  )
  
</script>
<template>
  <div class="min-h-full sm:min-h-[auto] sm:h-auto flex flex-col gap-[inherit]">
    <LazyEventBookingItem
      v-for="(booking, idx) in bookingList"
      :key="booking[0] + idx"
      :booking="booking"
      :closeable="bookingList.size < 2"
      :on-remove="() => removeBooking(booking[0])"
      :on-update="(data) => updateBooking(data)"
      :spots="spots"
      :selected-spots="selectedSpots"
    />
    <CommonsButton class="self-start max-sm:w-full" @click="() => addBooking()">
      <i-mdi-check-bold class="text-lg sm:text-xl hidden sm:block" />
      <span class="">Add more</span>
    </CommonsButton>
  </div>
</template>
