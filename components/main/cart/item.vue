<script lang="ts" setup>
  import { ICartItem } from '~~/composables/storeCart'
  import { IOrder, IPost } from '~~/composables/types'
  import { IConfirmationModalProps } from '../ConfirmationModal.vue'

  const spots = ref<IOrder[]>([
    { id: '1', name: '1 November 2022', qty: 18, stock: 100, price: 100000 },
    { id: '2', name: '2 November 2022', qty: 28, stock: 100, price: 100000 },
    { id: '3', name: '3 November 2022', qty: 17, stock: 100, price: 100000 },
    { id: '4', name: '4 November 2022', qty: 88, stock: 100, price: 100000 },
    { id: '5', name: '5 November 2022', qty: 16, stock: 100, price: 100000 },
  ])
  const props = defineProps<{ data: [string, ICartItem] }>()
  const key = props.data[0]
  const value = props.data[1]
  const totalPrice = computed(() => {
    return Array.from(props.data[1].values()).reduce(
      (acc, e) => acc + e.price * e.qty,
      0
    )
  })
  const product = await useLazyFetch<IPost>(
    `https://jsonplaceholder.typicode.com/posts/${key}`,
    {}
  )
  const header = computed(() => {
    const totalSpots = Array.from(props.data[1].values()).reduce(
      (acc, e) => acc + e.qty * 1,
      0
    )
    return {
      text: `${product.data.value?.title}`,
      ticktets: `${totalSpots > 0 ? `${totalSpots}` : ``}`,
      slots: `${props.data[1].size}`,
    }
  })

  const modalDelete = computed(() => !!useRoute().query.deleteConfirmation)
  const modalDeleteResolve = ref<() => void>(() => null)

  function handleFormChange(key: string, item: ICartItem) {
    cartAdd(key, item)
  }

  function handleFormClear(key: string) {
    navigateTo({
      query: {
        deleteConfirmation: 'true',
      },
    })
    modalDeleteResolve.value = () => {
      cartRemove(key)
      toastAdd({
        title: 'Item removed from cart',
        message: 'Item removed from cart',
        type: 'SUCCESS',
        clickToClose: true,
      })
    }
  }

  function closeModalDelete() {
    navigateTo({ query: {} })
  }

  function checkout() {
    navigateTo({
      path: '/checkout',
      query: {
        items: [props.data[0]],
      },
    })
  }
</script>
<template>
  <div
    :id="`cartitem-${key}`"
    class="flex flex-col p-2 sm:p-4 gap-[inherit] relative transition-all"
  >
    <div
      class="absolute flex top-0 left-0 overflow-hidden -z-10 rounded-lg sm:rounded-xl isolate w-full h-full"
    >
      <img
        class="object-cover w-full h-full opacity-30 transition-all blur-md"
        :src="`https://picsum.photos/id/${key}/400/300`"
      />
    </div>
    <span v-if="product.pending.value" class="">Loading...</span>
    <div v-else class="flex gap-2 sm:gap-4">
      <figure class="text-lg sm:text-xl flex-none">
        <img
          :src="`https://picsum.photos/id/${key}/400/300`"
          class="h-16 w-16 sm:h-24 sm:w-24 rounded-lg sm:rounded-xl"
        />
      </figure>
      <div class="grid grid-cols-2">
        <span
          class="text-lg sm:text-xl first-letter:capitalize font-medium col-span-2"
          >{{ header.text }}</span
        >
        <span class="max-sm:text-sm first-letter:capitalize font-medium"
          >{{ header.slots }} slots</span
        >
        <span class="max-sm:text-sm first-letter:capitalize font-medium"
          >{{ header.ticktets }} tickets</span
        >
      </div>
    </div>
    <div class="flex flex-col relative gap-[inherit]">
      <EventBookingForm
        :data="value"
        :form-key="key"
        :on-change="handleFormChange"
        :no-buttons="true"
        :spots="spots"
        @clear="() => handleFormClear(key)"
      >
        <template #buttons="{ addBooking, maxed }">
          <div
            class="flex max-sm:flex-col gap-[inherit] items-center flex-wrap"
          >
            <CommonsButton
              v-if="maxed"
              class="self-start max-sm:w-full"
              @click="() => addBooking()"
            >
              <Icon name="mdi:plus-bold" class="text-lg sm:text-xl hidden sm:block" />
              <span class="">Add more</span>
            </CommonsButton>
            <CommonsButton
              class="self-start max-sm:w-full from-pink-500 to-red-500"
              @click="() => handleFormClear(key)"
            >
              <Icon name="mdi:close-bold" class="text-lg sm:text-xl hidden sm:block" />
              <span class="">Remove</span>
            </CommonsButton>
            <span class="max-sm:self-end max-sm:order-first sm:ml-auto">
              <Transition
                :key="totalPrice"
                :appear="true"
                appear-active-class="transition-all"
                appear-from-class="opacity-50 scale-90"
                appear-to-class="opacity-100 scale-100"
              >
                <div class="font-bold text-base sm:text-xl">
                  {{ `Rp. ${totalPrice.toLocaleString()}` }}
                </div>
              </Transition>
            </span>
          </div>
        </template>
      </EventBookingForm>
      <CommonsButton
        class="max-sm:w-full from-yellow-500 via-green-500 to-green-500"
        @click="checkout"
      >
        <Icon name="mdi:check-bold" class="text-lg sm:text-xl hidden sm:block" />
        <span class="">Checkout</span>
      </CommonsButton>
    </div>
  </div>

  <LazyMainConfirmationModal
    :show="modalDelete"
    :header="`Remove item`"
    :message="`This item will be removed from the cart.\nAre you sure?`"
    :close="closeModalDelete"
    @ok="modalDeleteResolve"
  />
</template>
