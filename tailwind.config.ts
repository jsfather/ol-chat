import type {Config} from 'tailwindcss'

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                primary: '#2563EB'
            }
        }
    },
    plugins: [
        require('tailwind-scrollbar'),
    ]
}
