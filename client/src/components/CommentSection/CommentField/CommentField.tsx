import { useState } from 'react';
import './CommentField.css';


export default function CommentField() {
    const [comment, setComment] = useState('');

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setComment(e.target.value);
        console.log(e.target.value);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <textarea className="comment-field" value={comment} onChange={handleChange} placeholder="Write a comment..." />
            <button className='comment-button' type='submit'><i className="fa-solid fa-paper-plane"></i></button>
        </form>
    );
}
