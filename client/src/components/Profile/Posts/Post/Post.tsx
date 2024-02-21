import { Link } from 'react-router-dom';
import { PostData } from '../../../../types/data';
import { seeMoreOfPost } from '../../../../utils/seeMoreTrimmer';
import './Post.css';
import PathConstants from '../../../../routes/PathConstants';
import Avatar from '../../../UI/Avatar/Avatar';

interface PostProps {
    showOverlayOnCLick: (postId: string) => void;
    deletePost: (postId: string, e: React.MouseEvent<HTMLButtonElement>) => void;
    likePost: (postId: string, e: React.MouseEvent<HTMLButtonElement>) => void;
    post: PostData | undefined;
    loggedInUserId: string;
    profileId: string;
}

export default function Post({ showOverlayOnCLick, deletePost, likePost, post, profileId, loggedInUserId }: PostProps) {

    if (!post) {
        throw new Error('Post not found');
    }
    
    return (
        <article className="post-container" onClick={() => showOverlayOnCLick(post._id)}>
            <div className="post-wrapper">
                <img
                    className="post-image"
                    src={post.imageUrls[0] || 'https://picsum.photos/200/300'}
                    alt="post image"
                />
                <p className="post-content">{seeMoreOfPost(post.text, 120)}</p>
            </div>
            <p className="post-owner">
                Post by{' '}
                <Avatar image={post.author.profilePicture} withLinkTo={post.author._id} />
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
