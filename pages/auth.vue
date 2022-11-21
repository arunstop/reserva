<script lang="ts" setup>
definePageMeta({
    middleware: ['middleware-auth']
})
</script>
<template>
    <div class="flex flex-col gap-2 sm:gap-4 items-center p-2 sm:p-4">
        <AuthForm />
    </div>
</template>
