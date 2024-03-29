<script setup lang="ts">
  import { IPost, IComment } from '~~/composables/types'
  definePageMeta({
    layout: 'details',
  })
  const route = useRoute()
  const promisePost = useFetch<IPost>(
    `https://jsonplaceholder.typicode.com/posts/${route.params.postid}`,
    {}
  )
  const { data: post } = await promisePost
  const { pending: loadingComments, data: comments } = useLazyAsyncData<
    IComment[]
  >(
    'comments',
    () =>
      $fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${
          route.params.postid as string
        }`
      ),
    {
      server: false,
    }
  )
  const formattedTitle = (str: string) =>
    `${str.charAt(0).toUpperCase()}${str.slice(1, 100)}`

  useHead({
    title: !post.value
      ? 'Reserva - Get your reservation here'
      : `${formattedTitle(post.value.title)} - Reserva`,
  })
</script>

<template>
  <EventActionHeader v-if="post" :post="post" />
  <section v-if="post" class="flex min-h-screen justify-center">
    <article class="flex flex-col gap-2 sm:gap-4 max-w-7xl p-4 sm:p-8">
      <!-- Post not found -->
      <div v-if="!post">
        Cannot found post with id : {{ $route.params.postid }}
      </div>
      <!-- Post poster -->
      <EventPoster :post="post" />
      <!-- Post title -->
      <h1 class="text-2xl sm:text-3xl first-letter:capitalize font-bold">
        {{ post.title }}
      </h1>
      <!-- Time -->
      <div class="flex items-center gap-2 sm:gap-4">
        <Icon name="mdi:calendar" class="text-lg sm:text-xl" />
        <h2 class="text-lg sm:text-xl first-letter:capitalize font-semibold">
          25 August 07:00 - 20 November 21:00
        </h2>
      </div>
      <!-- Place -->
      <div class="flex items-center gap-2 sm:gap-4">
        <Icon name="mdi:map-marker" class="text-lg sm:text-xl" />
        <h2 class="text-lg sm:text-xl first-letter:capitalize font-semibold">
          New York
        </h2>
        <h3 class="">
          177A Bleecker Street
        </h3>
      </div>
      <!-- Description -->
      <div class="flex flex-col gap-2 sm:gap-4">
        <h2
          class="text-lg sm:text-xl first-letter:capitalize font-semibold border-l-2 sm:border-l-4 pl-2 sm:pl-4 border-black"
        >
          Description
        </h2>
        <p class="text-sm sm:text-base first-letter:capitalize">
          {{ post.body + '\n' + post.body }}
        </p>
      </div>
      <!-- More info -->
      <div class="flex flex-col gap-2 sm:gap-4">
        <h2
          class="text-lg sm:text-xl first-letter:capitalize font-semibold border-l-2 sm:border-l-4 pl-2 sm:pl-4 border-black"
        >
          What you should know
        </h2>
        <p class="text-sm sm:text-base first-letter:capitalize">
          {{ post.body + '\n' + post.body }}
        </p>
      </div>
      <!-- Comments -->
      <div class="flex flex-col gap-2 sm:gap-4">
        <h2
          class="text-lg sm:text-xl first-letter:capitalize font-semibold border-l-2 sm:border-l-4 pl-2 sm:pl-4 border-black"
        >
          Comments
        </h2>
        <div class="text-sm sm:text-base first-letter:capitalize">
          <div v-if="!comments?.length" class="">
            Loading comments
          </div>
          <div v-else class="flex flex-col gap-2 sm:gap-4">
            <CommentItem
              v-for="(comment, idx) in comments"
              :key="idx"
              :comment="comment"
            />
          </div>
        </div>
      </div>
    </article>
  </section>
</template>
