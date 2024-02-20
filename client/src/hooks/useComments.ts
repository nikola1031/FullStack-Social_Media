import { useEffect, useState } from "react";
import { CommentData } from "../types/data";
import * as dataApi from '../api/data';

export function useComments(postId: string, setCommentCount: React.Dispatch<React.SetStateAction<number>>) {
    const [comments, setComments] = useState<CommentData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
       fetchComments();
    }, [postId])

    function fetchComments() {
        setIsLoading(true);
        setError(null);

        dataApi.getComments(postId)
        .then(comments => {
            setCommentCount(comments.length)
            return setComments(comments)
        })
        .catch((error: {message: string}) => setError(error.message))
        .finally(() => setIsLoading(false));
    }

    function createComment(text: string) {
        setError(null);

        dataApi.postComment(postId, { text })
        .then((comment) => setComments((prevComments) => ([...prevComments, comment])))
        .catch((error: {message: string}) => setError(error.message));
        setCommentCount(prevCount => prevCount + 1);
    }

    function updateComment(commentId: string, updatedComment: string) {
        setError(null);

        dataApi.updateComment(postId, {text: updatedComment}, commentId)
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

        dataApi.deleteCommentById(postId, commentId).then(() => {
            setComments((prevComments) => prevComments.filter(c => c._id !== commentId));
            setCommentCount(prevCount => prevCount - 1);
        }).catch((error: {message: string}) => setError(error.message));
    }

    return { comments, isLoading, error, updateComment, deleteComment, createComment, fetchComments }
}