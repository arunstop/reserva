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
    <button class="rounded-xl bg-gradient-to-br px-1 py-1 sm:px-2 sm:py-2 text-white from-cyan-500 to-purple-500 font-bold
        text-base sm:text-lg active:scale-95 transition-all sm:hover:ring-2 hover:ring-1 hover:ring-white active:!ring-[3px]
        duration-100 sm:active:!ring-[6px]" @click="onClick">
        <span v-if="text" class="">
            {{ text }}
        </span>
        <slot v-else/>
    </button>
</template>
