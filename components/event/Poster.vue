<script lang="ts" setup>
  import { IPost } from '~~/composables/types'

  const props = defineProps<{ post: IPost }>()
  const { id } = props.post
</script>
<template>
  <div class="h-72 overflow-hidden rounded-xl">
    <div class="relative w-full h-full">
      <img
        :src="`https://picsum.photos/id/${id}/400/300`"
        alt="Header"
        class="absolute object-cover top-0 left-0 w-full h-full blur-md opacity-50"
      >
      <img
        :src="`https://picsum.photos/id/${id}/400/300`"
        alt="Header"
        class="relative h-full w-full object-contain"
      >
    </div>
  </div>
</template>
