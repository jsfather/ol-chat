import { Ollama } from 'ollama';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const config = useRuntimeConfig();

    // Ensure we always use the correct Ollama host
    const ollamaHost = config.ollamaHost || 'http://localhost:11434';
    const ollama = new Ollama({ host: ollamaHost });

    const response = await ollama.pull({
        model: body.model,
        stream: true
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        async start(controller) {
            for await (const part of response) {
                const json = JSON.stringify(part);
                controller.enqueue(encoder.encode(json + '\n'));
            }
            controller.close();
        }
    });

    setResponseHeaders(event, {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    });

    return sendStream(event, stream);
});
