<template>
  <div>
    <h1>Streaming Response Example</h1>
    <div>
      <div>{{ data }}</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import OpenAI from 'openai';

export default {
  name: 'StreamingResponse',
  setup() {
    const data = ref('');
    const loading = ref(true);

    onMounted(async () => {
      const openai = new OpenAI({
        baseURL: 'http://localhost:11434/v1/',
        apiKey: 'ollama',
        dangerouslyAllowBrowser: true
      });

      const stream = await openai.chat.completions.create({
        model: 'phi3:mini',
        messages: [{ role: 'user', content: 'Say this is a test' }],
        stream: true,
      });

      for await (const part of stream) {
        data.value = data.value + part.choices[0]?.delta?.content || ''
      }

      loading.value = false;
    });

    return { data, loading };
  }
};
</script>