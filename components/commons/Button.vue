<script lang="ts">
import type { PropType } from 'vue'

export default {
    props: {
        text: String,
        onClick: Function as PropType<() => void>,
    },
}
</script>
<template>
  <button
    class="rounded-lg sm:rounded-xl bg-gradient-to-br px-1.5 py-1 sm:px-3 sm:py-2 text-white from-cyan-500 
    to-purple-500 font-bold text-sm sm:text-lg active:scale-95 transition-all sm:hover:ring-2 hover:ring-1
     hover:ring-gray-500/50 active:!ring-[3px] duration-100 active:ring-gray-500/50 sm:active:!ring-[6px] flex gap-1 
     sm:gap-2 items-center justify-center disabled:cursor-not-allowed disabled:opacity-20 disabled:pointer-events-none
     disabled:transition-none"
    @click="onClick"
  >
    <span
      v-if="text"
      class=""
    >
      {{ text }}
    </span>
    <slot v-else />
  </button>
</template>
