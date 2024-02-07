import './CommentButton.css';

interface CommentActionButtonProps {
    onClickHandler: () => void;
    isLiked?: boolean;
    isEditing?: boolean;
}

export default function CommentActionButton({onClickHandler, isLiked, isEditing}: CommentActionButtonProps) {
    if (isLiked !== undefined) {
        return ( 
        <button onClick={onClickHandler} 
            className={`comment-action comment-like${isLiked ? ' active' : ''}`}
            >
            Like
        </button>
        )
    }

    if (isEditing !== undefined) {
        return (
            <button onClick={onClickHandler} 
            className={`comment-action comment-like${isLiked ? ' active' : ''}`}
            >
            {isEditing ? 'Cancel' : 'Edit'} 
        </button>
        )
    }

    return (
        <button onClick={onClickHandler} 
            className="comment-action"
            >
            Delete
        </button>
    )
  
}
