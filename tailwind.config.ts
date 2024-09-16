import type {Config} from 'tailwindcss'

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                primary: '#18C3F8'
            }
        }
    },
    plugins: [
        require('tailwind-scrollbar'),
    ]
}
