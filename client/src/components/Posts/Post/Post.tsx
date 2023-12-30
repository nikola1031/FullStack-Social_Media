import './Post.css';

interface PostProps {
    showOverlayOnCLick: () => void;
}

export default function Post({ showOverlayOnCLick, post }: any) {

    return (
        <article className="post-container" onClick={showOverlayOnCLick}>
            <div className="post-wrapper">
                <img
                    className="post-image"
                    src={post.imageUrls[0]}
                    alt="random"
                />
                <p className="post-content">{post.text}</p>
            </div>
            <p className="post-owner">
                Post by{' '}
                <img
                    className="user-avatar"
                    src={post.author.avatar}
                    alt="avatar"
                />
                <span className="post-owner-username">
                    {post.author.username}
                </span>
            </p>
            <button className="post-btn unlike-post">Remove from Liked</button>
            {post._ownerId === '1' ? (
                <button className="post-btn delete-post">Delete Post</button>
            ) : null}
        </article>
    );
}
