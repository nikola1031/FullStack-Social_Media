import { commentNotFoundMessage, deleteCommentMessage, fetchCommentsMessage, postCommentMessage, saveCommentMessage } from "../Constants";
import { Comment } from "../models/Comment";
import { Post } from "../models/Post";
import { checkObjectIdValidity } from "./helpers/serviceHelpers";

async function adjustCommentCount(postId: string, count: Number) { 
    await Post.updateOne({_id: postId}, {$inc: {commentCount: count}});
}

export const saveComment = async (text: string, _postId: string, author: string) => {
    try {
        checkObjectIdValidity(_postId, author);
        const newComment = new Comment({text, _postId, author});

        const [newCommentResult, adjustCountResult] = 
        await Promise.allSettled([newComment.save(), adjustCommentCount(_postId, 1)]);

        if (newCommentResult.status === 'rejected') {
            if (adjustCountResult.status === 'fulfilled') {
                await adjustCommentCount(_postId, -1);
            }
            throw new Error(postCommentMessage);
        }

        if (adjustCountResult.status === 'rejected') {
            await Comment.deleteOne({_id: newComment._id});
            throw new Error(postCommentMessage);
        }

        await newComment.populate({
            path: 'author',
            select: 'username profilePicture'
        })
        return newComment;
    } catch (error) {
        throw error;
    }
}

export const getComments = async (_postId: string) => {
    checkObjectIdValidity(_postId);
    try {
        const comments = await Comment.find({_postId}).populate({
            path: 'author',
            select: 'username profilePicture'
        });
    
        return comments;
    } catch (error) {
        console.error(error);
        throw new Error(fetchCommentsMessage);        
    }
}

export const editComment = async (text: string, commentId: string) => {
    checkObjectIdValidity(commentId);
    try {
        const updatedComment = await Comment.findByIdAndUpdate(commentId, {text}, {new: true, runValidators: true})
        .populate({
            path: 'author',
            select: 'username profilePicture'
        });
        return updatedComment;
    } catch (error) {
        console.error(error);
        throw new Error(saveCommentMessage);
    }
}

export const removeComment = async (commentId: string, postId: string) => {
    try {
        checkObjectIdValidity(commentId, postId);
        const [deletionResult, adjustCountResult] = 
        await Promise.allSettled([Comment.deleteOne({_id: commentId}), adjustCommentCount(postId, -1)]);
        if (deletionResult.status === 'rejected') {
            if (adjustCountResult.status === 'fulfilled') {
                await adjustCommentCount(postId, 1);
            }
            throw new Error(deleteCommentMessage)
        }

        if (adjustCountResult.status === 'rejected') {
            throw new Error(adjustCountResult.reason);
        }
    } catch (error) {
        throw error;
    }
}

export const likeComment = async (commentId: string, userId: string) => {
    try {
        checkObjectIdValidity(commentId, userId);
        const comment = await Comment.findById(commentId);
        if (!comment) {
            throw new Error(commentNotFoundMessage);
        }
        
        const action = comment.likes.userLikes.includes(userId) ? '$pull' : '$push';

        return await Comment.findByIdAndUpdate(
            commentId,
            { [action]: { 'likes.userLikes': userId } },
            { new: true, runValidators: true }
        );
        
    } catch (error) {
        throw error;
    }
};