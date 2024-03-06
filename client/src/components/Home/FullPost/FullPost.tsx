import styles from './FullPost.module.css';
import { useState } from 'react';
import { PostData } from '../../../types/data';
import CommentSection from './CommentSection/CommentSection';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';
import { Link } from 'react-router-dom';
import PathConstants from '../../../routes/PathConstants';
import Carousell from '../../shared/Carousell/Carousell';
import Avatar from '../../UI/Avatar/Avatar';
import Time from '../../UI/Time/Time';
import Modal from '../../UI/Modal/Modal';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faThumbsUp, faTrash, faEraser, faEllipsis } from '@fortawesome/free-solid-svg-icons';


interface FullPostProps {
    post: PostData | undefined;
    updatePost: (post: PostData, text: string) => void;
    deletePost: (post: PostData) => void;
    likePost: (postId: string) => Promise<number>
}

export default function FullPost({ post, updatePost, deletePost, likePost}: FullPostProps) {

    if (!post) {
        return null;
    }

    const { user } = useAuthContext();
    const [isLiked, setIsLiked] = useState(post.likes.userLikes.includes(user!._id));
    
    const [likeCount, setLikeCount] = useState(post.likes.userLikes.length);
    const [commentCount, setCommentCount] = useState(post.commentCount);
    
    const [showComments, setShowComments] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    
    const [updatedText, setUpdatedText] = useState<string>(post.text);
    const ref = useClickOutside(() => setShowDropdown(false));
    const isAuthor = user?._id === post.author._id;

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setUpdatedText(e.target.value);
    }

    function handleShowEdit() {
        setShowEdit(!showEdit);
        setShowDropdown(false);
        setUpdatedText(post!.text);
    }
    
    function handleCancleEdit() {
        setShowEdit(false);
        setUpdatedText(post!.text);
    }

    function handleEditPost(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!updatedText || updatedText === post!.text) {
            setShowEdit(false);
            return;
        }
        updatePost(post!, updatedText)
        setShowEdit(false);
    }

    function handleLikePost() {
        likePost(post!._id).then((likeCount) => {
            setLikeCount(likeCount);
            setIsLiked(!isLiked);
        });
    }

    function handleDeletePost() {
        setShowModal(true);
    }

    return (
        <article className={styles["full-post"]}>
    
            {showModal && <Modal show={showModal} action={deletePost.bind(null, post)} onClose={() => setShowModal(false)}></Modal>}
            <section className={styles['full-post-info-container']}>
                <div className={styles['full-post-header']}>
                    <div className={styles["user-info"]}>
                        <Avatar image={post.author.profilePicture} withLinkTo={post.author._id} />
                        <div className={styles["full-post-info"]}>
                            <Link to={`/${PathConstants.Profile}/${post.author._id}`}>
                                <p className={styles["full-post-username"]}>{post.author.username}</p>
                            </Link>
                            <Time time={post.createdAt} />
                        </div>
                    </div>
                    {isAuthor &&
                        <div ref={ref} className={styles['full-post-dropdown-container']}>
                            <button className={styles['full-post-dropdown-button']} onClick={() => setShowDropdown(!showDropdown)}>
                                <span className={`${styles["ellipsis"]} ${styles["icon"]}`}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </span>
                            </button>
                            {showDropdown && 
                            (   
                                <div className={styles['full-post-dropdown']}>
                                    <button onClick={handleShowEdit} className={styles['full-post-dropdown-item']}>
                                        <span className={`${styles["eraser"]} ${styles["icon"]}`}>
                                            <FontAwesomeIcon icon={faEraser} />
                                        </span>
                                        <span>
                                            Edit
                                        </span>
                                    </button>
                                    <button onClick={handleDeletePost} className={styles['full-post-dropdown-item']}>
                                        <span className={`${styles["trash"]} ${styles["icon"]}`}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </span>
                                        <span>
                                            Delete
                                        </span>
                                    </button>
                                </div>
                            )}
                        </div>
                    }
                </div>
                <div className={styles["full-post-content"]}>
                    {!showEdit ?
                        <p className={`${styles['full-post-text']} preserve-line-breaks`}>
                            {post.text}
                        </p>
                        :
                        <form className={styles["full-post-edit-form"]} onSubmit={handleEditPost}>
                            <textarea className={styles["full-post-edit-field"]} value={updatedText} onChange={handleChange} />
                            <div className={styles["full-post-edit-buttons"]}>
                                <button disabled={!updatedText} className={styles["full-post-edit-btn"]} type="submit">Confirm</button>
                                <button onClick={handleCancleEdit} className={styles["full-post-edit-btn"]} type="button">Cancel</button>
                            </div>
                        </form>
                    }
                    {post.imageUrls.length > 0 &&
                        (post.imageUrls.length === 1
                            ?
                            <img className={styles['full-post-image']} src={post.imageUrls[0]} alt="post image" />
                            :
                            <Carousell images={post.imageUrls}></Carousell>
                        )
                    }
                </div>
    
                <div className={styles["full-post-stats"]}>
                    <p>{likeCount} Likes</p>
                    <p onClick={() => setShowComments(!showComments)} className={styles['comment-count']}>{commentCount} Comments</p>
                </div>
                <hr className="divider" />
                <div className={styles["full-post-buttons"]}>
                    <button onClick={handleLikePost} className={`${styles['like-button']} ${isLiked ? styles['active'] : ''}`}>
                        <span className={`${styles["thumbsup-btn"]} ${styles["icon"]}`}>
                            <FontAwesomeIcon icon={faThumbsUp} />
                        </span>
                        <span>
                            Like
                        </span>
                    </button>
                    <button onClick={() => setShowComments(!showComments)}>
                    <span className={`${styles["comment-btn"]} ${styles["icon"]}`}>
                            <FontAwesomeIcon icon={faComment} />
                        </span>
                        <span>
                            Comment
                        </span>
                    </button>
                </div>
            </section>
            {showComments && <CommentSection postId={post._id} setCommentCount={setCommentCount} />}
        </article>
    );
}