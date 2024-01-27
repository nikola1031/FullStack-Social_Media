import { useEffect, useState } from 'react';
import FullPost from './FullPost/FullPost';
import './Home.css';
import PostForm from './PostForm/PostForm';
import * as dataApi from '../../api/data';
import { PostData } from '../../types/data';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Home() {
    const [posts, setPosts] = useState<PostData[]>([]);

    function fetchPosts() {
        dataApi.getPosts().then(setPosts);
    }

    useEffect(() => {
        fetchPosts();
    }, []);


    return (
        <>
            <PostForm fetchPosts={fetchPosts} />
            <section className="posts-container">
                {posts.map(post => <FullPost key={post._id} post={post} />)}
            </section>
        </>
    );
}
