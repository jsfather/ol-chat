import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '@/lib/store';
import {fetchTagsData, setSelectedTag} from '@/lib/slices/tagsSlice';
import {Tag} from '@/types/tags';
import {FaArrowUp} from 'react-icons/fa';
import {sendMessage, fetchChat} from '@/lib/slices/chatSlice';

export default function Home() {
    const dispatch: AppDispatch = useDispatch();
    const tagsData: Tag[] = useSelector((state: RootState) => state.tags.data);
    const status = useSelector((state: RootState) => state.tags.status);
    const selectedTag = useSelector((state: RootState) => state.tags.selectedTag);
    const [input, setInput] = useState('');
    const chatData = useSelector((state: RootState) => state.chat.data);

    const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTagModel = event.target.value;
        const tagObject = tagsData.find(tag => tag.model === selectedTagModel) || null;
        dispatch(setSelectedTag(tagObject));
    };

    const handleSendMessage = () => {
        dispatch(sendMessage(input));
    };

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTagsData());
        }
    }, [status, dispatch]);

    useEffect(() => {
        dispatch(fetchChat());
    }, [dispatch]);

    return <>
        <div className="text-white text-center text-sm p-4">
            {chatData.map((chat) => (
                <div key={chat.model}>{JSON.stringify(chat.message.content)}</div>
            ))}
        </div>
        <form className="w-1/2 mx-auto rounded-3xl fixed bottom-6 right-0 left-0 bg-gray-800">
            <div className="flex">
                <select value={selectedTag?.model || ''} disabled={tagsData.length === 0}
                        onChange={handleTagChange}
                        className="py-2.5 px-4 bg-transparent border-none focus:ring-0 text-gray-500">
                    {tagsData.map((tag) =>
                        <option key={tag.model} value={tag.model}>
                            {tag.name}
                        </option>
                    )}
                </select>

                <div className="relative w-full">
                    <input value={input}
                           onChange={(e) => setInput(e.target.value)}
                           type="search" id="location-search"
                           disabled={tagsData.length === 0}
                           className=" p-4 w-full z-20 bg-transparent text-white text-lg border-none focus:ring-0"
                           placeholder={tagsData.length === 0 ? 'No LLM detected' : `Ask ${selectedTag?.details.family} anything...`}
                           required/>
                    <button onClick={handleSendMessage} disabled={status === 'loading' || input.length === 0}
                            type="button"
                            className="absolute top-0 end-0 h-full p-5 bg-blue-700 rounded-e-3xl disabled:bg-gray-700">
                        <FaArrowUp/>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </form>
    </>
}