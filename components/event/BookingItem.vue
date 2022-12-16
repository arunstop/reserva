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
  const props = defineProps<{
    booking: [string, IOrder]
    spots: IOrder[]
    selectedSpots: string[]
    closeable?: boolean
    onRemove?: () => void
    onUpdate: (booking: [string, IOrder]) => void
  }>()
  // const { initalSpots, booking, selectedSpots, onUpdate, closeable, onRemove }=props

  const qty = ref(props.booking[1].edited ? props.booking[1].qty : 1)
  const query = ref('')
  const spot = ref<IOrder>(props.booking[1])

  const unSpots = computed(() =>
    props.spots.filter((e) => {
      // unselectedSpots
      if (props.selectedSpots.length === 1 || spot.value.name === e.name)
        return true
      return !props.selectedSpots.includes(e.name)
    })
  )
  const filteredSpots = computed(() =>
    query.value === ''
      ? unSpots.value
      : unSpots.value.filter((e) => {
          return e.name.toLowerCase().includes(query.value.toLowerCase())
        })
  )

  // function onChange(newOrder: IOrder) {
  //   onUpdate({ ...newOrder, id: order.id ,qty:qty.value})
  // }

  function handleBlur(event: Event) {
    const v = parseInt((event.target as HTMLInputElement).value || '0')
    if (!v) return (qty.value = 1)
    if (v > props.booking[1].qty) return (qty.value = 1)
  }

  function changeQty(n: number) {
    if (!n) qty.value = 1
    // can't be less than 0
    if (n < 0 && qty.value <= 1) return
    // can't be less than 20
    if (n > 0 && qty.value >= 20) return
    // got to add * 1 because of the ref is turning to string when input is empty, somehow
    qty.value = qty.value * 1 + n
  }

  watch(
    [() => spot.value, () => qty.value],
    ([newValue, newQty], [prevVal, prevQty]) => {
      if (newValue === prevVal && newQty === prevQty) return
      props.onUpdate([
        props.booking[0],
        { ...newValue, qty: newQty, edited: true },
      ])
    }
  )

  // watch(()=>props.selectedSpots,(val,prev)=>{
  //   spots.value = props.initalSpots.filter((e) => {
  //      if (e.name === props.booking.name||props.selectedSpots.length<2) return true
  //     return !props.selectedSpots.includes(e.name)
  //   })
  // })
</script>
<template>
  <div class="grid grid-cols-2 gap-[inherit] items-center">
    <div class="flex gap-[inherit]">
      <Combobox v-model="spot">
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
                v-if="filteredSpots.length === 0 && query !== ''"
                class="relative cursor-default select-none py-2 px-4 text-gray-700"
              >
                Nothing found.
              </div>

              <ComboboxOption
                v-for="person in filteredSpots"
                :key="person.id"
                v-slot="{ selected, active }"
                as="template"
                :value="person"
              >
                <li
                  class="flex relative cursor-default select-none max-sm:text-sm px-0.5 py-1 sm:px-1 sm:py-2 gap-2 sm:gap-4"
                  :class="{
                    'bg-gray-300/50': selected,
                    '!bg-gray-600 text-white': active,
                    'text-gray-900': !active,
                  }"
                >
                  <i-mdi-check
                    class="text-lg sm:text-xl"
                    :class="{
                      'opacity-0': !selected,
                    }"
                  />
                  <span
                    class="block truncate"
                    :class="{
                      'font-medium': selected,
                      'font-normal': !selected,
                    }"
                  >
                    {{ person.name }}
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
        v-model.number="qty"
        class="w-full h-auto"
        type="number"
        min="1"
        max="10"
        placeholder="Amount"
        required
        @blur="handleBlur"
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
        class="!text-red-500 text-xl sm:text-2xl bg-none w-full flex-1"
        :class="``"
        :disabled="closeable"
        @click="onRemove?.()"
      >
        <i-mdi-close-bold />
      </CommonsButton>
    </div>
  </div>
</template>
