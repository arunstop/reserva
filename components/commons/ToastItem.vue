<script setup lang="ts">
  import { IToast, toastRemove } from '~~/composables/storeToast'

  const props = defineProps<{ toast: IToast }>()

  function dispose() {
    toastRemove(props.toast.id)
  }
  const startDispose = (duration?: number) =>
    setTimeout(() => {
      dispose()
    }, duration || props.toast.duration)

  const timeout = ref<NodeJS.Timeout>()

  onMounted(() => {
    if (!props.toast.duration) return
    timeout.value = startDispose()
  })

  onUnmounted(() => {
    if (!timeout.value) return
    clearTimeout(timeout.value)
  })

  const handleMouseEnter = (event: MouseEvent) => {
    clearTimeout(timeout.value)
  }

  const handleMouseLeave = (event: MouseEvent) => {
    timeout.value = startDispose(2000)
  }
  function getStyle(toast: IToast) {
    switch (toast.type) {
      case 'SUCCESS':
        return {
          bg: 'bg-green-200/90 hover:bg-green-400',
          icon: 'text-green-500 group-hover:text-green-900',
        }
      case 'ERROR':
        return {
          bg: 'bg-red-200/90 hover:bg-red-400',
          icon: 'text-red-500 group-hover:text-red-900',
        }
      case 'PENDING':
        return {
          bg: 'bg-zinc-200/90 hover:bg-zinc-400',
          icon: 'text-zinc-500 group-hover:text-zinc-900',
        }
      default:
        return {
          bg: 'bg-zinc-200/90 hover:bg-zinc-400',
          icon: 'text-zinc-500 group-hover:text-zinc-900',
        }
    }
  }
  const style = getStyle(props.toast)
</script>
<template>
  <div class="flex pointer-events-none">
    <div
      class="px-2 py-1.5 sm:px-4 sm:py-3 rounded-full flex gap-2 sm:gap-4 items-center ring-1 sm:ring-2 ring-zinc-500/30 group transition-all hover:scale-95 hover:ring-2 sm:hover:ring-4 pointer-events-auto"
      :class="`${style.bg} ${
        toast.clickToClose ? `cursor-pointer` : ` cursor-default`
      }`"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="() => {
        if(!!toast.action) toast.action.action()
        if(!!toast.clickToClose) dispose()
      }"
    >
      <span
        class="text-xl sm:text-2xl flex transition-all group-hover:scale-125 sm:group-hover:scale-150"
        :class="style.icon"
      >
        <i-mdi-check-all v-if="toast.type === `SUCCESS`" />
        <i-mdi-alert-circle-outline v-else-if="toast.type === `ERROR`" />
        <i-mdi-dots-horizontal v-else-if="toast.type === `PENDING`" />
        <i-mdi-checkbox-blank-circle v-else />
      </span>
      <span class="max-sm:text-sm font-medium"> {{ toast.message }}</span>
      <div v-if="!!toast.action">
        <CommonsTextGradient class="font-bold from-black to-gray-500 hover:">
          {{ toast.action.label }}
        </CommonsTextGradient>
      </div>
    </div>
  </div>
</template>
