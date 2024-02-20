import { CommentData } from "../../../../../types/data";
import * as dataApi from '../../../../../api/data';
import "./Comment.css";
import { useState } from "react";
import { useAuthContext } from "../../../../../hooks/useAuthContext";
import { Link } from "react-router-dom";
import PathConstants from "../../../../../routes/PathConstants";
import Avatar from "../../../../UI/Avatar/Avatar";
import Time from "../../../../UI/Time/Time";
import CommentActionButton from "../../../../UI/CommentActionButton/CommentActionButton";

interface CommentProps {
    comment: CommentData;
    postId: string;
    updateComment: (commentId: string, updatedComment: string) => void;
    deleteComment: (commentId: string) => void;
}

export default function Comment({comment, postId, deleteComment, updateComment}: CommentProps) {
    const { user } = useAuthContext();
    const [likeCount, setLikeCount] = useState<number>(comment.likes.userLikes.length);
    const [isLiked, setIsLiked] = useState<boolean>(() => comment.likes.userLikes.includes(user!._id))
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [updatedComment, setUpdatedComment] = useState<string>('');
    const isAuthor = user?._id === comment.author._id

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUpdatedComment(e.target.value);
    }

    function handleLikeComment() {
        dataApi.likeComment(postId, comment._id).then(data => {
            setIsLiked(!isLiked)
            setLikeCount(data.likeCount);
        });
    }

    function handleDeleteComment() {
        deleteComment(comment._id);
    }

    function handleShowEdit() {
        setIsEditing(!isEditing);
        setUpdatedComment(comment.text);
    }
    
    function handleEditComment() {
        if(!updatedComment || updatedComment === comment.text) {
            setIsEditing(false);
            return;
        }

        updateComment(comment._id, updatedComment)
        setIsEditing(false);
    }

    return (
            <div className="comment">
                <div>
                    <Avatar image={comment.author.profilePicture} withLinkTo={comment.author._id} size="small"/>
                </div>
                <div className="comment-info-container">
                    <div className="comment-info">
                        <Link to={`/${PathConstants.Profile}/${comment.author._id}`}>
                            <p className="comment-username">{comment.author.username}</p>
                        </Link>
                        { isEditing 
                            ? 
                                (
                                <div className="comment-edit-form" onSubmit={handleEditComment}>
                                    <textarea className="comment-edit-field" value={updatedComment} onChange={handleChange} placeholder="Write a comment..." />
                                </div>    
                                )       
                            : 
                                (
                                <div className="comment-content">
                                    <p>{comment.text}</p>
                                    <div className="comment-likes">{likeCount}<i className="fa-solid fa-heart"></i></div>
                                </div>
                                )
                        }
                    </div>
                    <div className="comment-actions-container">
                        <Time time={comment.createdAt} />
                        <div className="comment-actions">
                            <CommentActionButton type="like" onClickHandler={handleLikeComment} isLiked={isLiked}>Like</CommentActionButton>
                            {isAuthor &&
                                <>
                                    <CommentActionButton type="delete" onClickHandler={handleDeleteComment}>Delete</CommentActionButton>
                                    <CommentActionButton type="edit" onClickHandler={handleShowEdit}>{isEditing ? 'Cancel' : 'Edit'}</CommentActionButton>
                                    {isEditing &&
                                        <CommentActionButton type="submit" onClickHandler={handleEditComment} disabled={!updatedComment} >Submit</CommentActionButton>
                                    }
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
    );
}
