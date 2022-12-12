<script setup lang="ts">
  const router = useRouter()
  function confirmCheckout() {
    showConfirmationDialog({
      title: encodeURIComponent('Checkout'),
      message: encodeURIComponent(
        'Every items in the cart will be deleted. Are you sure?'
      ),
    })
  }

  function confirmClear() {
    showConfirmationDialog({
      title: encodeURIComponent('Clear cart'),
      message: encodeURIComponent(
        'All items about to be checked out. Are you sure?'
      ),
    })
  }
</script>
<template>
  <nav
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
</template>
