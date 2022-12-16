<script lang="ts" setup>
  import { useForm, useField } from 'vee-validate'

  const { values, errors, useFieldModel, ...form } = useForm<{
    email: string
    pw: string
    pwConfirm: string
    name:string
  }>({
    validationSchema: {
      name(value: string) {
        if (value.length < 3) return 'Name is too short'
        if (value.length > 30) return 'Name is too long'
        if(!value.match(/^([^0-9|@|.|]*)$/g)) return 'Invalid character in the names'
        return true
      },
      email(value: string) {
        if (!value.trim()) return 'Email is required'
        if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
          return 'Wrong email format'
        return true
      },
      pw(value: string) {
        if (value.length < 8) return 'Password is too short'
        if (value.includes(' ')) return 'Spaces are not allowed'
        if (value.length > 20) return 'Password is too long'
        return true
      },
      pwConfirm(value: string) {
        if (value.length < 8) return 'Password is too short'
        if (value.includes(' ')) return 'Spaces are not allowed'
        if (value.length > 20) return 'Password is too long'
        if (value !== values.pw) return 'Passwords should be the same'
        return true
      },
    },
  })

  const [
    { value: name },
    { value: email },
    { value: pw },
    { value: pwConfirm },
  ] = [
    useField('name', undefined, { initialValue: '' }),
    useField('email', undefined, { initialValue: '' }),
    useField('pw', undefined, { initialValue: '' }),
    useField('pwConfirm', undefined, { initialValue: '' }),
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
    const signIn = await serviceAuthSignIn({
      data: { email: email.value, password: pw.value },
    })
    if (!signIn)
      return toastAdd({
        title: 'Sign in failed',
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
      <TransitionGroup
        enter-active-class="duration-300 transition-all"
        enter-from-class="opacity-0"
        enter-to-class="opacity-1000"
        move-class="transition-all duration-200 "
        leave-active-class="absolute duration-200 transition-all"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <CommonsInput v-model="name" placeholder="Name">
          <template #lead>
            <span
              class="flex items-center sm:text-2xl p-1 sm:p-2 duration-500 ease-in"
              :class="{
                'text-red-500': errors.name,
              }"
            >
              <i-mdi-alpha
                class="group-focus-within:scale-125 transition-all ease-out duration-300"
              />
            </span>
          </template>
        </CommonsInput>
        <span
          v-if="errors.name"
          class="max-sm:text-sm text-red-500 font-medium"
          >{{ errors.name }}</span
        >
        <CommonsInput v-model="email" placeholder="Email" type="email">
          <template #lead>
            <span
              class="flex items-center sm:text-2xl p-1 sm:p-2 duration-500 ease-in"
              :class="{
                'text-red-500': errors.email,
              }"
            >
              <i-ic-round-alternate-email
                class="group-focus-within:scale-125 transition-all ease-out duration-300"
              />
            </span>
          </template>
        </CommonsInput>
        <span
          v-if="errors.email"
          class="max-sm:text-sm text-red-500 font-medium"
          >{{ errors.email }}</span
        >
        <CommonsInput v-model="pw" placeholder="Password" type="password">
          <template #lead>
            <span
              class="flex items-center sm:text-2xl p-1 sm:p-2 duration-500 ease-in"
              :class="{
                'text-red-500': errors.pw,
              }"
            >
              <i-mdi-key-outline
                class="group-focus-within:scale-125 transition-all ease-out duration-300"
              />
            </span>
          </template>
        </CommonsInput>
        <span
          v-if="errors.pw"
          class="max-sm:text-sm text-red-500 font-medium"
          >{{ errors.pw }}</span
        >
        <CommonsInput
          v-model="pwConfirm"
          placeholder="Confirm password"
          type="password"
        >
          <template #lead>
            <span   
              class="flex items-center sm:text-2xl p-1 sm:p-2 duration-500 ease-in"
              :class="{
                'text-red-500': errors.pwConfirm,
              }"
            >
              <i-mdi-lock-outline
                class="group-focus-within:scale-125 transition-all ease-out duration-300"
              />
            </span>
          </template>
        </CommonsInput>
        <span
          v-if="errors.pwConfirm"
          class="max-sm:text-sm text-red-500 font-medium"
          >{{ errors.pwConfirm }}</span
        >
        <div class="w-full">
          <CommonsButton class="w-full" text="Register" type="submit" />
        </div>
      </TransitionGroup>
    </form>
  </div>
</template>
