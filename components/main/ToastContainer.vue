<script setup lang="ts">
import { Dialog } from '@headlessui/vue'

  const toasts = useToast()
</script>
<template>
  <div
    class="flex fixed inset-0 z-[100] pointer-events-none "
  >
    <TransitionGroup
      tag="div"
      class="flex flex-col justify-end items-center sm:items-start p-2 sm:p-4 pointer-events-none
       gap-1 sm:gap-2 w-full"
      move-class="transition-all duration-200 "
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 scale-50 translate-y-[100%]"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in  pointer-events-none absolute"
      leave-from-class="opacity-100 scale-100 top-0"
      leave-to-class="opacity-0 scale-0 -top-[1px]"
    >
      <CommonsToastItem
        v-for="[key, toast] in toasts"
        :key="key"
        v-memo="[key]"
        :toast="toast"
      />
    </TransitionGroup>
  </div>
</template>
