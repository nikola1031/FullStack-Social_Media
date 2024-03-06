import styles from './CommentActionButton.module.css';

interface CommentActionButtonProps {
    onClickHandler: () => void;
    isLiked?: boolean;
    type: 'delete' | 'edit' | 'like' | 'submit'
    children: React.ReactNode;
    disabled?: boolean;
}

export default function CommentActionButton({onClickHandler, type, isLiked, children, disabled = false}: CommentActionButtonProps) {

    const className = `${styles["comment-action"]} ${type ==='like' ? styles["comment-like"] : ''} ${isLiked ? styles["active"] : ''}`;

    return (
        <button disabled={disabled} onClick={onClickHandler} className={className}>
            {children}
        </button>
    )
}
