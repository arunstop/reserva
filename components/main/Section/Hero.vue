<script setup lang="ts">
  const keyword = ref<string>('')
  const search = () => {
    navigateTo(`?search=${keyword.value.trim().toLowerCase()}`, {})
    keyword.value = ''
    document.getElementById('section-feed')?.scrollIntoView({
      behavior: 'smooth',
    })
  }
</script>
<template>
  <section
    class="min-h-screen bg-gradient-to-br from-cyan-400 to-violet-800 flex justify-center"
  >
    <div
      class="flex flex-col min-h-screen items-center justify-center text-center gap-4 sm:gap-8 p-4 sm:p-8 max-w-7xl"
    >
      <p class="text-3xl sm:text-5xl font-bold text-white">
        <span>Reserve</span>&nbsp;<CommonsTextGradient
          class="from-pink-300 via-orange-500 to-red-500"
        >
          your moments
        </CommonsTextGradient>
      </p>
      <span class="text-lg sm:text-xl text-white max-w-[50%]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident a
        eaque officiis rerum eos mollitia
      </span>
      <div class="flex flex-col gap-2 sm:gap-4 w-full max-w-[80%] items-center">
        <CommonsInput
          v-model="keyword"
          :placeholder="'Reservation for restaurant opening'"
          type="search"
          class="w-full "
        >
          <template #lead>
            <span
              class="text-orange-500 text-xl sm:text-3xl m-2 peer-focus:scale-110"
            >
              <i-mdi-search />
            </span>
          </template>
        </CommonsInput>
        <CommonsButton
          class="from-orange-500 to-red-500 text-lg sm:text-2xl w-[15rem] sm:w-[20rem]"
          @click="search"
        >
          Search reservation
        </CommonsButton>
      </div>
    </div>
  </section>
</template>
