import { useEffect, useState } from 'react';
import FullPost from './FullPost/FullPost';
import './Home.css';
import PostForm from './PostForm/PostForm';
import * as dataApi from '../../api/data';
import { PostData } from '../../types/data';
import { useTitle } from '../../hooks/useTitle';

export default function Home() {
    useTitle('Home');
    const [posts, setPosts] = useState<PostData[]>([]);

    function fetchPosts() {
        dataApi.getPosts().then(setPosts);
    }

    useEffect(() => {
        fetchPosts();
    }, []);


    return (
        <div className="home-wrapper">
            <PostForm fetchPosts={fetchPosts} />
            <section className="posts-container">
                {posts.map(post => <FullPost fetchPosts={fetchPosts} key={post._id} post={post} />)}
            </section>
        </div>
    );
}
