import type {Toast} from "@/types/toast"

export const useToastStore = defineStore('toastStore', {
    state: () => ({
        toasts: [] as Toast[],
    }),
    actions: {
        addToast(toast: Toast) {
            if (toast.duration === undefined) toast.duration = 5000
            if (toast.dismissible === undefined) toast.dismissible = true
            this.toasts.unshift(toast)
            if (toast.duration !== 'permanent') {
                const interval = setInterval(() => {
                    const index = this.toasts.findIndex(item => isEqual(item, toast));
                    this.toasts[index].duration = Number(this.toasts[index].duration) - 1000
                    if (Number(this.toasts[index].duration) <= 0) {
                        this.deleteToast(index)
                        clearInterval(interval)
                    }
                }, 1000)
            }
        },
        deleteToast(index: number) {
            this.toasts.splice(index, 1)
        }
    }
})
