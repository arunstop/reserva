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
    <div
        class="flex rounded-xl isolate bg-zinc-100 items-center [&>*:first-child]:flex-1  [&>*:last-child:not(input)]:flex-1">
        <slot name="lead" />
        <input class="min-h-[1.5rem] sm:min-h-[3rem] p-2 first:rounded-l-xl only:rounded-xl last:rounded-r-xl bg-transparent outline-none focus:bg-zinc-300 
        self-stretch transition-colors duration-500 peer w-full text-xs sm:text-base" :value="modelValue"
            v-bind="$attrs" @input="$emit('update:modelValue', onChange($event))" />
        <slot name="trail" />
    </div>
</template>
