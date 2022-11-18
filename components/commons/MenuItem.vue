<script lang="ts">
export default {
    props: {
        title: String,
        active: String,
    },
}
</script>
<template>
    <div
        class="text-xl font-bold rounded-xl p-2 aspect-video text-white"
        :class="`${active ? 'ring-2 ring-white' : 'bg-cyan-400'}`"
    >
        <span>{{ title }}</span>
    </div>
</template>
