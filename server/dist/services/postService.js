"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePost = exports.editPost = exports.getPosts = exports.savePost = void 0;
const Comment_1 = require("../models/Comment");
const Like_1 = require("../models/Like");
const Post_1 = require("../models/Post");
const types_1 = require("./types/types");
const validators_1 = require("../validators/validators");
const savePost = async ({ text, imageUrls, _ownerId }) => {
    const newPost = new Post_1.Post({ text, imageUrls: (0, validators_1.filterImageUrls)(imageUrls), _ownerId });
    await newPost.save();
    return newPost;
};
exports.savePost = savePost;
const getPosts = async (userId) => {
    if (userId) {
        return await Post_1.Post.find({ _ownerId: userId });
    }
    const posts = await Post_1.Post.find({});
    return posts;
};
exports.getPosts = getPosts;
const editPost = async (text, postId) => {
    const updatedPost = await Post_1.Post.findByIdAndUpdate(postId, { text }, { new: true, runValidators: true });
    return updatedPost;
};
exports.editPost = editPost;
const removePost = async (_postId) => {
    const postDeletion = await Post_1.Post.deleteOne({ _id: _postId });
    if (postDeletion.deletedCount === 0) {
        throw new Error('Delete operation had no effect. Perform database integrity check');
    }
    const commentDeletion = await Comment_1.Comment.deleteMany({ _postId });
    if (commentDeletion.deletedCount === 0) {
        return;
    }
    const commentIds = await Comment_1.Comment.distinct('_id', { _postId });
    await Like_1.Like.deleteMany({
        $or: [
            { _targetId: _postId, targetType: types_1.TargetType.Post },
            { _targetId: { $in: commentIds }, targetType: types_1.TargetType.Comment }
        ]
    });
};
exports.removePost = removePost;
