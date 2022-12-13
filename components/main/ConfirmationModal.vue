<script lang="ts" setup>
 const {show,close,title,message} = useConfirmationDialog()
</script>
<template>
  <LazyCommonsModal
    :show="show"
    :close="close"
    class="sm:!min-h-0 m-auto !w-fit max-sm:min-h-[30vh] rounded-xl max-w-xs sm:max-w-sm"
  >
    <template #content>
      <div
        class="flex flex-col gap-2 sm:gap-4 h-full justify-between text-center"
      >
        <!-- <div class="self-center">
          <i-mdi-question-mark class="text-xl sm:text-2xl" />
        </div> -->
        <div
          id="confirmation-modal-content"
          class="flex flex-col items-center gap-[inherit]"
        >
          <span class="font-bold text-xl sm:text-2xl capitalize">{{
            title
          }}</span>

          <!-- only render message once because it depends on route query -->
          <span class="whitespace-pre-line text-sm sm:text-base">{{ message }}</span>
        </div>
        <div class="flex flex-col gap-[inherit] sm:justify-end">
          <CommonsButton
            class="flex from-purple-500 max-sm:order-first to-red-500 h-fit"
            @click="close"
          >
            <i-mdi-check-bold class="text-lg sm:text-xl max-sm:hidden" />
            <span class="">Okay</span>
          </CommonsButton>
          <CommonsButton
            class="flex from-zinc-300 to-zinc-500 h-fit"
            @click="close"
          >
            <i-mdi-close-bold class="text-lg sm:text-xl max-sm:hidden" />
            <span class="">Cancel</span>
          </CommonsButton>
        </div>
      </div>
    </template>
  </LazyCommonsModal>
</template>
