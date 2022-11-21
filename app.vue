<script setup lang="ts">
useHead(
    {
        title: "Reserva - Get your reservation here",
        meta: [
            { name: 'description', content: 'Reserve anything quick, simple and trustworthy.' },
        ]
    }
)
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
    <div class="p-4  min-h-screen flex flex-col [&>*]:rounded-xl max-w-[900px] mx-auto">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
