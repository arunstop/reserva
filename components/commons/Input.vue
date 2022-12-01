<script lang="ts" setup>
  defineProps<{ modelValue: string | number }>()
  defineEmits(['update:modelValue'])

  function onChange(event: Event) {
    return (event.target as HTMLInputElement).value
  }
</script>
<template>
  <div class="flex rounded-xl isolate bg-zinc-100">
    <slot name="lead" />
    <input
      class="min-h-[1.5rem] sm:min-h-[3rem] py-1 px-1.5 sm:py-2 sm:px-3 first:rounded-l-xl only:rounded-xl last:rounded-r-xl bg-transparent outline-none focus:bg-zinc-300 self-stretch transition-colors duration-500 peer w-full text-xs sm:text-base"
      :value="modelValue"
      v-bind="$attrs"
      @input="$emit('update:modelValue', onChange($event))"
    />
    <slot name="trail" />
  </div>
</template>
