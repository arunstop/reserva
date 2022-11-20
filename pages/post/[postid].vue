<script setup lang="ts">
import { IPost, IComment } from '~~/composables/types'
const route = useRoute()
const promisePost = useFetch<IPost>('https://jsonplaceholder.typicode.com/posts/1')
const promiseComments = useFetch<IComment[]>(`https://jsonplaceholder.typicode.com/comments?postId=${route.params.postid as string}`)
const { data: post } = await promisePost
const { data: comments } = await promiseComments

</script>
<template>
    <div class="flex flex-col gap-2 sm:gap-4">
        <div v-if="!post">Cannot found post with id : {{ $route.params.postid }}</div>
        <PostItem v-else :post="post" />
        <div class="flex flex-col gap-2 sm:gap-4">
            <CommentItem v-for="comment in comments" :comment="comment"/>
        </div>
    </div>
</template>