import styles from './Posts.module.css';
import { useParams } from 'react-router-dom';
import Post from './Post/Post';
import { useState } from 'react';
import Overlay from '../../shared/Overlay/Overlay';
import FullPost from '../../Home/FullPost/FullPost';
import { PostData } from '../../../types/data';
import { useAuthContext } from '../../../hooks/auth/useAuthContext';
import { useTitle } from '../../../hooks/useTitle';
import { usePosts } from '../../../hooks/usePosts';
import Toast from '../../UI/Toast/Toast';

function findPost(postId: string, posts: PostData[]) {
    return posts.find(post => post._id === postId);
}

export default function Posts() {

    useTitle('Posts');
    const { user: loggedInUser } = useAuthContext();
    const [showOverlay, setShowOverlay] = useState(false);
    const [overlayedPost, setOverlayedPost] = useState<string | null>();
    const { id } = useParams();

    const { posts, error, success, updatePost, deletePost, likePost } = usePosts(id);


    const handleShowOverlay = (postId: string) => {
        setOverlayedPost(postId);
        setShowOverlay(true);
    };

    const handleHideOverlay = () => {
        setOverlayedPost(null);
        setShowOverlay(false);
    }

    const handleLikePost = (postId: string, e: React.MouseEvent<HTMLButtonElement>) => {
        likePost(postId);
        e.stopPropagation();
    }

    return (
        <>
            {success && <Toast message={success} type='success' />}
            {error && <Toast message={error} type='error' />}
            {posts.length > 0 ?
                <section className={styles["posts-section"]}>
                    {posts.map(post => <Post key={post._id} profileId={id!} likePost={handleLikePost} deletePost={deletePost} showOverlayOnCLick={handleShowOverlay} loggedInUserId={loggedInUser!._id} post={post}></Post>)}
                    {showOverlay && <Overlay isOpen={showOverlay} onClose={handleHideOverlay}><FullPost updatePost={updatePost} deletePost={deletePost} likePost={likePost} post={findPost(overlayedPost!, posts )} /></Overlay>}
                </section>
                :
                <section className={styles["posts-section"]}>
                    <h2>No posts yet</h2>
                </section>
            }
        </>
    );
}
