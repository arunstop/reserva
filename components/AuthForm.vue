<script setup lang="ts">
const email = ref('')
const password = ref('')
const signUp = async  () => {
    const res = await serviceAuthSignUp({ data: { email: email.value, password: password.value } })
    if (!res) return console.log('signup error')
    navigateTo("/")
}
const signIn = async () => {
    const res = await serviceAuthSignIn({ data: { email: email.value, password: password.value } })
    if (!res) return console.log('login error')
    alert('Sign in successful')
    navigateTo("/")
}
</script>
<template>
    <div class="flex flex-col gap-2">
        <div>Log In {{ email }}</div>
        <div class="flex flex-col gap-2">
            <CommonsInput placeholder="Email" v-model="email" />
            <CommonsInput placeholder="Password" type="password" v-model="password" />
        </div>
        <div>
            <CommonsButton text="Login" @click="signIn" />
        </div>
    </div>

    <div class="flex flex-col gap-2">
        <div>Sign Up {{ email }}</div>
        <div class="flex flex-col gap-2">
            <CommonsInput placeholder="Email" v-model="email" />
            <CommonsInput placeholder="Password" type="password" v-model="password" />
        </div>
        <div>
            <CommonsButton text="signUp" @click="signUp" />
        </div>
    </div>
</template>
