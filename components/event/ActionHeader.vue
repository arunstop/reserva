<script setup lang="ts">
  import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
  } from '@headlessui/vue'
  import { IPost } from '~~/composables/types'

  defineProps<{ post: IPost }>()
  const route = useRoute()
  const user = useUser()

  const reserving = ref(((route.query.reserving as string) || '').trim())

  function reserve() {
    navigateTo({
      query: {
        reserving: 123,
      },
    })
  }
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

  watch(
    () => (route.query.reserving as string) || '',
    (val, prev) => {
      // if(!val) return;
      console.log(val)
      const newId = val.trim()
      if (newId === reserving.value) return
      reserving.value = newId
    }
  )
</script>
<template>
  <nav
    class="flex justify-center bg-stone-700/40 p-2 sticky top-0 z-10 backdrop-blur-sm min-h-[4rem]"
  >
    <div class="flex gap-2 items-center justify-between w-full max-w-7xl">
      <div class="flex gap-[inherit] items-center">
        <span class="font-bold">50 / 500</span>
        <CommonsChip class="text-red-300 text-sm sm:text-base">
          <i-mdi-alert-circle-outline class="text-lg sm:text-xl" />
          <span>13 hours left</span>
        </CommonsChip>
      </div>
      <div class="flex gap-[inherit]">
        <CommonsButton class="flex from-yellow-500 to-red-500">
          <i-mdi-cart class="text-lg sm:text-xl" />
          <span class="hidden sm:block">Add to cart</span>
        </CommonsButton>
        <CommonsButton
          class="flex from-pink-500 to-purple-500"
          @click="reserve"
        >
          <i-mdi-check-bold class="text-lg sm:text-xl" />
          <span class="hidden sm:block">Reserve</span>
        </CommonsButton>
      </div>
    </div>
  </nav>
  <TransitionRoot appear :show="!!reserving" as="template">
    <Dialog as="div" class="relative z-10" @close="closeModal">
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
          class="fixed inset-0 bg-black/50 backdrop-blur-md hidden sm:block"
        />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
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
            <DialogPanel
              class="w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl transform overflow-hidden sm:rounded-xl bg-white p-3
              sm:p-6 text-left shadow-xl transition-all flex flex-col gap-2 sm:gap-4 relative overflow-y-auto max-h-screen"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Reserve your place @ {{ post.title }}
              </DialogTitle>
              <div class="min-h-full sm:h-auto">
                <p class="text-sm text-gray-500">
                  Your payment has been successfully submitted. We’ve sent you
                  an email with all of the details of your order.
                </p>
              </div>

              <div class="flex flex-col max-sm:gap-2 sm:items-end w-full sticky bottom-0 sm:static">
                <CommonsButton class="max-sm:w-full" @click="closeModal">
                  <i-mdi-check-bold class="text-lg sm:text-xl hidden sm:block" />
                  <span class="text-lg">Reserve my spot</span>
                </CommonsButton>
                <CommonsButton class="sm:hidden max-sm:w-full bg-none bg-black/50" @click="closeModal">
                  <i-mdi-check-bold class="text-lg sm:text-xl hidden sm:block" />
                  <span class="text-lg">Cancel</span>
                </CommonsButton>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
