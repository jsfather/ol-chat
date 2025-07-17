import { Ollama } from 'ollama';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const config = useRuntimeConfig();

    // Ensure we always use the correct Ollama host
    const ollamaHost = config.ollamaHost || 'http://localhost:11434';
    console.log(`[Chat API] Using Ollama host: ${ollamaHost}`);
    const ollama = new Ollama({ host: ollamaHost });
    const response = await ollama.chat({
        model: body.model,
        messages: body.messages,
        stream: true,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        async start(controller) {
            for await (const part of response) {
                const chunk = JSON.stringify(part);
                controller.enqueue(encoder.encode(chunk + '\n'));
            }
            controller.close();
        },
    });

    setResponseHeaders(event, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });

    return sendStream(event, stream);
});
