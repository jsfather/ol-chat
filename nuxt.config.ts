export default defineNuxtConfig({
    compatibilityDate: '2024-08-19',
    ssr: false,
    modules: ['@nuxtjs/tailwindcss', 'nuxt-headlessui', "@nuxt/icon", "@pinia/nuxt", '@formkit/auto-animate/nuxt', "nuxt-lodash"],
    css: ['@/assets/css/main.css'],
    headlessui: {
        prefix: 'Headless'
    },
    runtimeConfig: {
        ollamaHost: 'http://localhost:11434',
        public: {
            ollamaHost: 'http://localhost:11434'
        }
    },
    devtools: { enabled: true },
    nitro: {
        devProxy: {
            '/api/ollama': {
                target: 'http://localhost:11434/api',
                changeOrigin: true,
                prependPath: true
            }
        }
    },
    vite: {
        server: {
            proxy: {
                '/ollama': {
                    target: 'http://localhost:11434',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/ollama/, '')
                }
            }
        }
    }
})