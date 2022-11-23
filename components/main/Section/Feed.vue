<script lang="ts" setup>
import { IPost } from '~~/composables/types'
const { data: posts } = await useFetch<IPost[]>('https://jsonplaceholder.typicode.com/posts')
</script>
<template>
    <section class="flex  min-h-screen bg-gradient-to-bl  from-violet-800 to-cyan-400 text-center p-2 sm:p-4">
        <div class="flex flex-col rounded-xl w-full place-self-stretch  bg-zinc-400/50 backdrop-blur-md p-4 sm:p-8">
            <div v-if="!posts || !posts.length">Data is non-existent</div>

            <div v-else class="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 [&>*>*]:h-full">
                <NuxtLink v-for="(post, idx) in posts" :to="`/post/${post.id}`">
                    <PostItem :post="post" />
                </NuxtLink>
            </div>
        </div>
    </section>
</template>