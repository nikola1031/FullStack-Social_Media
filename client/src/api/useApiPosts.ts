import { useFetch } from './useFetch';
import { postsEndpoints } from './ENDPOINTS';
import { Post, ServerMessage } from '../types/data';

export function useApiPosts() {
    const { get, post, put, del } = useFetch()

    const getPosts: () => Promise<Post[]> = async () => get(postsEndpoints.base(), null);
    const uploadPost: (newPost: FormData) => Promise<Post> = async (newPost) => post(postsEndpoints.base(), newPost);
    const updatePost: (postId: string, text: {text: string}) => Promise<Post> = async (postId, text) => put(postsEndpoints.postById(postId), text);
    const deletePostById: (postId: string) => Promise<ServerMessage> = async (postId) => del(postsEndpoints.postById(postId), null);
    const getPostsByUser: (userId: string) => Promise<Post[]> = async (userId) => get(postsEndpoints.postByUser(userId));
    const likePost: (postId: string) => Promise<{likeCount: number}> = async (postId) => post(postsEndpoints.likePost(postId), null);

    return {
        getPosts,
        uploadPost,
        updatePost,
        deletePostById,
        getPostsByUser,
        likePost,
    };
}