<script lang="ts" setup>
  import { IOrder, IPost } from '~~/composables/types'

  const route = useRoute()
  const { pending, data, error } = useLazyAsyncData<IPost>('items', () =>
    $fetch(
      `https://jsonplaceholder.typicode.com/posts/${
        (route.query.items as string[])[0]
      }`
    )
  )
  const post = computed(() => {
    if (!data.value) return

    return cartGet(data.value.id + '')
  })

  function getDetails(values: IOrder[]) {
    const totalSpots = values.reduce((acc, e) => acc + e.qty * 1, 0)
    return {
      tickets: `${totalSpots >   0 ? `${totalSpots}` : ``}`,
      slots: `${values.length}`,
      totalPrice: values.reduce((acc, e) => acc + e.price * e.qty, 0),
    }
  }

  const details = computed(() => {
    if (!post.value) return null
    return getDetails(Array.from(post.value.values()))
  })

  async function confirmPayment() {
    const id = Date.now() + ''
    toastAdd({
      id: id,
      title: 'Processing payment...',
      message: 'Processing payment...',
      type: 'PENDING',
      clickToClose: false,
      duration:-1,
      noHover:true,
    })
    const ds = await new Promise<number>((resolve, reject) => {
      setTimeout(() => {
        toastRemove(id)
        resolve(123)
      }, 3000)
    })

    toastAdd({
      title: 'Payment success!',
      message: 'Payment success!',
      type: 'SUCCESS',
      clickToClose: true,
    })
  }
</script>
<template>
  <div class="flex-1 flex flex-col items-center p-2 sm:p-4">
    <div v-if="pending">Loading...</div>
    <div v-if="error">Error...</div>
    <div v-if="!post">Item not found.</div>
    <div
      v-if="!!post && !!data"
      class="flex flex-col p-3 sm:p-6 rounded-xl bg-zinc-200/20 items-center gap-2 sm:gap-4 sm:max-w-[70%] relative"
    >
      <div
        class="absolute flex top-0 left-0 overflow-hidden -z-10 rounded-lg sm:rounded-xl isolate w-full h-full"
      >
        <img
          class="object-cover w-full h-full opacity-30 transition-all blur-md"
          :src="`https://picsum.photos/id/${data.id}/400/300`"
        />
      </div>
      <div
        class="first-letter:capitalize font-bold text-xl sm:text-2xl text-center"
      >
        {{ data.title }}
      </div>
      <div class="first-letter:capitalize text-base sm:text-lg text-center">
        {{ data.body }}
      </div>
      <figure
        class="text-lg sm:text-xl first-letter:capitalize font-medium flex-none"
      >
        <img
          :src="`https://picsum.photos/id/${data.id}/400/300`"
          class="rounded-lg sm:rounded-xl"
        />
      </figure>
      <div class="flex flex-col gap-i">
        <div
          class="bg-zinc-500/20 p-2 sm:p-4 flex rounded-xl gap-2 sm:gap-4 justify-around items-center"
        >
          <span class="flex flex-col text-center">
            <span class="text-2xl sm:text-3xl font-black">
              {{ details?.slots }}
            </span>
            <span class="max-sm:text-sm">Slots</span>
          </span>
          <span class="flex flex-col text-center">
            <span class="text-2xl sm:text-3xl font-black">
              {{ details?.tickets }}
            </span>
            <span class="max-sm:text-sm">Tickets</span>
          </span>
        </div>
        <div
          v-for="(order, idx) in post.values()"
          :key="order.id + '' + idx"
          class="bg-zinc-500/20 children:p-2 sm:children:p-4 flex gap-1 sm:gap-4 rounded-xl divide-x items-stretch max-sm:text-sm"
        >
          <div class="font-bold">
            {{ order.name }}
          </div>
          <div class="">
            {{ `${order.price.toLocaleString()} x ${order.qty}` }}
          </div>
          <div class="font-medium">
            {{ `= ${(order.qty * order.price).toLocaleString()}` }}
          </div>
        </div>
        <div
          class="bg-zinc-500/20 p-2 sm:p-4 flex rounded-xl gap-2 sm:gap-4 justify-between items-center"
        >
          <span class="max-sm:text-sm">Total :</span>
          <span class="text-lg sm:text-xl font-bold underline">
            {{
              details?.totalPrice.toLocaleString('EN-us', {
                style: 'currency',
                currency: 'IDR',
              })
            }}
          </span>
        </div>
      </div>

      <div class="grid gap-2 sm:gap-4 w-full sm:max-w-[80%]">
        <CommonsButton
          class="w-full from-green-300 via-green-500 to-green-300"
          @click="confirmPayment"
        >
          Pay
        </CommonsButton>
        <NuxtLink :to="`/cart/#cartitem-${data?.id}`">
          <CommonsButton class="w-full"> Cancel </CommonsButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
