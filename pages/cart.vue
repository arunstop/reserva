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
    <CommonsBigAlert
      v-if="!cart.size"
      class="col-span-full gap-i"
      message="Cart is empty"
      action-label="Add Something"
      @action="() => navigateTo(`/#section-feed`)"
    />
    <LazyMainCartItem v-for="item in cart" :key="item[0]" :data="item" />
  </div>
</template>
