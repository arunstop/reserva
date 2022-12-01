<script setup lang="ts">
  import { IOrder, IPost } from '~~/composables/types'

  defineProps<{
    post: IPost
    show: boolean
    close: () => void
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
      ['1', { id: '1', name: '1 November 2022', qty: 18, stock: 1 }],
    ])
  )

  function closeModal() {
    navigateTo(
      {
        query: {},
      },
      {
        replace: true,
      }
    )
  }

  function addBooking(order?: IOrder) {
    if (!order) {
      const newId = Math.random() + ''
      return bookingList.value.set(newId, {
        id: newId,
        name: '1 November 2022',
        qty: 1,
        stock: 100,
      })
    }
    bookingList.value.set(order.id, order)
  }

  function updateBooking(order: IOrder) {
    // check if the updated data is the same as
    if (
      JSON.stringify(order) === JSON.stringify(bookingList.value.get(order.id))
    )
      return
    console.log(order)
    bookingList.value.set(order.id, order)
  }

  function removeBooking(orderId: string) {
    if (bookingList.value.size < 2) return
    bookingList.value.delete(orderId)
  }
</script>
<template>
  <CommonsModal :show="show" :close="close">
    <template #header>
      <div class="text-lg font-medium leading-6 text-gray-900">
        Reserve your place @ {{ post.title }}
      </div>
    </template>
    <template #content>
      <div
        class="min-h-full sm:min-h-[auto] sm:h-auto flex flex-col gap-[inherit]"
      >
        <EventBookingItem
          v-for="(booking, idx) in bookingList"
          :key="idx"
          :order="booking[1]"
          :closeable="bookingList.size < 2"
          :on-remove="() => removeBooking(booking[0])"
          :on-update="(data) => updateBooking(data)"
          :spots="spots"
        />
        <CommonsButton
          class="self-start max-sm:w-full"
          @click="() => addBooking()"
        >
          <i-mdi-check-bold class="text-lg sm:text-xl hidden sm:block" />
          <span class="">Add more</span>
        </CommonsButton>
      </div>
    </template>
    <template #footer>
      <div
        class="flex flex-col max-sm:gap-2 sm:items-end w-full sticky bottom-0 sm:static"
      >
        <CommonsButton class="max-sm:w-full" @click="closeModal">
          <i-mdi-check-bold class="text-lg sm:text-xl hidden sm:block" />
          <span class="text-lg">Reserve my spot</span>
        </CommonsButton>
        <CommonsButton
          class="sm:hidden max-sm:w-full bg-none bg-black/50"
          @click="closeModal"
        >
          <i-mdi-check-bold class="text-lg sm:text-xl hidden sm:block" />
          <span class="text-lg">Cancel</span>
        </CommonsButton>
      </div>
    </template>
  </CommonsModal>
</template>
