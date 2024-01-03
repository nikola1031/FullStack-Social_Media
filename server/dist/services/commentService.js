"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeComment = exports.editComment = exports.getComments = exports.saveComment = void 0;
const Comment_1 = require("../models/Comment");
const Like_1 = require("../models/Like");
const Post_1 = require("../models/Post");
async function adjustCommentCount(postId, count) {
    await Post_1.Post.updateOne({ _id: postId }, { $inc: { commentCount: count } });
}
const saveComment = async (text, _postId, _ownerId) => {
    const newComment = new Comment_1.Comment({ text, _postId, _ownerId });
    await Promise.all([newComment.save(), adjustCommentCount(_postId, 1)]);
    return newComment;
};
exports.saveComment = saveComment;
const getComments = async (_postId) => {
    const comments = await Comment_1.Comment.find({ _postId });
    return comments;
};
exports.getComments = getComments;
const editComment = async (text, commentId) => {
    const updatedComment = await Comment_1.Comment.findByIdAndUpdate(commentId, { text }, { new: true, runValidators: true });
    return updatedComment;
};
exports.editComment = editComment;
const removeComment = async (commentId, postId) => {
    const result = await Comment_1.Comment.deleteOne({ _id: commentId });
    if (result.deletedCount === 1) {
        await Promise.all([Like_1.Like.deleteMany({ _targetId: commentId }), adjustCommentCount(postId, -1)]);
    }
};
exports.removeComment = removeComment;
