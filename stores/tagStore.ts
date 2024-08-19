import type {Tag} from "@/types/tag"


export const useTagStore = defineStore('tagStore', {
    state: (): { tags: Tag[], loading: boolean, error: string | null } => ({
        tags: [],
        loading: false,
        error: '',
    }),
    actions: {
        async fetchData() {
            this.loading = true;
            this.error = null;
            try {
                const data = await $fetch<{ models: Tag[] }>('http://localhost:11434/api/tags');
                this.tags = data.models;
            } catch (err) {
                this.error = (err as Error).message;
            } finally {
                this.loading = false;
            }
        },
    },
});
