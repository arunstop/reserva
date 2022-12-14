<script lang="ts" setup>
  import { ICartItem } from '~~/composables/storeCart'

  definePageMeta({
    layout: 'cart-layout',
  })
  const cart = useCart()
</script>
<template>
  <div
    class="grid lg:grid-cols-2 xl:grid-cols-3 grid-flow-row-dense gap-2 sm:gap-4 min-h-screen p-2 sm:p-4 [&>*]:h-fit auto-rows-min"
  >
    <div
      v-if="!cart.size"
      class="flex flex-col w-full col-span-full p-4 sm:p-8 items-center justify-center gap-i"
    >
      <div class="text-4xl sm:text-5xl text-gray-900">
        <i-mdi-robot-confused-outline />
      </div>
      <span class="text-xl sm:text-2xl font-medium text-gray-500">Cart is empty</span>
      <NuxtLink to="/#section-feed">
        <CommonsButton class="">
          Add Something
        </CommonsButton>
      </NuxtLink>
    </div>
    <LazyMainCartItem v-for="item in cart" :key="item[0]" :data="item" />
  </div>
</template>
