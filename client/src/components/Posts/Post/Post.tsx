import { Link } from 'react-router-dom';
import { PostData } from '../../../types/data';
import { seeMoreOfPost } from '../../../utils/seeMoreTrimmer';
import './Post.css';
import PathConstants from '../../../routes/PathConstants';

interface PostProps {
    showOverlayOnCLick: (post: PostData) => void;
    deletePost: (postId: string, e: React.MouseEvent<HTMLButtonElement>) => void;
    likePost: (postId: string, e: React.MouseEvent<HTMLButtonElement>) => void;
    post: PostData;
    loggedInUserId: string;
    profileId: string;
}

export default function Post({ showOverlayOnCLick, deletePost, likePost, post, profileId, loggedInUserId }: PostProps) {
    return (
        <article className="post-container" onClick={() => showOverlayOnCLick(post)}>
            <div className="post-wrapper">
                <img
                    className="post-image"
                    src={post.imageUrls[0] || 'https://picsum.photos/200/300'}
                    alt="random"
                />
                <p className="post-content">{seeMoreOfPost(post.text, 120)}</p>
            </div>
            <p className="post-owner">
                Post by{' '}
                <Link to={`/${PathConstants.Profile}/${post.author._id}`} className="post-owner-link">
                    <img
                        className="user-avatar"
                        src={post.author.profilePicture || 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'}
                        alt="avatar"
                    />
                </Link>
                <Link to={`/${PathConstants.Profile}/${post.author._id}`} className="post-owner-link">
                    <span className="post-owner-username">
                        {post.author.username}
                    </span>
                </Link>
            </p>
            {post.author._id === loggedInUserId ? (
                <button onClick={(e) => deletePost(post._id, e)} className="post-btn delete-post">Delete Post</button>
            ) : null}
            {(profileId === loggedInUserId && post.likes.userLikes.includes(loggedInUserId)) &&
                <button onClick={(e) => likePost(post._id, e)} className="post-btn unlike-post">Unlike Post</button>
            }
        </article>
    );
}
