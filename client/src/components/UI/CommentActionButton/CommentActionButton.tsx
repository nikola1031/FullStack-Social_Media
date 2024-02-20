import './CommentActionButton.css';

interface CommentActionButtonProps {
    onClickHandler: () => void;
    isLiked?: boolean;
    type: 'delete' | 'edit' | 'like' | 'submit'
    children: React.ReactNode;
    disabled?: boolean;
}

export default function CommentActionButton({onClickHandler, type, isLiked, children, disabled = false}: CommentActionButtonProps) {

    const className = `comment-action${type ==='like' ? ' comment-like' : ''} ${isLiked ? 'active' : ''}`;

    return (
        <button disabled={disabled} onClick={onClickHandler} className={className}>
            {children}
        </button>
    )
}
