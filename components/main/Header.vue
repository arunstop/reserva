<script setup lang="ts">

const route = useRoute()
const user = useSupabaseUser()

const logout = async () => {
    const res = await serviceAuthSignOut({
        data: true
    })

    if(!res) return;
    alert("Signout success")
    navigateTo("/");

}
</script>
<template>
    <nav class="flex gap-2 rounded-xl bg-purple-900/40 p-2 mb-2 sm:mb-4">
        <NuxtLink to="/" replace>
            <CommonsMenuItem title="Home" :active="route.path === '/'" />
        </NuxtLink>
        {{user?.email}}
        <NuxtLink v-if="user === null" to="/auth" replace>
            <CommonsMenuItem title="Auth" :active="route.path === '/auth'" />
        </NuxtLink>
        <CommonsButton v-if="user !== null" class="ml-auto" text="Logout" :on-click="logout" />
    </nav>
</template>
