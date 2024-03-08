"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePost = exports.removePost = exports.editPost = exports.getPosts = exports.savePost = void 0;
const Comment_1 = require("../models/Comment");
const Post_1 = require("../models/Post");
const User_1 = require("../models/User");
const serviceHelpers_1 = require("./helpers/serviceHelpers");
const savePost = async ({ text, images, author }) => {
    try {
        const imageUrls = await (0, serviceHelpers_1.savePhotos)(images, author);
        await User_1.User.updateOne({ _id: author }, { $push: { photos: { $each: imageUrls.map(url => ({ url })) } } });
        const newPost = new Post_1.Post({ text, imageUrls, author });
        await newPost.save();
        await newPost.populate({
            path: 'author',
            select: 'username profilePicture'
        });
        return newPost;
    }
    catch (error) {
        throw error;
    }
};
exports.savePost = savePost;
const getPosts = async (userId = null, liked) => {
    if (liked) {
        return await Post_1.Post.find({ 'likes.userLikes': userId }).populate({
            path: 'author',
            select: 'username profilePicture'
        }).sort({ createdAt: 'desc' });
    }
    if (userId) {
        return await Post_1.Post.find({ author: userId }).populate({
            path: 'author',
            select: 'username profilePicture'
        }).sort({ createdAt: 'desc' });
    }
    return await Post_1.Post.find(liked ? { 'likes.userLikes': userId } : {}).populate({
        path: 'author',
        select: 'username profilePicture'
    }).sort({ createdAt: 'desc' });
};
exports.getPosts = getPosts;
const editPost = async (text, postId) => {
    try {
        const updatedPost = await Post_1.Post.findByIdAndUpdate(postId, { text }, { new: true, runValidators: true }).populate({
            path: 'author',
            select: 'username profilePicture'
        });
        return updatedPost;
    }
    catch (error) {
        throw error;
    }
};
exports.editPost = editPost;
const removePost = async (_postId) => {
    const postDeletion = await Post_1.Post.deleteOne({ _id: _postId });
    if (postDeletion.deletedCount === 0) {
        throw new Error('Delete operation had no effect. Perform database integrity check');
    }
    await Comment_1.Comment.deleteMany({ _postId });
};
exports.removePost = removePost;
const likePost = async (postId, userId) => {
    try {
        const post = await Post_1.Post.findById(postId);
        if (!post) {
            throw new Error("Post not found");
        }
        // pushing or pulling from array, and adjusting post count by +1 or -1
        const action = post.likes.userLikes.includes(userId) ? '$pull' : '$push';
        return await Post_1.Post.findByIdAndUpdate(postId, { [action]: { 'likes.userLikes': userId } }, { new: true, runValidators: true });
    }
    catch (error) {
        throw error;
    }
};
exports.likePost = likePost;
//# sourceMappingURL=postService.js.map