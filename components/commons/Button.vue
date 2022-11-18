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
        class="rounded-xl ring-2 ring-white px-1 py-2 text-white"
        @click="onClick"
    >
        {{ text }}
    </button>
</template>
