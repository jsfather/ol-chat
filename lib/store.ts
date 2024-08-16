import {configureStore} from '@reduxjs/toolkit';
import tagsReducer from './slices/tagsSlice';
import chatReducer from './slices/chatSlice';

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        tags: tagsReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
