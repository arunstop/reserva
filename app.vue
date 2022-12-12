<script setup lang="ts">
  useHead({
    title: 'Reserva - Get your reservation here',
    meta: [
      {
        name: 'description',
        content: 'Reserve anything quick, simple and trustworthy.',
      },
    ],
  })
  // const user = useSupabaseUser()
  // onMounted(() => {
  //     watchEffect(() => {
  //         if (user.value) {
  //             navigateTo("/")
  //         }
  //         if(!user.value){
  //             navigateTo
  //         }
  //     })
  // })
</script>
<template>
  <div class="min-h-screen flex flex-col">
    <NuxtLayout>
      <NuxtPage />
      <MainToastContainer />
      <ClientOnly>
        <LazyMainConfirmationModal />
      </ClientOnly>
    </NuxtLayout>
  </div>
</template>
