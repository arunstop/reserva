<script lang="ts" setup>
  export interface IModalProps {
    show: boolean
    close: () => void
    persistent: boolean
  }
  defineProps<IModalProps>()
</script>
<template>
  <LazyCommonsModal :show="show" :close="close" :persistent="persistent" class="sm:!min-h-0 m-auto w-full max-sm:min-h-[30vh]">
    <template #content>
      <div class="flex flex-col gap-2 sm:gap-4 h-full">
        <div class="font-bold  flex flex-col items-center">
          <span>Are you sure ?</span>
        </div>
       <div class="flex max-sm:flex-col gap-[inherit]">
        <CommonsButton class="flex from-zinc-300  to-zinc-500 h-fit" @click="close">
          <i-mdi-check-bold class="text-lg sm:text-xl max-sm:hidden" />
          <span class="">Cancel</span>
        </CommonsButton>
        <CommonsButton class="flex from-purple-500 max-sm:order-first to-red-500 h-fit" @click="close">
          <i-mdi-check-bold class="text-lg sm:text-xl max-sm:hidden" />
          <span class="">Okay</span>
        </CommonsButton>
       </div>
      </div>
    </template>
  </LazyCommonsModal>
</template>
