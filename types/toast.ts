export interface Toast {
    message: string,
    type: 'success' | 'error' | 'warning' | 'info',
    duration: number,
}