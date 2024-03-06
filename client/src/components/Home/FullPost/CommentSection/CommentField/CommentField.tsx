import { useState } from 'react';
import styles from './CommentField.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

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
        <form className={styles["comment-form"]} onSubmit={handleSubmit}>
            <textarea className={styles["comment-field"]} value={text} onChange={handleChange} placeholder="Write a comment..." />
            <button className={styles['comment-button']} type='submit'>
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
        </form>
    );
}
