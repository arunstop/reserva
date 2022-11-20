<script setup>
useHead(
    {
        title:"Reserva - Get your reservation here",
        meta:[
        { name: 'description', content: 'Reserve anything quick, simple and trustworthy.' },
        ]
    }
)
</script>
<template>
    <div class="p-4  min-h-screen flex flex-col [&>*]:rounded-xl max-w-[900px] mx-auto">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
