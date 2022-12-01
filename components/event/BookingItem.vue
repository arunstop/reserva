<script setup lang="ts">
  import { IOrder } from '~~/composables/types'
  import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
    TransitionRoot,
  } from '@headlessui/vue'
  const { order, spots, onUpdate, closeable, onRemove } = defineProps<{
    order: IOrder
    spots: IOrder[]
    closeable?: boolean
    onRemove?: () => void
    onUpdate: (order: IOrder) => void
  }>()

  const value = ref<IOrder>(order)
  const qty = ref(order.qty)
  const query = ref('')

  const filteredPeople = computed(() =>
    query.value === ''
      ? spots
      : spots.filter((spot) => {
          return spot.name.toLowerCase().includes(query.value.toLowerCase())
        })
  )

  // function onChange(newOrder: IOrder) {
  //   onUpdate({ ...newOrder, id: order.id ,qty:qty.value})
  // }

  function changeQty(n: number) {
    // can't be less than 0
    if (n < 0 && qty.value <= 1) return
    // can't be less than 20
    if (n > 0 && qty.value >= 20) return
    qty.value = qty.value + n
  }

  watch(
    [() => value.value, () => qty.value],
    ([newValue, newQty], [prevVal, prevQty]) => {
      if (newValue === prevVal && newQty === prevQty) return
      onUpdate({ ...newValue, id: order.id, qty: newQty })
    }
  )
</script>
<template>
  <div class="grid grid-cols-2 gap-[inherit] items-center">
    <div class="flex gap-[inherit]">
      <Combobox v-model="value">
        <div class="relative w-full">
          <div
            class="relative w-full cursor-default overflow-hidden rounded-lg bg-zinc-100"
          >
            <ComboboxInput
              class="min-h-[1.5rem] sm:min-h-[3rem] py-1 px-1.5 sm:py-2 sm:px-3 first:rounded-l-xl only:rounded-xl last:rounded-r-xl bg-transparent outline-none focus:bg-zinc-300 self-stretch transition-colors duration-500 peer w-full text-xs sm:text-base"
              :display-value="(person) => (person as any)?.name ||''"
              @change="query = $event.target.value"
            />
            <ComboboxButton
              class="absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <i-mdi-chevron-down
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </ComboboxButton>
          </div>
          <TransitionRoot
            leave="transition ease-in duration-100"
            leave-from="opacity-100"
            leave-to="opacity-0"
            @after-leave="query = ''"
          >
            <ComboboxOptions
              class="absolute mt-1 max-h-60 z-10 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <div
                v-if="filteredPeople.length === 0 && query !== ''"
                class="relative cursor-default select-none py-2 px-4 text-gray-700"
              >
                Nothing found.
              </div>

              <ComboboxOption
                v-for="person in filteredPeople"
                :key="person.id"
                v-slot="{ selected, active }"
                as="template"
                :value="person"
              >
                <li
                  class="relative cursor-default select-none py-2 pl-10 pr-4"
                  :class="{
                    'bg-teal-600 text-white': active,
                    'text-gray-900': !active,
                  }"
                >
                  <span
                    class="block truncate"
                    :class="{
                      'font-medium': selected,
                      'font-normal': !selected,
                    }"
                  >
                    {{ person.name }}
                  </span>
                  <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3"
                    :class="{
                      'text-white': active,
                      'text-teal-600': !active,
                    }"
                  >
                    <i-mdi-check class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ComboboxOption>
            </ComboboxOptions>
          </TransitionRoot>
        </div>
      </Combobox>
    </div>
    <div class="flex gap-[inherit]">
      <CommonsInput
        v-model="qty"
        class="w-full h-auto"
        type="number"
        min="1"
        max="10"
        placeholder="Amount"
      >
        <template #lead>
          <CommonsButton
            class="!rounded-none !rounded-l-xl text-xl sm:text-2xl bg-none text-current"
            @click="changeQty(-1)"
          >
            <i-ic-round-minus />
          </CommonsButton>
        </template>
        <template #trail>
          <CommonsButton
            class="!rounded-none !rounded-r-xl text-xl sm:text-2xl bg-none text-current"
            @click="changeQty(1)"
          >
            <i-ic-round-plus />
          </CommonsButton>
        </template>
      </CommonsInput>
      <CommonsButton
        class="text-red-500 text-xl sm:text-2xl bg-none w-full flex-1"
        :class="``"
        :disabled="closeable"
        @click="onRemove?.()"
      >
        <i-mdi-close-bold />
      </CommonsButton>
    </div>
  </div>
</template>
