<script setup lang="ts">
  const cart = useCart()
  const route = useRoute()
  const modalClear = ref(false)
  const modalCheckout = ref(false)

  onMounted(() => {
    modalClear.value = !!route.query.clearConfirmation
    modalCheckout.value = !!route.query.checkoutConfirmation
  })
  watch(
    [
      () => !!route.query.clearConfirmation,
      () => !!route.query.checkoutConfirmation,
    ],
    (next, old) => {
      modalClear.value = next[0]
      modalCheckout.value = next[1]
    }
  )
  function confirmCheckout() {
    useRouter().push({
      query: {
        checkoutConfirmation: 'true',
      },
    })
    // showConfirmationDialog({
    //   title: encodeURIComponent('Checkout'),
    //   message: encodeURIComponent(
    //     'All items about to be checked out.\nAre you sure?'
    //   ),
    // })
  }

  function confirmClear() {
    useRouter().push({
      query: {
        clearConfirmation: 'true',
      },
    })
    // showConfirmationDialog({
    //   title: encodeURIComponent('Clear cart'),
    //   message: encodeURIComponent(
    //     'Every items in the cart will be deleted.\nAre you sure?'
    //   ),
    // })
  }

  function closeModal() {
    navigateTo(
      {
        query: {},
      },
      { replace: true }
    )
  }

  function clearCart(close?: () => void) {
    cartClear()
    toastAdd({
      title:"Cart has been cleared",
      message:"Cart has been cleared",
      type:"SUCCESS",
      clickToClose:true
    })
    close?.()
  }
</script>
<template>
  <nav
    v-if="!!cart.size"
    class="flex gap-2 bg-stone-500/40 p-2 sticky top-0 z-10 backdrop-blur-sm min-h-[4rem] items-center justify-between"
  >
    <div class="inline-flex gap-1 sm:gap-2 items-center">
      <i-mdi-cart class="text-lg sm:text-xl" />
      <span class="text-lg sm:text-xl font-bold">Cart</span>
    </div>
    <div class="flex gap-[inherit]">
      <CommonsButton
        class="flex from-purple-500 to-red-500"
        @click="() => confirmClear()"
      >
        <i-mdi-check-bold class="text-lg sm:text-xl max-sm:hidden" />
        <span class="">Clear Cart</span>
      </CommonsButton>
      <CommonsButton
        class="flex from-blue-500 to-green-500"
        @click="() => confirmCheckout()"
      >
        <i-mdi-check-bold class="text-lg sm:text-xl max-sm:hidden" />
        <span class="">Checkout All</span>
      </CommonsButton>
    </div>
  </nav>
  <LazyMainConfirmationModal
    :show="modalClear"
    header="Clear cart"
    :message="'Every items in the cart will be deleted.\nAre you sure?'"
    :close="closeModal"
    @ok="clearCart"
  />
  <LazyMainConfirmationModal
    :show="modalCheckout"
    header="Checkout"
    :message="'All items about to be checked out.\nAre you sure?'"
    :close="closeModal"
  />
</template>
