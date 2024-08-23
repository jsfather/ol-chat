export default defineNuxtConfig({
    compatibilityDate: '2024-08-19',
    ssr: false,
    modules: ['@nuxtjs/tailwindcss', 'nuxt-headlessui', "@nuxt/icon", "@pinia/nuxt", '@formkit/auto-animate/nuxt'],
    css: ['@/assets/css/main.css'],
    headlessui: {
        prefix: 'Headless'
    }
})