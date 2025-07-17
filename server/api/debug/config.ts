export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    
    return {
        ollamaHost: config.ollamaHost,
        publicOllamaHost: config.public.ollamaHost,
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    };
});
