<script setup lang="ts">
  import { TransitionRoot } from '@headlessui/vue'
  import { IOrder, IPost } from '~~/composables/types'

  type INetState = 'SUCCESS' | 'ERROR' | 'PENDING' | null

  const props = defineProps<{
    post: IPost
    show: boolean
    close: () => void
  }>()

  const bookingList = ref<Map<string, IOrder>>(
    new Map<string, IOrder>([
      [
        Date.now() + '',
        {
          id: Date.now() + '',
          name: '1 November 2022',
          qty: 1,
          stock: 1,
          price: 100000,
        },
      ],
    ])
  )

  const totalPrice = computed(() => {
    return Array.from(bookingList.value.values()).reduce(
      (acc, e) => acc + e.price * e.qty,
      0
    )
  })

  const confirmation = ref<() => void>(() => null)
  const loading = ref<INetState>()

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
    loading.value = val ? 'PENDING' : null
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
    toastAdd({
      title: 'Spot Booked',
      message: 'Spot Booked',
      type: 'SUCCESS',
      duration: 3000,
      clickToClose:true,
    })

    confirmation.value()
  }

  function getLoadingStyle(state?: INetState) {
    if (state === 'ERROR') return `bg-red-900/60`
    if (state === 'SUCCESS') return `bg-green-900/60`
    if (state === 'PENDING') return `bg-black/60`
    return `bg-black/60`
  }

  function addToCart() {
    toastAdd({
      title: 'Added to cart',
      message: 'Added to cart',
      type: 'SUCCESS',
      duration: 3000,
      clickToClose:true,  
    })
  }

  watch(
    () => props.show,
    (val, prev) => {
      if (!val) return (loading.value = null)
    }
  )
</script>
<template>
  <CommonsModal :show="show" :close="close" :persistent="loading === `PENDING`">
    <template #header>
      <div class="text-lg font-medium leading-6 text-gray-900">
        Reserve your place @ {{ post.title }}
      </div>
    </template>
    <template #content>
      <EventBookingForm
        :class="loading ? 'opacity-50' : ''"
        :data="bookingList"
        :on-close="closeModal"
        :on-change="changeList"
      />
    </template>
    <template #footer>
      <div
        class="flex flex-col gap-2 sm:gap-4 sm:items-end w-full sticky bottom-0 sm:static"
      >
        <div class="flex justify-end">
          <span class="font-bold text-base sm:text-xl">{{
            `Rp. ${totalPrice.toLocaleString()}`
          }}</span>
        </div>
        <CommonsButton
          class="max-sm:w-full from-yellow-500 to-red-500"
          :disabled="loading"
          @click="addToCart"
        >
          <i-mdi-cart class="text-lg sm:text-xl hidden sm:block" />
          <span class="text-lg">Add to cart</span>
        </CommonsButton>
        <CommonsButton
          class="max-sm:w-full"
          :disabled="loading"
          @click="confirm"
        >
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
      :show="!!loading"
      enter="transition-all ease-linear duration-500"
      enter-from="opacity-10 scale-125 [&>div:only-child]:translate-y-[100px]"
      enter-to="opacity-100 scale-100 [&>div:only-child]:translate-y-0"
      leave="transition-all ease-linear duration-200"
      leave-from="opacity-100 [&>div:only-child]:scale-100"
      leave-to="opacity-10 [&>div:only-child]:scale-150"
      class="absolute inset-0 z-10 flex justify-center items-center transition-all"
      :class="getLoadingStyle(loading)"
      as="div"
    >
      <div
        class="transition-all duration-500 flex flex-col gap-2 sm:gap-4 pointer-events-auto"
      >
        <template v-if="loading === `PENDING`">
          <span class="text-white text-base sm:text-xl font-bold text-center">Loading...</span>
          <CommonsButton
            text="Cancel"
            :disabled="!loading"
            @click="() => setLoading(false)"
          />
        </template>
        <template v-else-if="loading === `SUCCESS`">
          <span class="text-white text-base sm:text-xl font-bold text-center">Success...</span>
          <CommonsButton
            text="Continue"
            :disabled="!loading"
            @click="() => setLoading(false)"
          />
        </template>
        <template v-else-if="loading === `ERROR`">
          <span class="text-white text-base sm:text-xl font-bold text-center">Error...</span>
          <CommonsButton
            text="Try again"
            :disabled="!loading"
            @click="() => setLoading(false)"
          />
        </template>
      </div>
    </TransitionRoot>
  </CommonsModal>
</template>
