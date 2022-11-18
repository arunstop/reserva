<script setup>
const count = ref(0)
const increase = () => count.value++
const decrease = () => count.value--
</script>

<template>
    <div
        class="flex gap-4 bg-red-500/70 flex-col items-center p-2 sm:p-4 backdrop-blur-md"
    >
        <span class="text-2xl sm:text-3xl">Counter app</span>
        <div class="grid grid-cols-2 gap-4">
            <span class="text-5xl col-span-2 text-center">{{ count }}</span>
            <CommonsButton text="Decrease" :on-click="decrease" />
            <CommonsButton text="Increase" :on-click="increase" />
        </div>
    </div>
</template>
