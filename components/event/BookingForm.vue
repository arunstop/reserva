<script setup lang="ts">
  import { ICartItem } from '~~/composables/storeCart'
  import { IOrder } from '~~/composables/types'
  const props = defineProps<{
    data: ICartItem
    onClose?: () => void
    onChange?: (key :string,cartItem:ICartItem) => void
    onClear?: () => void
    formKey:string
    noButtons?: boolean
    spots:IOrder[]
  }>()
  

  const selectedSpots = computed(() =>
    Array.from(props.data.values()).map((f) => f.name)
  )

  function addBooking(order?: IOrder) {
    if (!order) {
      // get spots without the current ones that already updated
      const newBooking = props.spots.filter(
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

  // onMounted(() => {
  //   props.onChange?.(() => {
  //     console.log(props.data.size)
  //   })
  // })

  watch(
    () => props.data.entries(),
    (val, prev) => {
      props.onChange?.(props.formKey,props.data)
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
    <div v-if="!noButtons" class="flex gap-[inherit]">
      <CommonsButton
        v-if="selectedSpots.length < spots.length"
        class="self-start max-sm:w-full"
        @click="() => addBooking()"
      >
        <i-mdi-check-bold class="text-lg sm:text-xl hidden sm:block" />
        <span class="">Add more</span>
      </CommonsButton>
      <CommonsButton
        v-if="!!onClear"
        class="self-start max-sm:w-full from-pink-500 to-red-500"
        @click="() => onClear?.()"
      >
        <i-mdi-close-bold class="text-lg sm:text-xl hidden sm:block" />
        <span class="">Remove</span>
      </CommonsButton>
    </div>
    <slot name="buttons" :add-booking="addBooking" :maxed="selectedSpots.length < spots.length" />
  </div>
</template>
