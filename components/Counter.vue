<script setup>
const props = defineProps({
    start: { type: Number, required: true },
})

const count = useCounter();

// methods 
const increase = () => {
    counterPlus()
}
const decrease = () => {
    counterMinus()
}
</script>

<template>
    <div class="flex gap-4 bg-red-500/70 flex-col items-center p-2 sm:p-4 backdrop-blur-md">
        <span class="text-2xl sm:text-3xl">Counter app, starts at {{ start }}</span>
        <div class="grid grid-cols-2 gap-4">
            <span class="text-5xl col-span-2 text-center">{{ count }}</span>
            <CommonsButton text="Decrease" :on-click="decrease" />
            <CommonsButton text="Increase" :on-click="increase" />
        </div>
    </div>
</template>
