import type {Chat} from "@/types/chat"

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

            try {
                const data = await $fetch<Chat>('http://localhost:11434/api/chat', {
                    method: 'POST',
                    body: {model: tagStore.selectedTag.model, stream: false, messages: this.chatHistory}
                })
                this.chatHistory.push({role: data.message.role, content: data.message.content})
            } catch (error) {
                this.error = 'Failed to send message. Please try again.';
            } finally {
                this.isLoading = false;
            }
        }
    }
})
