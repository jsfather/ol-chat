import type {Toast} from "@/types/toast"

export const useToastStore = defineStore('toastStore', {
    state: () => ({
        toasts: [] as Toast[],
    }),
    actions: {
        addToast(toast: Toast) {
            this.toasts.push(toast)
        }
    }
})
