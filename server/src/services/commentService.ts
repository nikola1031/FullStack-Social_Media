import { Comment } from "../models/Comment"
import { Post } from "../models/Post"

async function adjustCommentCount(postId: string, count: Number) {
    await Post.updateOne({_id: postId}, {$inc: {commentCount: count}});
}

export const saveComment = async (text: string, _postId: string, author: string) => {
    try {
        const newComment = new Comment({text, _postId, author});
        await Promise.all([newComment.save(), adjustCommentCount(_postId, 1)])
        return newComment;
    } catch (error) {
        throw error;
    }
}

export const getComments = async (_postId: string) => {
    const comments = await Comment.find({_postId}).populate({
        path: 'author',
        select: 'username profilePicture'
    });

    return comments;
}

export const editComment = async (text: string, commentId: string) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(commentId, {text}, {new: true, runValidators: true});
        return updatedComment;
    } catch (error) {
        throw error;
    }
}

export const removeComment = async (commentId: string) => {
    await Comment.deleteOne({_id: commentId});
}

export const likeComment = async (commentId: string, userId: string) => {
    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            throw new Error("Comment not found");
        }
        // pushing or pulling from array, and adjusting comment count by +1 or -1
        const adjustCount = comment.likes.userLikes.includes(userId) ? -1 : 1;
        const action = comment.likes.userLikes.includes(userId) ? '$pull' : '$push';

        return await Comment.findByIdAndUpdate(
            commentId,
            { [action]: { 'likes.userLikes': userId }, $inc: { 'likes.likeCount': adjustCount } },
            { new: true, runValidators: true }
        );
        
    } catch (error) {
        throw error;
    }
};