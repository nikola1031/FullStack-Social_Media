import { CommentData } from "../../../../../types/data";
import { formatRelativeTime } from "../../../../../utils/timeAgoFormatter";
import * as dataApi from '../../../../../api/data';
import "./Comment.css";
import { useState } from "react";
import { useAuthContext } from "../../../../../hooks/useAuthContext";

interface CommentProps {
    comment: CommentData
    postId: string
}

export default function Comment({comment, postId}: CommentProps) {
    const { user } = useAuthContext();
    const [likeCount, setLikeCount] = useState<number>(comment.likes.likeCount);
    const [isLiked, setIsLiked] = useState<boolean>(() => comment.likes.userLikes.includes(user!._id))
    // TODO: Delete a comment if author 
    // TODO: Edit a comment if author 
    function handleLikeComment() {
        dataApi.likeComment(postId, comment._id).then(likes => {
            setIsLiked(!isLiked)
            setLikeCount(likes.likeCount);
        });
    }

    return (
        <div className="comment">
            <img className="user-avatar" src={comment.author.profilePicture} alt="avatar" />
            <div className="comment-info-container">
                <div className="comment-info">
                    <p className="comment-username">{comment.author.username}</p>
                    <p className="comment-content">
                        {comment.text}
                        <span className="comment-likes">{likeCount}<i className="fa-solid fa-heart"></i></span>
                    </p>
                </div>
                <div className="comment-actions">
                    <time className="comment-time">{formatRelativeTime(comment.createdAt)}</time>
                    <button onClick={handleLikeComment} className={`comment-action comment-like${isLiked ? ' active' : ''}`}>Like</button>
                    <button className="comment-action comment-delete">Delete</button>
                    <button className="comment-action comment-edit">Edit</button>
                </div>
            </div>
        </div>
    );
}
