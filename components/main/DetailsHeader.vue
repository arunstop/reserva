<script setup lang="ts">
  const route = useRoute()
  const user = useUser()

  const keyword = ref('')

  const logout = async () => {
    const res = await serviceAuthSignOut({
      data: true,
    })

    if (!res) return
    alert('Signout success')
    navigateTo('/')
  }
</script>
<template>
  <nav
    class="flex gap-2 bg-stone-500/40 p-2 sticky top-0 z-10 backdrop-blur-sm min-h-[4rem] items-center justify-between"
  >
    <CommonsInput
      v-model="keyword"
      :placeholder="'Reservation for restaurant opening'"
      type="search"
      class="w-full sm:max-w-3xl"
    >
      <template #lead>
        <span
          class="text-orange-500 text-xl sm:text-3xl m-2  peer-focus:scale-110"
        >
          <Icon name="mdi:search" />
        </span>
      </template>
    </CommonsInput>
    <div class="flex">
      <NuxtLink
        to="/"
        replace
      >
        <CommonsMenuItem
          title="Home"
          :active="route.path === '/'"
        />
      </NuxtLink>
      <NuxtLink
        v-if="user === null"
        to="/auth"
        replace
      >
        <CommonsMenuItem
          title="Auth"
          :active="route.path === '/auth'"
        />
      </NuxtLink>
    </div>
    <CommonsButton
      v-if="user !== null"
      class=""
      text="Logout"
      @click="logout"
    />
  </nav>
</template>
