import './FullPost.css';
import { useState } from 'react';
import { PostData } from '../../../types/data';
import { formatRelativeTime } from '../../../utils/timeAgoFormatter';
import CommentSection from './CommentSection/CommentSection';
import * as dataApi from '../../../api/data';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import PathConstants from '../../../routes/PathConstants';
import Carousell from '../../shared/Carousell/Carousell';
import Avatar from '../../UI/Avatar/Avatar';
import Time from '../../UI/Time/Time';

interface FullPostProps {
    post: PostData | undefined;
    fetchPosts: () => void;
}

export default function FullPost({ post, fetchPosts }: FullPostProps) {

    if (!post) {
        throw new Error('Post not found');
    }

    const { user } = useAuthContext();
    const [isLiked, setIsLiked] = useState<boolean>(post.likes.userLikes.includes(user!._id));
    
    const [likeCount, setLikeCount] = useState<number>(post.likes.userLikes.length);
    const [commentCount, setCommentCount] = useState<number>(post.commentCount);
    
    const [showComments, setShowComments] = useState<boolean>(false);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    
    const [updatedText, setUpdatedText] = useState<string>(post.text);

    const isAuthor = user?._id === post.author._id;

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setUpdatedText(e.target.value);
    }

    function handleShowEdit() {
        setShowEdit(!showEdit);
        setShowDropdown(false);
        setUpdatedText(post!.text);
    }
    
    function handleCancleEdit() {
        setShowEdit(false);
        setUpdatedText(post!.text);
    }

    function handleEditPost(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!updatedText || updatedText === post!.text) {
            setShowEdit(false);
            return;
        }

        dataApi.updatePost(post!._id, {text: updatedText}).then(() => {
            fetchPosts();
            setShowEdit(false);
        });
    }

    function handleLikePost() {
        dataApi.likePost(post!._id).then((data) => {
            setIsLiked(!isLiked);
            setLikeCount(data.likeCount);
        });
    }

    function handleDeletePost() {
        dataApi.deletePostById(post!._id).then(() => {
            fetchPosts();
        });
    }

    return (
        
        <article className="full-post">
            <section className='full-post-info-container'>
                <div className='full-post-header'>
                    <div className="user-info">
                        <Avatar image={post.author.profilePicture} withLinkTo={post.author._id} />
                        <div className="full-post-info">
                        <Link to={`/${PathConstants.Profile}/${post.author._id}`}>
                            <p className="full-post-username">{post.author.username}</p>
                        </Link>
                            <Time time={post.createdAt} />
                        </div>
                    </div>
                    { isAuthor &&
                            <div className='full-post-dropdown-container'>
                                <button className='full-post-dropdown-button' onClick={() => setShowDropdown(!showDropdown)} >
                                    <i className="fa-solid fa-ellipsis" />
                                </button>
                                {showDropdown && (
                                    <div className='full-post-dropdown'>
                                        <button onClick={handleShowEdit} className='full-post-dropdown-item'><i className="fa-solid fa-eraser" />Edit</button>
                                        <button onClick={handleDeletePost} className='full-post-dropdown-item'><i className="fa-solid fa-trash" />Delete</button>
                                    </div>
                                )}
                            </div>
                    }
                </div>
                <div className="full-post-content">
                    { !showEdit ?
                        <p className='full-post-text'>
                            {post.text}
                        </p>
                        : 
                        <form className="full-post-edit-form" onSubmit={handleEditPost}>
                            <textarea className="full-post-edit-field" value={updatedText} onChange={handleChange} />
                            <div className="full-post-edit-buttons">
                                <button disabled={!updatedText} className="full-post-edit-btn" type="submit">Confirm</button>
                                <button onClick={handleCancleEdit} className="full-post-edit-btn" type="button">Cancel</button>
                            </div>
                        </form>
                    }
                    {
                        post.imageUrls.length > 0 &&
                        ( post.imageUrls.length === 1 
                        ?
                            <img className='full-post-image' src={post.imageUrls[0]} alt="post image" />
                        :   
                            <Carousell images={post.imageUrls}></Carousell>
                        )
                    }
                </div>
                
                <div className="full-post-stats">
                    <p>{likeCount} Likes</p>
                    <p onClick={() => setShowComments(!showComments)} className='comment-count'>{commentCount} Comments</p>
                </div>
                <hr className='divider' />
                <div className="full-post-buttons">
                    <button onClick={handleLikePost} className={`like-button${isLiked ? ' active' : ''}`}>Like</button>
                    <button onClick={() => setShowComments(!showComments)}>Comments</button>
                </div>       
            </section>
            {showComments && <CommentSection postId={post._id} setCommentCount={setCommentCount}/>}
        </article>
    );
}
