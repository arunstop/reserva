<script setup lang="ts">
  defineProps<{
    message: string
    onAction?: () => void
    actionLabel: string
  }>()
</script>
<template>
  <div
    class="flex flex-col w-full p-4 sm:p-8 items-center justify-center gap-2 sm:gap-4"
  >
    <div class="text-4xl sm:text-5xl text-gray-900">
      <slot name="icon" />
      <slot name="default">
        <i-mdi-robot-confused-outline />
      </slot>
    </div>
    <span class="text-xl sm:text-2xl font-medium text-gray-500">{{
      message.trim() || 'Something just happened'
    }}</span>
    <CommonsButton class="" @click="onAction">{{
      actionLabel.trim() || 'Do something'
    }}</CommonsButton>
  </div>
</template>
