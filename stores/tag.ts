import type {Tag} from "@/types/tag"

export const useTagStore = defineStore('tagStore', {
    state: () => ({
        tags: [] as Tag[],
        selectedTag: {} as Tag,
    }),
    actions: {
        async fetchAll() {
            const data = await $fetch<{ models: Tag[] }>('http://localhost:11434/api/tags')
            this.tags = data.models
            this.selectedTag = data.models[0]
        },
        setSelectedTag(tag: Tag) {
            this.selectedTag = tag
        }
    }
})
