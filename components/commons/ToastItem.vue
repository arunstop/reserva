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
    if (!props.toast.duration || props.toast.duration < 0) return
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
          bg: 'bg-green-100/90 hover:bg-green-300',
          icon: 'text-green-500 group-hover:text-green-900',
          btn: 'bg-green-600/50 text-green-900',
        }
      case 'ERROR':
        return {
          bg: 'bg-red-100/90 hover:bg-red-300',
          icon: 'text-red-500 group-hover:text-red-900',
          btn: 'bg-red-600/50 text-red-900',
        }
      case 'PENDING':
        return {
          bg: 'bg-zinc-100/90 hover:bg-zinc-300',
          icon: 'text-zinc-500 group-hover:text-zinc-900',
          btn: 'bg-zinc-600/50 text-zinc-900',
        }
      default:
        return {
          bg: 'bg-zinc-100/90 hover:bg-zinc-300',
          icon: 'text-zinc-500 group-hover:text-zinc-900',
          btn: 'bg-zinc-600/50 text-zinc-900',
        }
    }
  }
  const style = getStyle(props.toast)
</script>
<template>
  <div class="flex pointer-events-none">
    <div
      class="rounded-full flex children:p-1.5 sm:children:p-2 items-center ring-1 sm:ring-2 overflow-hidden ring-zinc-500/30 group transition-all hover:scale-95 hover:ring-2 sm:hover:ring-4 pointer-events-auto h-[2.5rem] sm:h-[3.25rem]"
      :class="[
        {
          'cursor-pointer': toast.clickToClose,
          'p-0.5 sm:p-1': !toast.action,
          'pl-1 sm:pl-2': toast.action,
          'pointer-events-none children:cursor-default': toast.noHover,
        },
        style.bg,
      ]"
      @mouseenter="(event) => (toast.noHover ? null : handleMouseEnter(event))"
      @mouseleave="(event) => (toast.noHover ? null : handleMouseLeave(event))"
      @click="
        () => {
          if (!!toast.action) toast.action.action()
          if (!!toast.clickToClose) dispose()
        }
      "
    >
      <span
        class="text-xl sm:text-2xl flex transition-all group-hover:scale-125 sm:group-hover:scale-150"
        :class="style.icon"
      >
        <Icon v-if="toast.type === `SUCCESS`" name="mdi:check-all" />
        <Icon v-else-if="toast.type === `ERROR`" name="mdi:alert-circle-outline" />
        <Icon v-else-if="toast.type === `PENDING`" name="mdi:dots-horizontal" />
        <Icon v-else name="mdi:checkbox-blank-circle" />
      </span>
      <span class="max-sm:text-sm font-medium"> {{ toast.message }}</span>

      <div
        v-if="!!toast.action"
        class="flex items-center rounded-full m-1 sm:m-1.5 group-hover:scale-[1.15] group-hover:h-full transition-all"
        :class="style.btn"
      >
        <span class="font-bold max-sm:text-sm mx-1 sm:mx-2 transition-all">
          {{ toast.action.label }}
        </span>
      </div>
    </div>
  </div>
</template>
