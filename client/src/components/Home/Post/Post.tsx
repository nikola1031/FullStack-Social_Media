import { useState } from 'react';
import './Post.css';
import CommentSection from './CommentSection/CommentSection';

export type PostData = {
    text: string;
    imageUrls: string[];
    likeCount: number;
    commentCount: number;
    _ownerId: string;
    _createdAt: string;
};

const user = {
    username: 'KonImperator',
    avatar: 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'
}

const post: PostData = {
    text: `3a всички фенове на гейминг турнирите, които ще посетят AniFest
    2023 - Коледно Издание - rp. Варна, сме подготвили специални
    коледни, мини турнири на League of Legends c любезната подкрепа
    на Acer ❤️ Повече на нашият сайт ⬇⬇⬇`,
    imageUrls: ['https://images.unsplash.com/photo-1581456495146-65a71b2c8e52?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aHVtYW58ZW58MHx8MHx8fDA%3D'],
    likeCount: Math.floor(Math.random() * (10000 - 1) + 1),
    commentCount: Math.floor(Math.random() * (200 - 1) + 1),
    _createdAt: String(Math.floor(Math.random() * (59 - 1) + 1)),
    _ownerId: '1'
}
// TODO: Need to add actual post data here
// TODO: Fix the overlay on click thing

export default function Post(/* {post}: {post: PostData} */) {
    const [showOverlay, setShowOverlay] = useState(false);

    const handleOverlayShow = () => {
        setShowOverlay(!showOverlay);
      };

    return (
        <article className="post">
                {/*   <Overlay isOpen={showOverlay} onClose={handleOverlayShow}>
                      <img src={post.imageUrls[0]} alt="" />
                  </Overlay> */}
            <section className='post-info-container'>
                <div className="user-info">
                    <img
                        className="user-avatar"
                        src={user.avatar}
                        alt="avatar"
                        />
                    <div className="post-info">
                        <p className="post-username">{user.username}</p>
                        <time className="post-time">
                        {post._createdAt} minutes ago
                        </time>
                    </div>
                </div>
                <div className="post-content">
                    <p className='post-text'>
                        {post.text}
                    </p>
                    {post.imageUrls.map((imageUrl) => (
                        <img className='post-image' src={imageUrl} alt="" />
                        ))}
                </div>
                <div className="post-stats">
                    <p>{post.likeCount} Likes</p>
                    <p className='comment-count'>{post.commentCount} Comments</p>
                </div>
                <hr className='divider' />
                <div className="post-buttons">
                    <button className="like-button">Like</button>
                    <button onClick={handleOverlayShow}>Comment</button>
                </div>       
            </section>
            <CommentSection />
        </article>
    );
}
