<script setup lang="ts">
  import { IPost } from '~~/composables/types'

  interface IOrder {
    id: string
    name: string
    qty: number
    stock: number
  }
  defineProps<{ post: IPost }>()
  const route = useRoute()
  const user = useUser()
  const cart = useCart()

  const reserveModal = ref('')

  function reserve() {
    navigateTo({
      query: {
        reserving: 123,
      },
    })
  }

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

  onMounted(() => {
    reserveModal.value = (route.query.reserving as string) || ''
  })

  watch(
    () => (route.query.reserving as string) || '',
    (val, prev) => {
      // if(!val) return;
      // console.log(val)
      const newId = val.trim()
      if (newId === reserveModal.value) return
      reserveModal.value = newId
    }
  )
</script>
<template>
  <nav
    class="flex justify-center bg-stone-700/40 p-2 sticky top-0 z-10 backdrop-blur-sm min-h-[4rem]"
  >
    <div class="flex gap-2 items-center justify-between w-full max-w-7xl">
      <div class="flex gap-[inherit] items-center">
        <span class="font-bold">50 / 500</span>
        <CommonsChip class="text-red-300 text-sm sm:text-base">
          <i-mdi-alert-circle-outline class="text-lg sm:text-xl" />
          <span>13 hours left</span>
        </CommonsChip>
      </div>
      <div class="flex gap-[inherit]">
        <NuxtLink :to="`/cart`">
          <CommonsButton class="flex from-yellow-500 to-red-500">
            <i-mdi-cart class="text-lg sm:text-xl" />
            <span class="hidden sm:block">Add to cart {{ cart.size }}</span>
          </CommonsButton>
        </NuxtLink>
        <CommonsButton
          class="flex from-pink-500 to-purple-500"
          @click="reserve"
        >
          <i-mdi-check-bold class="text-lg sm:text-xl" />
          <span class="hidden sm:block">Reserve</span>
        </CommonsButton>
      </div>
    </div>
  </nav>
  <LazyEventBookingModal
    :key="'same'"
    :show="!!reserveModal"
    :close="closeModal"
    :post="post"
  />
  <MainToastContainer />
</template>
