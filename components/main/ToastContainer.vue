<script setup lang="ts">
import { Dialog } from '@headlessui/vue'

  const toasts = useToast()
</script>
<template>
  <Dialog
    :open="!!toasts.size"
    class="flex flex-col fixed inset-0 z-[100] justify-end items-center p-2 sm:p-4 pointer-events-none [&>*]:pointer-events-auto gap-2 sm:gap-4"
  >
    <CommonsToastItem
      v-for="[key, toast] in toasts"
      :key="key"
      v-memo="[key]"
      :toast="toast"
    />
  </Dialog>
</template>
