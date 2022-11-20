<script setup lang="ts">
import { PropType } from 'vue'
import { IComment } from '~~/composables/types'

const props = defineProps({
    comment: {
        type: Object as PropType<IComment>, required: true
    }
})
</script>
<template>
    <div 
    class="flex gap-2 sm:gap-4 rounded-xl bg-lime-500/30 p-2 sm:p-4 hover:shadow-lg transition-all duration-500 
    hover:bg-lime-500">
        <img class="h-9 aspect-square rounded-full ring-white/50 ring-1"
            :src="`https://picsum.photos/${comment.id}/200`" />
        <div class="first-letter:capitalize">
            {{ comment.body }}
        </div>
    </div>
</template>