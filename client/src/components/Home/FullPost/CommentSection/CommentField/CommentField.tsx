import { useState } from 'react';
import './CommentField.css';
import * as dataApi from '../../../../../api/data';

interface CommentFieldProps {
    postId: string;
    fetchComments: () => void;
}

export default function CommentField({postId, fetchComments}: CommentFieldProps) {
    const [text, setText] = useState('');

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setText(e.target.value);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await dataApi.postComment(postId, { text });
        fetchComments();
        setText('');
    }

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <textarea className="comment-field" value={text} onChange={handleChange} placeholder="Write a comment..." />
            <button className='comment-button' type='submit'><i className="fa-solid fa-paper-plane"></i></button>
        </form>
    );
}
