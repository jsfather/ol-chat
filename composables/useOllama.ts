export const useOllama = () => {
  const config = useRuntimeConfig()
  
  const ollamaHost = config.public.ollamaHost || 'http://localhost:11434'
  
  return {
    host: ollamaHost,
    apiUrl: `${ollamaHost}/api`,
    
    // Helper methods for common endpoints
    endpoints: {
      tags: `${ollamaHost}/api/tags`,
      chat: `${ollamaHost}/api/chat`,
      pull: `${ollamaHost}/api/pull`,
      push: `${ollamaHost}/api/push`,
      generate: `${ollamaHost}/api/generate`,
      embeddings: `${ollamaHost}/api/embeddings`,
      show: `${ollamaHost}/api/show`,
      copy: `${ollamaHost}/api/copy`,
      delete: `${ollamaHost}/api/delete`
    }
  }
}
