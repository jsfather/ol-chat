import type {Error} from "@/types/error"
import ollama from 'ollama'

interface Message {
    role: string,
    content: string
}

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
                const response = await ollama.chat({
                    model: tagStore.selectedTag.model,
                    messages: this.chatHistory,
                    stream: true
                })
                let executed = false;
                for await (const part of response) {
                    if (executed) {
                        this.chatHistory[this.chatHistory.length - 1].content = this.chatHistory[this.chatHistory.length - 1].content + part.message.content
                    } else {
                        this.chatHistory.push({
                            role: part.message.role,
                            content: part.message.content
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
