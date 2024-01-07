import { useState } from 'react';
import './CommentField.css';
import * as dataApi from '../../../../../api/data';

interface CommentFieldProps {
    postId: string;    
}

export default function CommentField({postId}: CommentFieldProps) {
    const [text, setComment] = useState('');

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setComment(e.target.value);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await dataApi.postComment(postId, { text });
    }

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <textarea className="comment-field" value={text} onChange={handleChange} placeholder="Write a comment..." />
            <button className='comment-button' type='submit'><i className="fa-solid fa-paper-plane"></i></button>
        </form>
    );
}
