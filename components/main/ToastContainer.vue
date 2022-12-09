<script setup lang="ts">
  const toasts = useToast()
</script>
<template>
  <div
    class="flex flex-col fixed inset-0 z-[100] justify-end items-center p-2 sm:p-4 pointer-events-none [&>*]:pointer-events-auto gap-2 sm:gap-4"
  >
    <CommonsToastItem
      v-for="[key, toast] in toasts"
      :key="key"
      :toast="toast"
    >
      {{ toast.message }}
    </CommonsToastItem>
  </div>
</template>
