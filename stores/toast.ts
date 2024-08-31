import type {Toast} from "@/types/toast"

export const useToastStore = defineStore('toastStore', {
    state: () => ({
        toasts: [] as Toast[],
    }),
    actions: {
        addToast(toast: Toast) {
            if (!toast.duration) toast.duration = 5000
            this.toasts.unshift(toast)
            const interval = setInterval(() => {
                const index = this.toasts.findIndex(item => isEqual(item, toast));
                if (this.toasts[index]?.duration) {
                    this.toasts[index].duration = this.toasts[index].duration - 1000
                    if (this.toasts[index].duration === 0) {
                        this.deleteToast(index)
                        clearInterval(interval)
                    }
                } else clearInterval(interval)
            }, 1000)
        },
        deleteToast(index: number) {
            this.toasts.splice(index, 1)
        }
    }
})
