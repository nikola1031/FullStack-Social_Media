import { CommentData } from "../../../../../types/data";
import { formatRelativeTime } from "../../../../../utils/timeAgoFormatter";
import * as dataApi from '../../../../../api/data';
import "./Comment.css";
import { useState } from "react";
import { useAuthContext } from "../../../../../hooks/useAuthContext";

interface CommentProps {
    comment: CommentData;
    postId: string;
    fetchComments: () => void;
}

export default function Comment({comment, postId, fetchComments}: CommentProps) {
    const { user } = useAuthContext();
    const [likeCount, setLikeCount] = useState<number>(comment.likes.likeCount);
    const [isLiked, setIsLiked] = useState<boolean>(() => comment.likes.userLikes.includes(user!._id))
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [updatedComment, setUpdatedComment] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUpdatedComment(e.target.value);
    }

    function handleLikeComment() {
        dataApi.likeComment(postId, comment._id).then(likes => {
            setIsLiked(!isLiked)
            setLikeCount(likes.likeCount);
        });
    }

    function handleDeleteComment() {
        dataApi.deleteCommentById(postId, comment._id).then(() => {
            fetchComments();
        })
    }

    function handleShowEdit() {
        setIsEditing(!isEditing);
        setUpdatedComment(comment.text);
    }
    
    function handleEditComment(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dataApi.updateComment(postId, {text: updatedComment}, comment._id).then(() => {
            setUpdatedComment('');
            setIsEditing(false);
            fetchComments();
        })
    }


    return (
            <div className="comment">
                <img className="user-avatar" src={comment.author.profilePicture} alt="avatar" />
                <div className="comment-info-container">
                    <div className="comment-info">
                        <p className="comment-username">{comment.author.username}</p>
                        { isEditing ? 
                            (
                            <form className="comment-edit-form" onSubmit={handleEditComment}>
                                <textarea className="comment-edit-field" value={updatedComment} onChange={handleChange} placeholder="Write a comment..." />
                                <button className="comment-edit-submit-btn" type="submit">Submit</button>
                            </form>    
                            )       : 
                        (
                        <div className="comment-content">
                            <p>{comment.text}</p>
                            <div className="comment-likes">{likeCount || 0}<i className="fa-solid fa-heart"></i></div>
                        </div>
                        )
                        }
                    </div>
                    <div className="comment-actions">
                        <time className="comment-time">{formatRelativeTime(comment.createdAt)}</time>
                        <button onClick={handleLikeComment} className={`comment-action comment-like${isLiked ? ' active' : ''}`}>Like</button>
                        <button onClick={handleDeleteComment} className="comment-action comment-delete">Delete</button>
                        <button onClick={handleShowEdit} className="comment-action comment-edit">{isEditing ? 'Cancel' : 'Edit'}</button>
                    </div>
                </div>
            </div>
    );
}
