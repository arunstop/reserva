<script setup>
const route = useRoute()
</script>
<template>
    <nav class="flex gap-2 rounded-xl bg-purple-900/40 p-2">
        <NuxtLink to="/" replace>
            <CommonsMenuItem title="Home" :active="route.path === '/'" />
        </NuxtLink>
        <NuxtLink to="/auth" replace>
            <CommonsMenuItem title="Auth" :active="route.path === '/auth'" />
        </NuxtLink>
    </nav>
</template>
