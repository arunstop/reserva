<script lang="ts" setup>
  definePageMeta({
    middleware: ['middleware-auth'],
  })
  const id = Math.floor(Math.random() * 100) + 1
</script>
<template>
  <div class="flex-1 flex justify-center items-center">
    <div
      class="grid grid-cols-2 p-2 sm:p-4 sm:min-h-[80vh] justify-center auto-cols-max flex-1 w-full sm:max-w-4xl relative 
      max-sm:m-4"
    >
      <div
        class="bg-gradient-to-br max-sm:rounded-xl sm:rounded-l-xl from-green-500 via-yellow-500 to-red-500 overflow-hidden sm:relative 
        absolute inset-0 max-sm:-z-[1]"
      >
        <img
          class="absolute inset-0 w-full h-full object-cover opacity-50"
          :src="`https://picsum.photos/id/${id}/300/300`"
        />
      </div>
      <div
        class="flex max-sm:rounded-xl sm:rounded-r-xl overflow-hidden max-sm:col-span-2 "
      >
        <AuthForm />
      </div>
    </div>
  </div>
</template>
