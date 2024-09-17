import type {Tag} from "@/types/tag"
import type {Error} from "~/types/error";

export const useTagStore = defineStore('tagStore', {
    state: () => ({
        tags: [] as Tag[],
        selectedTag: {} as Tag,
    }),
    actions: {
        async fetchAll() {
            const toastStore = useToastStore()
            try {
                const data = await $fetch<{ models: Tag[] }>('http://localhost:11434/api/tags')
                this.tags = data.models
                this.selectedTag = data.models[0]
            } catch (error: Error | any) {
                toastStore.addToast({message: error, type: 'error', duration: 'permanent', dismissible: false})
                toastStore.addToast({
                    message: 'Please ensure that Ollama is installed and running on port 11434 on your computer.',
                    type: 'warning',
                    duration: 'permanent',
                    dismissible: false
                })
            }
        },
        setSelectedTag(tag: Tag) {
            this.selectedTag = tag
        }
    }
})
