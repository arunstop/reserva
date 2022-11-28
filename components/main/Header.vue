<script setup lang="ts">

const route = useRoute()
const user = useUser()

const logout = async () => {
    const res = await serviceAuthSignOut({
        data: true
    })

    if (!res) return
    alert('Signout success')
    navigateTo("/")

}
</script>
<template>
  <nav class="flex gap-2 bg-stone-500/40 p-2 sticky top-0 z-10 backdrop-blur-sm min-h-[4rem]  items-center justify-between">
    <CommonsTextGradient class="from-black to-red-600">
      <span class="text-3xl font-black font-righteous">R</span><span class="font-bold font-righteous">ESERVA</span>
    </CommonsTextGradient>
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
      :on-click="logout"
    />
  </nav>
</template>
