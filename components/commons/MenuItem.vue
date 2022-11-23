<script setup lang="ts">
const props = defineProps({
    active: Boolean,
    title: { type: String, required: true, default: '' }
})
</script>
<template>
    <div class="text-xl font-bold rounded-xl p-2 aspect-video text-white items-center flex" :class="`${active ? `bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500 text-transparent font-black`
    : ``}`">
        <span v-if="title">{{ title }}</span>
        <slot v-else />
    </div>
</template>
