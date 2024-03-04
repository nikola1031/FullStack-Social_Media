import { useFetch } from './useFetch';
import { postsEndpoints } from './ENDPOINTS';

export function useApiPosts() {
    const { get, post, put, del } = useFetch()

    const getPosts: () => Promise<any[]> = async () => get(postsEndpoints.base(), null);
    const uploadPost: (post: any) => Promise<any> = async (post) => post(postsEndpoints.base(), post);
    const updatePost: (postId: string, text: any) => Promise<any> = async (postId, text) => put(postsEndpoints.postById(postId), text);
    const deletePostById: (postId: string) => Promise<any> = async (postId) => del(postsEndpoints.postById(postId), null);
    const getPostsByUser: (userId: string) => Promise<any[]> = async (userId) => get(postsEndpoints.postByUser(userId));
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