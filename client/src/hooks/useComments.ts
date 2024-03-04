import { useEffect, useRef, useState } from "react";
import { CommentData } from "../types/data";
import { useApiComments } from '../api/useApiComments';
import { timeoutMessage } from "../utils/timeoutMessage";

export function useComments(postId: string, setCommentCount: React.Dispatch<React.SetStateAction<number>>) {
    const [comments, setComments] = useState<CommentData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const timeoutId = useRef();
    const commentsApi = useApiComments();

    useEffect(() => {
       fetchComments();
    }, [postId])

    function fetchComments() {
        setLoading(true);
        setError(null);

        commentsApi.getComments(postId)
        .then(comments => {
            setCommentCount(comments.length)
            return setComments(comments)
        })
        .catch((error: {message: string}) => timeoutMessage(setError, error.message, timeoutId))
        .finally(() => setLoading(false));
    }

    function createComment(text: string) {
        setError(null);

        commentsApi.postComment(postId, { text })
        .then((comment) => setComments((prevComments) => ([...prevComments, comment])))
        .catch((error: {message: string}) => setError(error.message));
        setCommentCount(prevCount => prevCount + 1);
    }

    function updateComment(commentId: string, updatedComment: string) {
        setError(null);

        commentsApi.updateComment(postId, {text: updatedComment}, commentId)
        .then(comment => setComments((prevComments) => {
            const commentIndex = prevComments.findIndex(c => c._id === commentId);
            const newComments = [...prevComments];
            newComments[commentIndex] = comment;
            return newComments;
        }))
        .catch((error: {message: string}) => setError(error.message));
    }

    function deleteComment(commentId: string) {
        setError(null);

        commentsApi.deleteCommentById(postId, commentId).then(() => {
            setComments((prevComments) => prevComments.filter(c => c._id !== commentId));
            setCommentCount(prevCount => prevCount - 1);
        }).catch((error: {message: string}) => setError(error.message));
    }

    async function likeComment(postId: string, commentId: string) {
        const data = await commentsApi.likeComment(postId, commentId);
        return data.likeCount;
    }

    return { comments, loading, error, updateComment, deleteComment, createComment, fetchComments, likeComment }
}