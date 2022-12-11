<script lang="ts" setup>
  import { ICartItem } from '~~/composables/storeCart'

  const cart = useCart()

  const route = useRoute()
  const confirmation = computed(() => route.query?.confirmation)
  definePageMeta({
    layout: 'cart-layout',
  })
</script>
<template>
  <div
    class="grid lg:grid-cols-2 xl:grid-cols-3 grid-flow-row-dense gap-2 sm:gap-4 min-h-screen p-2 sm:p-4 [&>*]:h-fit auto-rows-min"
  >
    <MainCartItem v-for="item in cart" :key="item[0]" :data="item" />
  </div>
  <MainConfirmationModal :show="!!confirmation" :close="() => $router.back()" :persistent="false" />
</template>
