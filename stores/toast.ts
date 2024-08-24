import type {Toast} from "@/types/toast"

export const useToastStore = defineStore('toastStore', {
    state: () => ({
        toasts: [] as Toast[],
    }),
    actions: {
        addToast(toast: Toast) {
            this.toasts.unshift(toast)
            if (toast.duration && toast.duration !== 'permanent') {
                setTimeout(() => {
                    const index = this.toasts.findIndex(item => item === toast);
                    this.deleteToast(index);
                }, toast.duration);
            } else if (typeof toast.duration === 'undefined') {
                setTimeout(() => {
                    const index = this.toasts.findIndex(item => item === toast);
                    this.deleteToast(index);
                }, 5000);
            }
        },
        deleteToast(index: number) {
            this.toasts.splice(index, 1)
        }
    }
})
