import type {AppProps} from 'next/app'
import '@/app/globals.css'
import {Provider} from 'react-redux';
import store from '@/lib/store';

export default function App({Component, pageProps}: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}