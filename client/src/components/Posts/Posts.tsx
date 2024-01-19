import { useParams, useSearchParams } from 'react-router-dom';
import Post from './Post/Post';
import './Posts.css';
import { useEffect, useState } from 'react';
import Overlay from '../shared/Overlay/Overlay';
import FullPost from '../Home/FullPost/FullPost';
import { PostData } from '../../types/data';
import * as dataApi from '../../api/data';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Posts() {
    const { user: loggedInUser } = useAuthContext();
    const [posts, setPosts] = useState<PostData[]>([]);
    const [showOverlay, setShowOverlay] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [overlayedPost, setOverlayedPost] = useState<PostData | null>(null);
    const { id } = useParams();
    const showLikedPosts = searchParams.get('liked');

    function fetchPosts() {
        if (showLikedPosts === 'true') {
            dataApi.getLikedPostsByUser(id!).then(data => setPosts(data));
        } else {
            dataApi.getPostsByUser(id!).then(data => setPosts(data))
        }
    }


    useEffect(() => {
        fetchPosts();
    }, [showLikedPosts])


    const handleShowOverlay = (post: PostData) => {
        setOverlayedPost(post);
        setShowOverlay(true);
    };

    const handleHideOverlay = () => {
        setOverlayedPost(null);
        setShowOverlay(false);
    }

    const handleShowLikedPosts = () => {
        showLikedPosts ? setSearchParams({}) : setSearchParams({ liked: 'true' }) 
    }

    const handleLikePost = (postId: string, e: React.MouseEvent<HTMLButtonElement>) => {
        dataApi.likePost(postId).then(fetchPosts);
        e.stopPropagation();
    }

    const handleDeletePost = (postId: string, e: React.MouseEvent<HTMLButtonElement>) => {
        dataApi.deletePostById(postId).then(fetchPosts);
        e.stopPropagation();
    }

    return (
        <section className="posts-section">
            <button className="show-liked-posts-btn" onClick={handleShowLikedPosts}>{showLikedPosts ? 'Liked' : 'All'} Posts</button>
            {posts.map(post => <Post key={post._id} likePost={handleLikePost} deletePost={handleDeletePost} showOverlayOnCLick={handleShowOverlay} loggedInUserId={loggedInUser!._id} post={post}></Post>)}
            {showOverlay && <Overlay isOpen={showOverlay} onClose={handleHideOverlay}><FullPost post={overlayedPost!} /></Overlay>}
        </section>
    );
}
