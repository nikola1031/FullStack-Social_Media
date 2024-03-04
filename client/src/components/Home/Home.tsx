import { useEffect } from 'react';
import FullPost from './FullPost/FullPost';
import './Home.css';
import PostForm from './PostForm/PostForm';
import { useTitle } from '../../hooks/useTitle';
import Toast from '../UI/Toast/Toast';
import { usePosts } from '../../hooks/usePosts';
import Loader from '../UI/Loader/Loader';

export default function Home() {
    useTitle('Home');
    const { posts, loading, error, success, createPost, updatePost, deletePost, likePost } = usePosts();

    return (
        <>
            {success && <Toast message={success} type='success' />}
            {error && <Toast message={error} type='error' />}
            {loading && posts.length === 0
                ? 
                    <Loader size='large' />
                :
                    <div className="home-wrapper">
                        <PostForm loading={loading} createPost={createPost} />
                        <section className="posts-container">
                            {posts.map(post => <FullPost updatePost={updatePost} deletePost={deletePost} likePost={likePost} key={post._id} post={post} />)}
                        </section>
                    </div>
            }
        </>
    );
}
