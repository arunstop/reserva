<script setup lang="ts">
  import { IPost } from '~~/composables/types'

  defineProps<{
    post: IPost
    show: boolean
    close: () => void
  }>()

  const confirm = ref<() => void>(()=>null)
  function closeModal() {
    navigateTo(
      {
        query: {},
      },
      {
        replace: true,
      }
    )
  }

  function changeList(newConfirm: () => void) {
    confirm.value = newConfirm
  }
</script>
<template>
  <CommonsModal :show="show" :close="close">
    <template #header>
      <div class="text-lg font-medium leading-6 text-gray-900">
        Reserve your place @ {{ post.title }}
      </div>
    </template>
    <template #content>
      <EventBookingForm :on-close="closeModal" :on-change="changeList" />
    </template>
    <template #footer>
      <div
        class="flex flex-col max-sm:gap-2 sm:items-end w-full sticky bottom-0 sm:static"
      >
        <CommonsButton class="max-sm:w-full" @click="confirm">
          <i-mdi-check-bold class="text-lg sm:text-xl hidden sm:block" />
          <span class="text-lg">Reserve my spot</span>
        </CommonsButton>
        <CommonsButton
          class="sm:hidden max-sm:w-full bg-none bg-black/50"
          @click="closeModal"
        >
          <i-mdi-check-bold class="text-lg sm:text-xl hidden sm:block" />
          <span class="text-lg">Cancel</span>
        </CommonsButton>
      </div>
    </template>
  </CommonsModal>
</template>
