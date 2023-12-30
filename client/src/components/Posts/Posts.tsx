import { useSearchParams } from 'react-router-dom';
import Post from './Post/Post';
import './Posts.css';
import { useState } from 'react';
import Overlay from '../shared/Overlay/Overlay';
import FullPost from '../Home/FullPost/FullPost';
import { useAuth } from '../../hooks/useAuth';

export type PostData = {
    _id: string;
    text: string;
    imageUrls: string[];
    likeCount: number;
    commentCount: number;
    _ownerId: string;
    _createdAt: string;
    author: {username: string, avatar: string}

};

const author = {
    username: 'KonImperator',
    avatar: 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745',
};

const post: PostData = {
    _id: '1',
    text: `3a всички фенове на гейминг турнирите, които ще посетят AniFest
   2023 - Коледно Издание - rp. Варна, сме подготвили специални
   коледни, мини турнири на League of Legends c любезната подкрепа
   на Acer ❤️ Повече на нашият сайт ⬇⬇⬇`,
    imageUrls: [
        'https://images.unsplash.com/photo-1581456495146-65a71b2c8e52?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aHVtYW58ZW58MHx8MHx8fDA%3D',
    ],
    likeCount: Math.floor(Math.random() * (10000 - 1) + 1),
    commentCount: Math.floor(Math.random() * (200 - 1) + 1),
    _createdAt: String(Math.floor(Math.random() * (59 - 1) + 1)),
    _ownerId: '1',
    author: author
};
export default function Posts() {
    const posts: PostData[] = [post, post, post];
    const { user } = useAuth();
    console.log(user);

    const [showOverlay, setShowOverlay] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const showLikedPosts = searchParams.get('liked');

  // Assuming you have a function to handle clicking on a post
  const handleShowOverlay = () => {
    setShowOverlay(true);
  };

    // Need to get real posts here

    return (
        <section className="posts-section">
            <button className="show-liked-posts-btn" onClick={() => setSearchParams({ liked: 'true' })} >Liked Posts</button>
            <h1 className="posts-heading">{showLikedPosts ? 'Liked' : 'All'} Posts</h1>
            {posts.map(post => <Post showOverlayOnCLick={handleShowOverlay} post={post}></Post>)}
            {showOverlay && <Overlay isOpen={showOverlay} onClose={() => setShowOverlay(false)}><FullPost /></Overlay>}
        </section>
    );
}
