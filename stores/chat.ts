import type { Error } from "@/types/error"

interface Message {
    role: string
    content: string
}

export const useChatStore = defineStore('chatStore', {
    state: () => ({
        chatHistory: [] as Message[],
        isLoading: false,
        error: null as string | null,
    }),
    actions: {
        async sendMessage(message: Message) {
            this.isLoading = true;
            this.chatHistory.push(message);

            const tagStore = useTagStore();
            const toastStore = useToastStore();
            const { endpoints } = useOllama();

            try {
                const response = await fetch(endpoints.chat, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: tagStore.selectedTag.model,
                        messages: this.chatHistory,
                        stream: true
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                if (!response.body) {
                    throw new Error('No stream in response');
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder('utf-8');
                let executed = false;

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    const lines = chunk.split('\n').filter(line => line.trim());

                    for (const line of lines) {
                        try {
                            const parsed = JSON.parse(line);

                            if (parsed.message) {
                                if (executed) {
                                    this.chatHistory[this.chatHistory.length - 1].content += parsed.message.content;
                                } else {
                                    this.chatHistory.push({
                                        role: parsed.message.role,
                                        content: parsed.message.content
                                    });
                                    executed = true;
                                }
                            }
                        } catch (parseError) {
                            console.warn('Failed to parse JSON line:', line, parseError);
                        }
                    }
                }
            } catch (error: Error | any) {
                console.error('Chat error:', error);
                toastStore.addToast({ message: error.message || 'Failed to send message', type: 'error' });
            } finally {
                this.isLoading = false;
            }
        }
    }
});
