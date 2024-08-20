import type {Config} from 'tailwindcss'

export default <Partial<Config>>{
    plugins: [
        require('tailwind-scrollbar'),
    ]
}
