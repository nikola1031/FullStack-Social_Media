import { useState } from 'react';
import { PostData } from '../../../types/data';
import { formatRelativeTime } from '../../../utils/timeAgoFormatter';
import CommentSection from './CommentSection/CommentSection';
import * as dataApi from '../../../api/data';
import './FullPost.css';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { Link } from 'react-router-dom';

interface FullPostProps {
    post: PostData;
}

export default function FullPost({ post }: FullPostProps) {

    const { user } = useAuthContext();
    const [showComments, setShowComments] = useState<boolean>(false);
    const [isLiked, setIsLiked] = useState<boolean>(post.likes.userLikes.includes(user!._id));
    const [likeCount, setLikeCount] = useState<number>(post.likes.userLikes.length);
    const [commentCount, setCommentCount] = useState<number>(post.commentCount);
    function showCommentsHandler() {
        setShowComments(!showComments);
    }

    function handleLikePost() {
        dataApi.likePost(post._id).then((data) => {
            setIsLiked(!isLiked);
            setLikeCount(data.likeCount);
        });
    }

    return (
        
        <article className="full-post">
            <section className='full-post-info-container'>
                <div className="user-info">
                    <Link to={`/profile/${post.author._id}`}>
                    <img
                        className="user-avatar"
                        src={post.author.profilePicture}
                        alt="avatar"
                        />
                    </Link>
                    <div className="full-post-info">
                    <Link to={`/profile/${post.author._id}`}>
                        <p className="full-post-username">{post.author.username}</p>
                    </Link>
                        <time className="full-post-time">
                            {formatRelativeTime(post.createdAt)}
                        </time>
                    </div>
                </div>
                <div className="full-post-content">
                    <p className='full-post-text'>
                        {post.text}
                    </p>
                    {post.imageUrls.map((imageUrl) => (
                        <img className='full-post-image' key={imageUrl} src={imageUrl} alt="post image" />
                        ))}
                </div>
                <div className="full-post-stats">
                    <p>{likeCount} Likes</p>
                    <p onClick={showCommentsHandler} className='comment-count'>{commentCount} Comments</p>
                </div>
                <hr className='divider' />
                <div className="full-post-buttons">
                    <button onClick={handleLikePost} className={`like-button${isLiked ? ' active' : ''}`}>Like</button>
                    <button onClick={showCommentsHandler}>Comments</button>
                </div>       
            </section>
            {showComments && <CommentSection postId={post._id} setCommentCount={setCommentCount}/>}
        </article>
    );
}
