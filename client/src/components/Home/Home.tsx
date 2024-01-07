import { useEffect, useState } from 'react';
import FullPost from './FullPost/FullPost';
import './Home.css';
import PostForm from './PostForm/PostForm';
import * as dataApi from '../../api/data';
import { PostData } from '../../types/data';
import { useAuthContext } from '../../hooks/useAuthContext';

// TODO: Add posts from database here - getAllPosts()'
export default function Home() {
    const [posts, setPosts] = useState<PostData[]>([]);
    const { user } = useAuthContext();

    useEffect(() => {
        dataApi.getPosts().then(setPosts);
    }, []);


    return (
        <>
            <PostForm />
            <section className="posts-container">
                {posts.map(post => <FullPost key={post._id} post={post} user={user}/>)}
            </section>
        </>
    );
}
