import { useFetch } from './useFetch';
import { commentsEndpoints } from './ENDPOINTS';
import { Comment, ServerMessage } from '../types/data';

export function useApiComments() {
    const { get, post, put, del } = useFetch()

    const getComments: (postId: string) => Promise<Comment[]> = async (postId) => get(commentsEndpoints.base(postId), null);
    const updateComment: (postId: string, text: { text: string }, commentId: string) => Promise<Comment> = async (postId, text: {text: string}, commentId) => put(commentsEndpoints.commentById(postId, commentId), text);
    const postComment: (postId: string, text: { text: string }) => Promise<Comment> = async (postId, text) => post(commentsEndpoints.base(postId), text);
    const deleteCommentById: (postId: string, commentId: string) => Promise<ServerMessage> = async (postId, commentId) => del(commentsEndpoints.commentById(postId, commentId), null);
    const likeComment: (postId: string, commentId: string) => Promise<{likeCount: number}> = async (postId, commentId) => post(commentsEndpoints.likeComment(postId, commentId), null);
    
    return {
        getComments,
        updateComment,
        postComment,
        deleteCommentById,
        likeComment
    };
}