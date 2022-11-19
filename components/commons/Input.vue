<script lang="ts">
export default {
    props: {
        modelValue: { type: String, default: '', required: true },
    },
    emits: ['update:modelValue'],
    methods: {
        onChange(event: Event) {
            return (event.target as HTMLInputElement).value
        },
    },
}
</script>
<template>
    <input
        class="rounded-xl min-h-[3rem] p-1"
        :value="modelValue"
        @input="$emit('update:modelValue', onChange($event))"
    />
</template>
