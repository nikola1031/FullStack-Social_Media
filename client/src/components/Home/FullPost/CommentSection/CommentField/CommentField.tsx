import { useState } from 'react';
import './CommentField.css';

interface CommentFieldProps {
    createComment: (text: string) => void
}

export default function CommentField({ createComment }: CommentFieldProps) {
    const [text, setText] = useState('');

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setText(e.target.value);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!text) return;
        
        createComment(text);
        setText('');
    }

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <textarea className="comment-field" value={text} onChange={handleChange} placeholder="Write a comment..." />
            <button className='comment-button' type='submit'><i className="fa-solid fa-paper-plane"></i></button>
        </form>
    );
}
