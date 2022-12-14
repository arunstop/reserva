<script lang="ts" setup>
  import { IPost } from '~~/composables/types'
  const { data: posts } = await useFetch<IPost[]>(
    'https://jsonplaceholder.typicode.com/posts'
  )

  const route = useRoute()
  const keyword = ref((route.query.search as string) || '')
  const filteredPosts = computed(() => {
    return !keyword || !posts.value?.length
      ? posts.value
      : posts.value.filter((e) => e.title.includes(keyword.value))
  })

  onMounted(() =>
    watch(
      () => route.query.search,
      (val, prev) => {
        const qSearch = (route.query.search as string).trim().toLowerCase()
        if (!qSearch) return
        // if (qSearch.length < 3) return
        keyword.value = qSearch
      }
    )
  )
</script>
<template>
  <section id="section-feed" class="flex min-h-screen justify-center">
    <div
      class="flex flex-col rounded-xl w-full place-self-stretch p-4 sm:p-8 max-w-7xl"
    >
      <div v-if="!posts || !posts.length">
        Data is non-existent
      </div>
      <div
        v-else
        class="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <NuxtLink
          v-for="(post, idx) in filteredPosts"
          :key="idx"
          :to="`/post/${post.id}`"
        >
          <PostItem :post="post" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
