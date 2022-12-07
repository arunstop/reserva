<script setup lang="ts">
  import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
  } from '@headlessui/vue'

  const props = defineProps<{
    show: boolean
    close: () => void
    persistent: boolean
  }>()
</script>
<template>
  <TransitionRoot appear :show="show" as="template">
    <Dialog
      as="div"
      class="relative z-10 group"
      @close="() => (persistent ? null : close())"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-black/50 hidden sm:block peer transition-colors duration-500 ease-out"
          :class="`${persistent ? 'active:bg-black/75 ' : ''}`"
          :tabindex="0"
        />
      </TransitionChild>

      <div
        class="fixed inset-0 overflow-hidden"
        :class="`${
          persistent
            ? 'pointer-events-none peer-active:scale-90 peer-active:rotate-6 transition-transform ease-out duration-200'
            : ''
        }`"
      >
        <div class="flex min-h-full sm:items-center sm:justify-center sm:p-8">
          <TransitionChild
            as="template"
            enter="duration-500 ease-out"
            enter-from="opacity-10  max-sm:translate-y-[60%] sm:scale-75"
            enter-to="opacity-100 max-sm:translate-y-0 sm:scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 max-sm:translate-y-0 sm:scale-100"
            leave-to="opacity-0 max-sm:translate-y-[60%] sm:scale-75"
          >
            <div
              class="flex min-h-full overflow-hidden sm:rounded-xl max-sm:w-full"
            >
              <div
                class="w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl transform overflow-hidden bg-white text-left shadow-xl transition-all max-h-screen sm:max-h-[90vh] min-h-[60vh] flex sm:rounded-xl max-sm:w-full"
              >
                <DialogPanel
                  class="flex flex-col gap-2 sm:gap-4 relative overflow-y-auto p-3 sm:p-6 w-full"
                >
                  <slot name="header" />
                  <slot name="content" />
                  <slot name="footer" />
                </DialogPanel>
                <slot />
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
