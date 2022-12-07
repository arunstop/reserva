<script setup lang="ts">
  import { TransitionRoot } from '@headlessui/vue'
  import { IOrder, IPost } from '~~/composables/types'

  defineProps<{
    post: IPost
    show: boolean
    close: () => void
  }>()

  const bookingList = ref<Map<string, IOrder>>(
    new Map<string, IOrder>([
      [
        Date.now() + '',
        { id: Date.now() + '', name: '1 November 2022', qty: 18, stock: 1 },
      ],
    ])
  )

  const confirmation = ref<() => void>(() => null)
  const loading = ref(true)
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

  function changeList(newConfirm: () => void) {
    confirmation.value = newConfirm
  }

  function setLoading(val?: boolean) {
    console.log(val)
    loading.value = !!val
  }

  async function confirm() {
    setLoading(true)
    const wait = new Promise((resolve, reject) =>
      setTimeout(() => {
        resolve(123)
      }, 3000)
    )
    console.log(await wait)
    setLoading(false)

    confirmation.value()
  }
</script>
<template>
  <CommonsModal :show="show" :close="close" :persistent="loading">
    <template #header>
      <div class="text-lg font-medium leading-6 text-gray-900">
        Reserve your place @ {{ post.title }}
      </div>
    </template>
    <template #content>
      <EventBookingForm
        :data="bookingList"
        :on-close="closeModal"
        :on-change="changeList"
      />
    </template>
    <template #footer>
      <div
        class="flex flex-col max-sm:gap-2 sm:items-end w-full sticky bottom-0 sm:static"
      >
        <CommonsButton class="max-sm:w-full" @click="confirm">
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
    <TransitionRoot
      :show="loading"
      enter="transition-all ease-linear duration-500"
      enter-from="opacity-10 scale-125"
      enter-to="opacity-100 scale-100"
      leave="transition-all ease-linear duration-500"
      leave-from="opacity-100 [&>div:only-child]:scale-100"
      leave-to="opacity-10 [&>div:only-child]:scale-75"
      class="absolute inset-0 z-10 flex justify-center items-center bg-black/60 pointer-events-none"
    >
      <div class="transition-all duration-500 pointer-events-auto flex flex-col gap-2 sm:gap-4">
        <span class="text-white text-xl">Loading...</span>
        <CommonsButton text="Cancel" :on-click="()=>setLoading(false)" />
      </div>
    </TransitionRoot>
  </CommonsModal>
</template>
