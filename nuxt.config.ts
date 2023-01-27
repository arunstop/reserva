export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
    'nuxt-icon',
  ],
  imports: {
    dirs: ['./stores'],
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
  googleFonts: {
    families: {
      Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      Righteous: true,
    },
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
  },
  // routeRules: {
  //     '/': { static: true },
  // },
})
