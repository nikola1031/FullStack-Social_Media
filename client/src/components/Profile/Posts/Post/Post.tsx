import styles from './Post.module.css';
import { Post as PostType } from '../../../../types/data';
import { seeMoreOfPost } from '../../../../utils/seeMoreTrimmer';
import { useState } from 'react';
import Modal from '../../../UI/Modal/Modal';

interface PostProps {
    showOverlayOnCLick: (postId: string) => void;
    deletePost: (post: PostType) => void;
    likePost: (postId: string, e: React.MouseEvent<HTMLButtonElement>) => void;
    post: PostType | undefined;
    loggedInUserId: string;
    profileId: string;
}

export default function Post({ showOverlayOnCLick, deletePost, post, loggedInUserId }: PostProps) {
    const [showModal, setShowModal] = useState(false);
    if (!post) {
        throw new Error('Post not found');
    }
    
    return (
        <>
            {showModal && <Modal show={showModal} action={deletePost.bind(null, post)} onClose={() => setShowModal(false)}></Modal>}
            <article className={styles["post-container"]} onClick={() => showOverlayOnCLick(post._id)}>
                <div className={styles["post-wrapper"]}>
                    <img
                        className={styles["post-image"]}
                        src={post.imageUrls[0] || 'https://picsum.photos/200/300'}
                        alt="post image"
                    />
                    <p className="preserve-line-breaks">{seeMoreOfPost(post.text, 120)}</p>
                </div>
                {post.author._id === loggedInUserId ? (
                    <button onClick={(e) => {
                        e.stopPropagation();
                        setShowModal(true)
                    }} className={`${styles["post-btn"]} ${styles["delete-post"]}`}>Delete Post</button>
                ) : null}
            </article>
        </>
    );
}
