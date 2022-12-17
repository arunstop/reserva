// https://v3.nuxtjs.org/api/configuration/nuxt.config
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

export default defineNuxtConfig({
    typescript: {
        shim: false,
    },
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/supabase',
        '@nuxtjs/google-fonts',
        [
            'unplugin-icons/nuxt',
            {
                /* options */
            },
        ],
        '@vueuse/nuxt',
    ],
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
    vite: {
        plugins: [
            Components({
                resolvers: [IconsResolver()],
            }),
            Icons({
                autoInstall: true,
            }),
        ],
    },
    // routeRules: {
    //     '/': { static: true },
    // },
})
