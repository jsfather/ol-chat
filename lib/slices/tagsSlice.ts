import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {TagsState, Tag} from '@/types/tags';
import {RootState} from "@/lib/store";

const initialState: TagsState = {
    data: [],
    status: 'idle',
    error: null,
    selectedTag: null,
};

export const fetchTagsData = createAsyncThunk('tags/fetchData', async (_, {getState, dispatch}) => {
    const response = await axios.get<{ models: Tag[] }>('http://localhost:11434/api/tags');

    const state = getState() as RootState
    if (!state.tags.selectedTag) dispatch(setSelectedTag(response.data.models[0]))

    return response.data.models;
});

const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        setSelectedTag: (state, action: PayloadAction<Tag | null>) => {
            state.selectedTag = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTagsData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTagsData.fulfilled, (state, action: PayloadAction<Tag[]>) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchTagsData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Something went wrong';
            });
    },
});

export const {setSelectedTag} = tagsSlice.actions;

export default tagsSlice.reducer;
