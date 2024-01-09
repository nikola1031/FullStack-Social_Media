import { useState } from 'react';
import Upload from '../../shared/Upload/Upload';
import { useAuthContext } from '../../../hooks/useAuthContext';
import * as dataApi from '../../../api/data';
import './PostForm.css';

interface PostFormProps {
    fetchPosts: () => void;
}


export default function PostForm({ fetchPosts }: PostFormProps) {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [postText, setPostText] = useState<string>('');
    const { user } = useAuthContext();

    function resetForm() {
        setSelectedFiles([]);
        setPostText('');
    }

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
            resetForm();
            await dataApi.uploadPost(formData);
            fetchPosts();
        } else {
            throw new Error('Please login before posting');
        }
    }

    return (
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
                    </div>
                    <Upload
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
                    />
                    <button className="send-post-btn">Post</button>
                </form>
            </section>
    )
}