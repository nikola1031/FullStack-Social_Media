"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeComment = exports.removeComment = exports.editComment = exports.getComments = exports.saveComment = void 0;
const Comment_1 = require("../models/Comment");
const Post_1 = require("../models/Post");
async function adjustCommentCount(postId, count) {
    await Post_1.Post.updateOne({ _id: postId }, { $inc: { commentCount: count } });
}
const saveComment = async (text, _postId, author) => {
    try {
        const newComment = new Comment_1.Comment({ text, _postId, author });
        await Promise.all([newComment.save(), adjustCommentCount(_postId, 1)]);
        await newComment.populate({
            path: 'author',
            select: 'username profilePicture'
        });
        return newComment;
    }
    catch (error) {
        throw error;
    }
};
exports.saveComment = saveComment;
const getComments = async (_postId) => {
    const comments = await Comment_1.Comment.find({ _postId }).populate({
        path: 'author',
        select: 'username profilePicture'
    });
    return comments;
};
exports.getComments = getComments;
const editComment = async (text, commentId) => {
    try {
        const updatedComment = await Comment_1.Comment.findByIdAndUpdate(commentId, { text }, { new: true, runValidators: true })
            .populate({
            path: 'author',
            select: 'username profilePicture'
        });
        return updatedComment;
    }
    catch (error) {
        throw error;
    }
};
exports.editComment = editComment;
const removeComment = async (commentId, postId) => {
    await Promise.all([Comment_1.Comment.deleteOne({ _id: commentId }), adjustCommentCount(postId, -1)]);
};
exports.removeComment = removeComment;
const likeComment = async (commentId, userId) => {
    try {
        const comment = await Comment_1.Comment.findById(commentId);
        if (!comment) {
            throw new Error("Comment not found");
        }
        // pushing to or pulling from array, and adjusting comment count by +1 or -1
        const action = comment.likes.userLikes.includes(userId) ? '$pull' : '$push';
        return await Comment_1.Comment.findByIdAndUpdate(commentId, { [action]: { 'likes.userLikes': userId } }, { new: true, runValidators: true });
    }
    catch (error) {
        throw error;
    }
};
exports.likeComment = likeComment;
//# sourceMappingURL=commentService.js.map