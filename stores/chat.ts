import type {Error} from "@/types/error"
import OpenAI from 'openai'

interface Message {
    role: string,
    content: string
}

const openai = new OpenAI({
    baseURL: 'http://localhost:11434/v1/',
    apiKey: 'ollama',
    dangerouslyAllowBrowser: true
});

export const useChatStore = defineStore('chatStore', {
    state: () => ({
        chatHistory: [] as Message[],
        isLoading: false as boolean,
        error: null as string | null,
    }),
    actions: {
        async sendMessage(message: Message) {
            this.isLoading = true
            this.chatHistory.push(message)
            const tagStore = useTagStore()
            const toastStore = useToastStore()

            try {
                const stream = await openai.chat.completions.create({
                    model: tagStore.selectedTag.model,
                    messages: this.chatHistory,
                    stream: true,
                })
                let executed = false;
                for await (const part of stream) {
                    if (executed) {
                        this.chatHistory[this.chatHistory.length - 1].content = this.chatHistory[this.chatHistory.length - 1].content + part.choices[0]?.delta?.content || ''
                    } else {
                        this.chatHistory.push({
                            role: part.choices[0]?.delta?.role || '',
                            content: part.choices[0]?.delta?.content || ''
                        })
                        executed = true
                    }
                }
                this.isLoading = false;
            } catch (error: Error | any) {
                toastStore.addToast({message: error.message, type: 'error'})
            } finally {
                this.isLoading = false;
            }
        }
    }
})
