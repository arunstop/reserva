<script setup lang="ts">
  type TForm = 'LOGIN' | 'REGISTER'
  const form = ref<TForm>('LOGIN')
  const isLogin = computed(() => form.value === 'LOGIN')
  const isRegister = computed(() => form.value === 'REGISTER')

  function switchForm(newForm: TForm) {
    form.value = newForm
  }
</script>
<template>
  <div
    class="flex flex-col w-full bg-zinc-200/70 p-4 sm:p-8 items-center gap-3 sm:gap-6"
  >
    <span class="font-bold text-3xl sm:text-5xl from-gray-300 to-zinc-600">
      {{ isLogin ? 'Login' : 'Register' }}
    </span>
    <div class="flex flex-col flex-1 children:h-full">
      <MainAuthLoginForm v-if="isLogin" />
      <MainAuthRegisterForm v-if="isRegister" />
    </div>
    <div class="flex justify-center">
      <span
        class="flex-none hocus:underline font-bold max-sm:text-sm"
        role="button"
        @click="() => (isLogin ? switchForm('REGISTER') : switchForm('LOGIN'))"
      >
        {{ isLogin ? `Don't have account?` : `Already have an account?` }}
      </span>
    </div>
  </div>
</template>
