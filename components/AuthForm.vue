<script setup lang="ts">
  import { useForm, useField } from 'vee-validate'

  const { values, errors, useFieldModel, ...form } = useForm<{
    email: string
    password: string
  }>({
    validationSchema: {
      email(value: string) {
        if (!value.trim()) return 'Email is required'
        if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
          return 'Wrong email format'
        return true
      },
      password(value: string) {
        if (value.length < 8) return 'Password is too short'
        if (value.includes(' ')) return 'Spaces are not allowed'
        if (value.length > 20) return 'Password is too long'
        return true
      },
    },
  })

  const [{ value: email }, { value: password }] = [
    useField('email', undefined, { initialValue: '' }),
    useField('password', undefined, { initialValue: '' }),
  ]

  //   const signUp = async () => {
  //     const res = await serviceAuthSignUp({
  //       data: { email: email.value, password: password.value },
  //     })
  //     if (!res) return console.log('signup error')
  //     navigateTo('/')
  //   }
  //   const emailError = computed<string | null>(() => {
  //     if (!email.value.trim()) return 'Email is required'
  //     if (!email.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
  //       return 'Wrong email format'
  //     return null
  //   })
  //   const passwordError = computed<string | null>(() => {
  //     if (password.value.length < 8) return 'Password is too short'
  //     if (password.value.includes(' ')) return 'Spaces are not allowed'
  //     if (password.value.length>20) return 'Password is too long'
  //     return null
  //   })
  async function handleSubmit(event: Event) {
    form.validate()
    // const res = await serviceAuthSignIn({
    //   data: { email: email.value, password: password.value },
    // })
    // if (!res) return console.log('login error')
    // alert('Sign in successful')
    // navigateTo('/')
  }
</script>
<template>
  <div class="flex flex-col gap-2 items-center">
    <CommonsTextGradient
      class="font-bold text-xl sm:text-2xl from-gray-300 to-zinc-600"
    >
      Log In {{ email }}
    </CommonsTextGradient>
    <form class="flex flex-col gap-2" @submit.prevent="handleSubmit">
      <CommonsInput v-model="email" placeholder="Email">
        <template #lead>
          <span
            class="flex items-center text-lg sm:text-2xl p-1 sm:p-2 duration-500 ease-in"
          >
            <i-ic-round-alternate-email
              class="group-focus-within:scale-125 transition-all ease-out duration-300"
            />
          </span>
        </template>
      </CommonsInput>
      <span v-if="errors.email">{{ errors.email }}</span>
      <CommonsInput v-model="password" placeholder="Password" type="password">
        <template #lead>
          <span
            class="flex items-center text-lg sm:text-2xl p-1 sm:p-2 duration-500 ease-in"
          >
            <i-ic-outline-password
              class="group-focus-within:scale-125 transition-all ease-out duration-300"
            />
          </span>
        </template>
      </CommonsInput>
      <span v-if="errors.password">{{ errors.password }}</span>

      <div class="w-full">
        <CommonsButton class="w-full" text="Login" type="submit" />
      </div>
    </form>
  </div>

  <div class="flex flex-col gap-2">
    <div>Sign Up {{ email }}</div>
    <div class="flex flex-col gap-2">
      <CommonsInput v-model="email" placeholder="Email" />
      <CommonsInput v-model="password" placeholder="Password" type="password" />
    </div>
    <div>
      <!-- <CommonsButton text="signUp" @click="signUp" /> -->
    </div>
  </div>
</template>
