<script setup>
const email = ref('')
const password = ref('')
const login = () => {
    alert('login')
}
</script>
<template>
    <div class="flex flex-col gap-2">
        <div>Login {{ email }}</div>
        <div class="flex flex-col gap-2">
            <CommonsInput placeholder="Email" v-model="email" />
            <CommonsInput
                placeholder="Password"
                type="password"
                v-model="password"
            />
        </div>
        <div><CommonsButton text="Login" @click="login" /></div>
    </div>
</template>
