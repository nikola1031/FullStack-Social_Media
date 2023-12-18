import './Post.css';

type PostData = {
    text: string;
    imageUrls: string[];
    likeCount: number;
    commentCount: number;
    _ownerId: string;
    _createdAt: string;
};

export default function Post(/* {post}: {post: PostData} */) {
    return (
        <article className="post">
            <div className="user-info">
                <img
                    className="user-avatar"
                    src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                    alt="avatar"
                />
                <div className="post-info">
                    <p className="post-username">Username: KonImperator</p>
                    <time className="post-date">
                        Posted: {Math.floor(Math.random() * (59 - 1) + 1)}{' '}
                        minutes ago
                    </time>
                </div>
            </div>
            <div className="post-content">
                <p className='post-text'>
                    3a всички фенове на гейминг турнирите, които ще посетят AniFest
                    2023 - Коледно Издание - rp. Варна, сме подготвили специални
                    коледни, мини турнири на League of Legends c любезната подкрепа
                    на Acer ❤️ Повече на нашият сайт ⬇⬇⬇
                </p>
                <img className='post-image' src="https://images.unsplash.com/photo-1581456495146-65a71b2c8e52?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aHVtYW58ZW58MHx8MHx8fDA%3D" alt="" />
            </div>
            <div className="post-stats">
                <p>{Math.floor(Math.random() * (10000 - 1) + 1)} Likes</p>
                <p className='comment-count'>{Math.floor(Math.random() * (200 - 1) + 1)} Comments</p>
            </div>
            <hr className='divider' />
            <div className="post-buttons">
                <button className="like-button">Like</button>
                <button className="comment-button">Comment</button>
            </div>
        </article>
    );
}
