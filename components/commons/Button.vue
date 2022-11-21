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
        class="rounded-xl ring-2 ring-emerald-500/50 px-1 py-2 text-emerald-500"
        @click="onClick"
    >
        {{ text }}
    </button>
</template>
