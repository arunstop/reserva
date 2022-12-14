<script lang="ts" setup>
  const props = defineProps<{
    show: boolean
    header: string
    message: string
    close: () => void
    labelOk?: string
    labelCancel?: string
    onOk?: (close?: () => void) => void
  }>()
  const label = computed(() => ({
    ok: !!props.labelOk?.trim() ? props.labelOk : 'Ok',
    cancel: !!props.labelCancel?.trim() ? props.labelCancel : 'Cancel',
  }))

  function confirm() {
    if (!props.onOk) return props.close()
    props.onOk(props.close)
  }
</script>
<template>
  <LazyCommonsModal
    :show="show"
    :close="close"
    class="sm:!min-h-0 m-auto max-sm:!w-fit sm:min-w-[16rem] max-sm:min-h-[30vh] rounded-xl max-w-xs sm:max-w-sm"
  >
    <template #content>
      <div
        class="flex flex-col gap-2 sm:gap-4 h-full justify-between text-center"
      >
        <span class="font-bold text-xl sm:text-2xl capitalize">{{
          header
        }}</span>

        <!-- only render message once because it depends on route query -->
        <span class="whitespace-pre-line text-sm sm:text-base">{{
          message
        }}</span>
        <div class="flex flex-col gap-[inherit] sm:justify-end">
          <CommonsButton
            class="flex from-purple-500 max-sm:order-first to-red-500 h-fit"
            @click="confirm"
          >
            <i-mdi-check-bold class="text-lg sm:text-xl max-sm:hidden" />
            <span class="">{{ label.ok }}</span>
          </CommonsButton>
          <CommonsButton
            class="flex  h-fit"
            @click="close"
          >
            <i-mdi-close-bold class="text-lg sm:text-xl max-sm:hidden" />
            <span class="">{{ label.cancel }}</span>
          </CommonsButton>
        </div>
      </div>
    </template>
  </LazyCommonsModal>
</template>
