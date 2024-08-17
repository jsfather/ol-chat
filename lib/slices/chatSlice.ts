import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {ChatState, Chat} from '@/types/chat';
import axios from "axios";
import {RootState} from "@/lib/store";

const initialState: ChatState = {
    data: [],
    status: 'idle',
    error: null,
};

export const fetchChat = createAsyncThunk(
    'chat/chatState',
    async (_, {getState}) => {
        const state = getState() as RootState
        return state.chat.data
    }
);

export const sendMessage = createAsyncThunk('chat/sendMessage', async (content: string, {getState}) => {
    const state = getState() as RootState;
    const selectedTag = state.tags.selectedTag;
    const response = await axios.post<Chat>('http://127.0.0.1:11434/api/chat', JSON.stringify({
        model: selectedTag?.model,
        messages: [
            {
                role: 'user',
                content,
            },
        ],
        stream: false,
    }), {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data
});

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(sendMessage.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.data.push(action.payload);
            })
            .addCase(sendMessage.rejected, (state, action: PayloadAction<any | null>) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default chatSlice.reducer;
