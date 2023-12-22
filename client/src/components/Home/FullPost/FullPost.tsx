import './FullPost.css';
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

export default function FullPost(/* {post}: {post: PostData} */) {

    return (
        <article className="full-post">
            <section className='full-post-info-container'>
                <div className="user-info">
                    <img
                        className="user-avatar"
                        src={user.avatar}
                        alt="avatar"
                        />
                    <div className="full-post-info">
                        <p className="full-post-username">{user.username}</p>
                        <time className="full-post-time">
                        {post._createdAt} minutes ago
                        </time>
                    </div>
                </div>
                <div className="full-post-content">
                    <p className='full-post-text'>
                        {post.text}
                    </p>
                    {post.imageUrls.map((imageUrl) => (
                        <img className='full-post-image' src={imageUrl} alt="" />
                        ))}
                </div>
                <div className="full-post-stats">
                    <p>{post.likeCount} Likes</p>
                    <p className='comment-count'>{post.commentCount} Comments</p>
                </div>
                <hr className='divider' />
                <div className="full-post-buttons">
                    <button className="like-button">Like</button>
                    <button>Comment</button>
                </div>       
            </section>
            <CommentSection />
        </article>
    );
}
