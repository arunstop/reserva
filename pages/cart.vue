<script lang="ts" setup>
  import { ICartItem } from '~~/composables/storeCart'

  const cart = useCart()

  function handleFormChange(key: string, item: ICartItem) {
    cartAdd(key, item)
  }
  function handleFormClear(key: string) {
    cartRemove(key)
  }
</script>
<template>
  <div class="flex flex-col gap-2 sm:gap-4">
    <div
      v-for="[key, data] in cart"
      :key="key"
      class="flex flex-col p-2 sm:p-4 gap-[inherit]"
    >
      <span>{{ key }}</span>
      <EventBookingForm
        :data="data"
        :form-key="key"
        :on-change="handleFormChange"
        @clear="() => handleFormClear(key)"
      />
    </div>
  </div>
</template>
