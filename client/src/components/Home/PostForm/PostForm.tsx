import { useState } from 'react';
import Upload from '../../shared/Upload/Upload';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';
import styles from './PostForm.module.css';
import Avatar from '../../UI/Avatar/Avatar';
import Loader from '../../UI/Loader/Loader';
interface PostFormProps {
    createPost: (post: FormData) => Promise<void>;
    loading: boolean;
}

export default function PostForm({ createPost, loading }: PostFormProps) {
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
        resetForm();
        await createPost(formData);
    }

    return (
        <section className={styles["send-post"]}>
                <form
                    onSubmit={handleSubmit}
                    className={styles["send-post-form"]}
                    encType="multipart/form-data"
                >
                    <div className={styles["send-post-input-container"]}>
                    <Avatar image={user?.profilePicture} size='large' withLinkTo={user?._id}/>
                        <textarea
                            onChange={handleTextChange}
                            value={postText}
                            className={styles["send-post-input"]}
                            placeholder="What's on your mind?"
                        />
                    </div>
                    <Upload
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
                    />
                    {loading ? <Loader /> : <button className={styles["send-post-btn"]}>Post</button>}
                    
                </form>
            </section>
    )
}