import { useState } from 'react';
import Upload from '../shared/Upload/Upload';
import FullPost from './FullPost/FullPost';
import './Home.css';
import * as dataApi from '../../api/data';
import { useAuthContext } from '../../hooks/useAuthContext';

// TODO: Add posts from database here - getAllPosts()'
export default function Home() {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [postText, setPostText] = useState<string>('');
    const { user } = useAuthContext();

    

    function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setPostText(e.target.value);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData();

        selectedFiles.forEach((file) => {
            formData.append(`files`, file);
        });

        formData.append('text', postText);

        if (user) {
            const res = await dataApi.uploadPost(formData, user.accessToken);
        } else {
            throw new Error('Please login before posting');
        }
    }

    // TODO: Add posts from database here - getAllPosts()
    // TODO: Make adding post work
    return (
        <>
            <section className="send-post">
                <form
                    onSubmit={handleSubmit}
                    className="send-post-form"
                    encType="multipart/form-data"
                >
                    <div className="send-post-input-container">
                        <img
                            className="send-post-img user-avatar"
                            src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            alt="avatar"
                        />
                        <textarea
                            onChange={handleTextChange}
                            value={postText}
                            className="send-post-input"
                            placeholder="What's on your mind?"
                        />
                        {/* Need to add image uploads around here somewhere later */}
                    </div>
                    <Upload
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
                    />
                    <button className="send-post-btn">Post</button>
                </form>
            </section>
            <section className="posts-container">
                <FullPost />
                <FullPost />
                <FullPost />
            </section>
        </>
    );
}
