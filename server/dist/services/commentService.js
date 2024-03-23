"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeComment = exports.removeComment = exports.editComment = exports.getComments = exports.saveComment = void 0;
const Constants_1 = require("../Constants");
const Comment_1 = require("../models/Comment");
const Post_1 = require("../models/Post");
const serviceHelpers_1 = require("./helpers/serviceHelpers");
async function adjustCommentCount(postId, count) {
    await Post_1.Post.updateOne({ _id: postId }, { $inc: { commentCount: count } });
}
const saveComment = async (text, _postId, author) => {
    try {
        (0, serviceHelpers_1.checkObjectIdValidity)(_postId, author);
        const newComment = new Comment_1.Comment({ text, _postId, author });
        const [newCommentResult, adjustCountResult] = await Promise.allSettled([newComment.save(), adjustCommentCount(_postId, 1)]);
        if (newCommentResult.status === 'rejected') {
            if (adjustCountResult.status === 'fulfilled') {
                await adjustCommentCount(_postId, -1);
            }
            throw new Error(Constants_1.postCommentMessage);
        }
        if (adjustCountResult.status === 'rejected') {
            await Comment_1.Comment.deleteOne({ _id: newComment._id });
            throw new Error(Constants_1.postCommentMessage);
        }
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
    (0, serviceHelpers_1.checkObjectIdValidity)(_postId);
    try {
        const comments = await Comment_1.Comment.find({ _postId }).populate({
            path: 'author',
            select: 'username profilePicture'
        });
        return comments;
    }
    catch (error) {
        console.error(error);
        throw new Error(Constants_1.fetchCommentsMessage);
    }
};
exports.getComments = getComments;
const editComment = async (text, commentId) => {
    (0, serviceHelpers_1.checkObjectIdValidity)(commentId);
    try {
        const updatedComment = await Comment_1.Comment.findByIdAndUpdate(commentId, { text }, { new: true, runValidators: true })
            .populate({
            path: 'author',
            select: 'username profilePicture'
        });
        return updatedComment;
    }
    catch (error) {
        console.error(error);
        throw new Error(Constants_1.saveCommentMessage);
    }
};
exports.editComment = editComment;
const removeComment = async (commentId, postId) => {
    try {
        (0, serviceHelpers_1.checkObjectIdValidity)(commentId, postId);
        const [deletionResult, adjustCountResult] = await Promise.allSettled([Comment_1.Comment.deleteOne({ _id: commentId }), adjustCommentCount(postId, -1)]);
        if (deletionResult.status === 'rejected') {
            if (adjustCountResult.status === 'fulfilled') {
                await adjustCommentCount(postId, 1);
            }
            throw new Error(Constants_1.deleteCommentMessage);
        }
        if (adjustCountResult.status === 'rejected') {
            throw new Error(adjustCountResult.reason);
        }
    }
    catch (error) {
        throw error;
    }
};
exports.removeComment = removeComment;
const likeComment = async (commentId, userId) => {
    try {
        (0, serviceHelpers_1.checkObjectIdValidity)(commentId, userId);
        const comment = await Comment_1.Comment.findById(commentId);
        if (!comment) {
            throw new Error(Constants_1.commentNotFoundMessage);
        }
        const action = comment.likes.userLikes.includes(userId) ? '$pull' : '$push';
        return await Comment_1.Comment.findByIdAndUpdate(commentId, { [action]: { 'likes.userLikes': userId } }, { new: true, runValidators: true });
    }
    catch (error) {
        throw error;
    }
};
exports.likeComment = likeComment;
//# sourceMappingURL=commentService.js.map