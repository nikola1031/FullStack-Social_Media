import styles from "./Comment.module.css";
import { CommentData } from "../../../../../types/data";
import { useState } from "react";
import { useAuthContext } from "../../../../../hooks/auth/useAuthContext";
import { Link } from "react-router-dom";
import PathConstants from "../../../../../routes/PathConstants";
import Avatar from "../../../../UI/Avatar/Avatar";
import Time from "../../../../UI/Time/Time";
import CommentActionButton from "../../../../UI/CommentActionButton/CommentActionButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";


interface CommentProps {
    comment: CommentData;
    postId: string;
    updateComment: (commentId: string, updatedComment: string) => void;
    deleteComment: (commentId: string) => void;
    likeComment: (postId: string, commentId: string) => Promise<number>;
}

export default function Comment({comment, postId, deleteComment, updateComment, likeComment}: CommentProps) {
    const { user } = useAuthContext();
    const [likeCount, setLikeCount] = useState<number>(comment.likes.userLikes.length);
    const [isLiked, setIsLiked] = useState<boolean>(() => comment.likes.userLikes.includes(user!._id));
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [updatedComment, setUpdatedComment] = useState<string>('');
    const isAuthor = user?._id === comment.author._id

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUpdatedComment(e.target.value);
    }

    function handleLikeComment() {
        likeComment(postId, comment._id).then(likeCount => {
            setIsLiked(!isLiked)
            setLikeCount(likeCount);
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
        <div className={styles["comment"]}>
            <div>
                <Avatar image={comment.author.profilePicture} withLinkTo={comment.author._id} size="small"/>
            </div>
        <div className={styles["comment-info-container"]}>
            <div className={styles["comment-info"]}>
                <Link to={`/${PathConstants.Profile}/${comment.author._id}`}>
                    <p className={styles["comment-username"]}>{comment.author.username}</p>
                </Link>
                {isEditing 
                    ? 
                    (
                        <form className={styles["comment-edit-form"]} onSubmit={handleEditComment}>
                            <textarea className={styles["comment-edit-field"]} value={updatedComment} onChange={handleChange} placeholder="Write a comment..." />
                        </form>    
                    )       
                    : 
                    (
                        <div className={styles["comment-content"]}>
                            <p>{comment.text}</p>
                            <div className={styles["comment-likes"]}>
                                <span>
                                    {likeCount}
                                </span>
                                <span className={styles["heart"]}>
                                    <FontAwesomeIcon icon={faHeart} />
                                </span>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className={styles["comment-actions-container"]}>
                <Time time={comment.createdAt} />
                <div className={styles["comment-actions"]}>
                    <CommentActionButton type="like" onClickHandler={handleLikeComment} isLiked={isLiked}>Like</CommentActionButton>
                    {isAuthor &&
                        <>
                            {!isEditing &&
                                <CommentActionButton type="delete" onClickHandler={handleDeleteComment}>Delete</CommentActionButton>
                            }
                            
                            <CommentActionButton type="edit" onClickHandler={handleShowEdit}>{isEditing ? 'Cancel' : 'Edit'}</CommentActionButton>
                            
                            {isEditing &&
                                <CommentActionButton type="submit" onClickHandler={handleEditComment}>Confirm</CommentActionButton>
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    </div>
    );
}
