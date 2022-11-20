
<script setup lang="ts">
import { IPost } from '~~/composables/types'
const { data: posts } = await useFetch<IPost[]>('https://jsonplaceholder.typicode.com/posts')
</script>
<template>
    <div class="p-2 sm:p-4 items-center flex flex-col">
        <span>Data fetching</span>
        <div v-if="!posts || !posts.length">Data is non-existent</div>

        <div v-else class="flex-col gap-2 grid">
            <NuxtLink v-for="(post, idx) in posts" :to="`/post/${post.id}`">
                <PostItem :post="post" />
            </NuxtLink>
        </div>
    </div>
</template>