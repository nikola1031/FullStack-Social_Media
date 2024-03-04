import { useFetch } from './useFetch';
import { commentsEndpoints } from './ENDPOINTS';

export function useApiComments() {
    const { get, post, put, del } = useFetch()

    const getComments: (postId: string) => Promise<any[]> = async (postId) => get(commentsEndpoints.base(postId), null);
    const updateComment: (postId: string, comment: any, commentId: string) => Promise<any> = async (postId, comment, commentId) => put(commentsEndpoints.commentById(postId, commentId), comment);
    const postComment: (postId: string, comment: any) => Promise<any> = async (postId, comment) => post(commentsEndpoints.base(postId), comment);
    const deleteCommentById: (postId: string, commentId: string) => Promise<any> = async (postId, commentId) => del(commentsEndpoints.commentById(postId, commentId), null);
    const likeComment: (postId: string, commentId: string) => Promise<{likeCount: number}> = async (postId, commentId) => post(commentsEndpoints.likeComment(postId, commentId), null);
    
    return {
        getComments,
        updateComment,
        postComment,
        deleteCommentById,
        likeComment
    };
}