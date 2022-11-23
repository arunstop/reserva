<script setup lang="ts">
import { IPost } from '~~/composables/types'
const props = defineProps<{ post: IPost }>()
const { completed, id, title, userId, body } = props.post
</script>
<template>
    <div class="min-h-[5rem] flex flex-col  bg-gray-300 backdrop-blur-md rounded-xl h-full
        hover:bg-blue-500 transition-colors duration-500 hover:cursor-pointer overflow-hidden group">
        <div class="overflow-hidden relative">
            <figure
                class="sm:h-30 h-60 bg-no-repeat bg-cover bg-center transition-all group-hover:scale-125 duration-500 ease-out"
                :style="{
                    backgroundImage: `url('https://picsum.photos/id/${id}/300/300')`
                }" />
            <div class="bg-gray-300 absolute z-10 bottom-0 text-center font-bold p-px sm:px-1 rounded-tr-xl min-w-[40%]
                group-hover:bg-blue-500 transition-colors duration-500">
                50 / 500
            </div>
        </div>
        <div class="flex flex-col  flex-1 gap-1 sm:gap-2">
            <div class="flex flex-col gap-1 p-2 sm:p-4">
                <span class="inline-flex gap-px sm:gap-1">
                    <span class="uppercase text-xs sm:text-sm">{{ `25 AUG - 30 NOV` }}</span>
                </span>

                <span class="sm:text-lg first-letter:capitalize font-bold">{{ title.substring(0, 30) }}</span>

                <span class="inline-flex items-center gap-px sm:gap-1">
                    <i-mdi-map-marker class="text-red-500" />
                    <span class="text-xs sm:text-sm">{{ `New York` }}</span>
                </span>
            </div>
            <span class="mt-auto ml-auto text-end p-1 sm:p-2 text-red-500 group-hover:text-white rounded-tl-xl  
            group-hover:bg-red-500 bg-red-500/10 font-bold transition-all duration-500 text-sm sm:text-base">
                {{ `IDR 5.000.000` }}
            </span>
        </div>
    </div>
</template>