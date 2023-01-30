<script lang="ts" setup>
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
    // force to validate
    const res = await form.validate()
    if (!res.valid) return
    toastAdd({
      id: email.value,
      title: 'Signing you in...',
      message: 'Signing you in...',
      type: 'PENDING',
      clickToClose: false,
      duration: -1,
      noHover: true,
    })
    const signIn = await $fetch('/api/user/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })
    toastRemove(email.value)
    if (!signIn.ok)
      return toastAdd({
        title: `Sign in failed : ${signIn.message}`,
        message: 'Sign in failed',
        type: 'ERROR',
      })
    toastAdd({
      title: 'Login success',
      message: 'Login success',
      type: 'SUCCESS',
    })
    navigateTo('/')
  }
</script>
<template>
  <div class="flex flex-col gap-2 sm:gap-4 items-center p-2 sm:p-4">
    <form class="flex flex-col gap-i" @submit.prevent="handleSubmit">
      <CommonsInput v-model="email" placeholder="Email">
        <template #lead>
          <label
            class="flex items-center sm:text-2xl p-1 sm:p-2 duration-500 ease-in"
            :class="{
              'text-red-500': errors.email,
            }"
          >
            <Icon
              name="ic:round-alternate-email"
              class="group-focus-within:scale-125 transition-all ease-out duration-300"
            />
          </label>
        </template>
      </CommonsInput>
      <span
        v-if="errors.email"
        class="text-red-500 font-medium max-sm:text-sm"
        >{{ errors.email }}</span
      >
      <CommonsInput v-model="password" placeholder="Password" type="password">
        <template #lead>
          <label
            class="flex items-center sm:text-2xl p-1 sm:p-2 duration-500 ease-in"
            :class="{
              'text-red-500': errors.password,
            }"
          >
            <Icon
              name="ic:outline-password"
              class="group-focus-within:scale-125 transition-all ease-out duration-300"
            />
          </label>
        </template>
      </CommonsInput>
      <span
        v-if="errors.password"
        class="text-red-500 font-medium max-sm:text-sm"
        >{{ errors.password }}</span
      >
      <div class="w-full">
        <CommonsButton class="w-full" text="Login" type="submit" />
      </div>
    </form>
  </div>
</template>
