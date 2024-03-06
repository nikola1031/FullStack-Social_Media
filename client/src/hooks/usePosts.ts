import { useEffect, useRef, useState } from "react";
import { useApiPosts} from '../api/useApiPosts'
import { PostData } from "../types/data";
import { useAuthContext } from "./auth/useAuthContext";
import { timeoutMessage } from "../utils/timeoutMessage";
import { successMessages } from "../Constants";

export function usePosts(userId?: string) {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<null | string>(null);
    const [error, setError] = useState<null | string>(null);
    const timeoutId = useRef();
    const { user } = useAuthContext();
    const postsApi = useApiPosts();

    useEffect(() => {
       fetchPosts();
    }, [])

    async function fetchPosts() {
        setLoading(true);
        setError(null);

        try {
            if (!user) {
                throw new Error('You must be logged in to see posts');
            }
    
            const posts = await (userId ? postsApi.getPostsByUser(userId) : postsApi.getPosts());
            setPosts(posts)
        } catch (error: any) {
            timeoutMessage(setError, error.message, timeoutId);
        } finally {
            setLoading(false);
        }
    }

    async function createPost(post: FormData) {
        setError(null);
        setLoading(true);
        try {
            if (!user) {
                throw new Error('You must be logged in to create a post');
            }
            
            if (!post.get('text')) {
                throw new Error('Text is required');
            }
            
            console.log('posting')
            const newPost = await postsApi.uploadPost(post);
            console.log('Not posting')
            
            setPosts((prevPosts) => ([newPost, ...prevPosts]));
            timeoutMessage(setSuccess, successMessages.postCreated, timeoutId);
        } catch (error: any) {
            timeoutMessage(setError, error.message, timeoutId);
        } finally {
            setLoading(false);
        }

    }

    async function updatePost(post: PostData, text: string) {
        setError(null);
        try {
            if (!user) {
                throw new Error('You must be logged in to update a post');
            }
            
            if (!post) {
                throw new Error('Post not found');
            }
    
            if (user._id !== post.author._id) {
                throw new Error('You are not authorized to update this post');
            }

            const updatedPost = await postsApi.updatePost(post._id, {text})

            setPosts((prevPosts) => {
                const postIndex = prevPosts.findIndex(p => p._id === post._id);
                const newPosts = [...prevPosts];
                newPosts[postIndex] = updatedPost;
                return newPosts;
            })
            timeoutMessage(setSuccess, successMessages.postUpdated, timeoutId)
        } catch (error: any) {
            timeoutMessage(setError, error.message, timeoutId);
        }

    }

    async function deletePost(post: PostData) {
        setError(null);
        try {
            if (!user) {
                throw new Error('You must be logged in to delete a post');
            }
            
            if (!post) {
                throw new Error('Post not found');
            }
            
            if (user._id !== post.author._id) {
                throw new Error('You are not authorized to delete this post');
            }
            await postsApi.deletePostById(post._id);
            setPosts((prevPosts) => prevPosts.filter(p => p._id !== post._id));
            timeoutMessage(setSuccess, successMessages.postDeleted, timeoutId);
        } catch (error: any) {
           timeoutMessage(setError, error.message, timeoutId);
        }
    }

    async function likePost(postId: string) {
        const data = await postsApi.likePost(postId);
        return data.likeCount;
    }

    return { posts, loading, error, success, fetchPosts, createPost, updatePost, deletePost, likePost }
}   