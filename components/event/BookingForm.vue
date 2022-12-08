<script setup lang="ts">
  import { IOrder } from '~~/composables/types'
  const props = defineProps<{
    data: Map<string, IOrder>
    onClose?: () => void
    onChange?: (confirm: () => void) => void
  }>()
  const spots: IOrder[] = [
    { id: '1', name: '1 November 2022', qty: 18, stock: 100, price: 100000 },
    { id: '2', name: '2 November 2022', qty: 28, stock: 100, price: 100000 },
    { id: '3', name: '3 November 2022', qty: 17, stock: 100, price: 100000 },
    { id: '4', name: '4 November 2022', qty: 88, stock: 100, price: 100000 },
    { id: '5', name: '5 November 2022', qty: 16, stock: 100, price: 100000 },
  ]

  const selectedSpots = computed(() =>
    Array.from(props.data.values()).map((f) => f.name)
  )

  function addBooking(order?: IOrder) {
    if (!order) {
      // get spots without the current ones that already updated
      const newBooking = spots.filter(
        (e) => !selectedSpots.value.includes(e.name)
      )?.[0]
      if (!newBooking) return
      return props.data.set(Date.now() + '', { ...newBooking, qty: 1 })
    }
    props.data.set(Date.now() + '', { ...order, qty: 1 })
  }

  function updateBooking(order: [string, IOrder]) {
    // check if the updated data is the same as
    if (JSON.stringify(order) === JSON.stringify(props.data.get(order[1].id)))
      return
    props.data.set(order[0], order[1])
  }

  function removeBooking(orderId: string) {
    console.log(orderId)
    if (props.data.size < 2) return
    props.data.delete(orderId)
  }

  onMounted(() => {
    props.onChange?.(() => {
      console.log(props.data.size)
    })
  })

  watch(
    () => props.data.entries(),
    (val, prev) => {
      props.onChange?.(() => {
        console.log(Array.from(props.data.values()))
      })
    }
  )
</script>
<template>
  <div class="min-h-full sm:min-h-[auto] sm:h-auto flex flex-col gap-[inherit]">
    <EventBookingItem
      v-for="(booking, idx) in data"
      :key="booking[0] + idx"
      :booking="booking"
      :closeable="data.size < 2"
      :on-remove="() => removeBooking(booking[0])"
      :on-update="(data) => updateBooking(data)"
      :spots="spots"
      :selected-spots="selectedSpots"
    />
    <CommonsButton
      v-if="selectedSpots.length < spots.length"
      class="self-start max-sm:w-full"
      @click="() => addBooking()"
    >
      <i-mdi-check-bold class="text-lg sm:text-xl hidden sm:block" />
      <span class="">Add more</span>
    </CommonsButton>
  </div>
</template>
