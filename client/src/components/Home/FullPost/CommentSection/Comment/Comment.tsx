import { CommentData } from "../../../../../types/data";
import { formatRelativeTime } from "../../../../../utils/timeAgoFormatter";
import * as dataApi from '../../../../../api/data';
import "./Comment.css";
import { useState } from "react";
import { useAuthContext } from "../../../../../hooks/useAuthContext";
import { Link } from "react-router-dom";
import PathConstants from "../../../../../routes/PathConstants";
import Avatar from "../../../../UI/Avatar/Avatar";
import Time from "../../../../UI/Time/Time";
import CommentActionButton from "../../../../UI/CommentButton/CommentButton";

interface CommentProps {
    comment: CommentData;
    postId: string;
    fetchComments: () => void;
}

export default function Comment({comment, postId, fetchComments}: CommentProps) {
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

        if(!updatedComment || updatedComment === comment.text) {
            setIsEditing(false);
            return;
        }

        dataApi.updateComment(postId, {text: updatedComment}, comment._id).then(() => {
            setUpdatedComment('');
            setIsEditing(false);
            fetchComments();
        })
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
                                <form className="comment-edit-form" onSubmit={handleEditComment}>
                                    <textarea className="comment-edit-field" value={updatedComment} onChange={handleChange} placeholder="Write a comment..." />
                                    <button disabled={!updatedComment} className="comment-edit-submit-btn" type="submit">Submit</button>
                                </form>    
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
                            <CommentActionButton onClickHandler={handleLikeComment} isLiked={isLiked} />
                            {isAuthor &&
                                <>
                                    <CommentActionButton onClickHandler={handleDeleteComment} />
                                    <CommentActionButton onClickHandler={handleShowEdit} isEditing={isEditing} />
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
    );
}
