<script setup lang="ts">import { PropType } from 'vue'
import { IPost } from '~~/composables/types'
const props = defineProps({
    post: { type: Object as PropType<IPost>, required: true },
})
const { completed, id, title, userId, body } = props.post
</script>
<template>
    <div class="p-4 sm:p-6 min-h-[5rem] flex flex-col gap-1 sm:gap-2 bg-green-500/50 backdrop-blur-md rounded-xl 
        hover:bg-green-500 transition-colors duration-500 hover:cursor-pointer">
        <span class="text-lg sm:text-xl first-letter:capitalize font-bold">{{ title }}</span>
        <span class="first-letter:font-bold first-letter:text-lg sm:first-letter:text-xl first-letter:capitalize text-sm 
        sm:text-base">{{
                body
        }}</span>
    </div>
</template>