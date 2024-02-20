import { useEffect, useState } from "react";
import * as dataApi from '../api/data'
import { PostData } from "../types/data";
import { useAuthContext } from "./useAuthContext";

export function usePosts() {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const { user } = useAuthContext();

    useEffect(() => {
       fetchPosts();
    }, [])

    async function fetchPosts() {
        setIsLoading(true);
        setError(null);

        try {
            if (!user) {
                throw new Error('You must be logged in to see posts');
            }
    
            const posts = await dataApi.getPosts()
            setPosts(posts)
        } catch (error: any) {
            setError(error.message)
        } finally {
            setIsLoading(false);
        }
    }

    async function createPost(post: FormData) {
        setError(null);

        try {
            if (!user) {
                throw new Error('You must be logged in to create a post');
            }
    
            if (!post.get('text')) {
                throw new Error('Text is required');
            }
    
            const newPost = await dataApi.uploadPost(post)
            console.log(newPost)
            setPosts((prevPosts) => ([...prevPosts, newPost]))
        } catch (error: any) {
            setError(error.message)
        } finally {
            setIsLoading(false);
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

            const updatedPost = await dataApi.updatePost(post._id, {text})
            console.log(updatedPost)
            setPosts((prevPosts) => {
                const postIndex = prevPosts.findIndex(p => p._id === post._id);
                const newPosts = [...prevPosts];
                newPosts[postIndex] = updatedPost;
                return newPosts;
            })
            
        } catch (error: any) {
            setError(error.message)
        } finally {
            setIsLoading(false);
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
                throw new Error('You are not authorized to update this post');
            }
            await dataApi.deletePostById(post._id)
            setPosts((prevPosts) => prevPosts.filter(p => p._id !== post._id))
            
        } catch (error: any) {
            setError(error.message)
        } finally {
            setIsLoading(false);
        }
    }

    return { posts, isLoading, error, fetchPosts, createPost, updatePost, deletePost }
}   