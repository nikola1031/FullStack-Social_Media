"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePost = exports.removePost = exports.editPost = exports.getPosts = exports.savePost = void 0;
const Comment_1 = require("../models/Comment");
const Post_1 = require("../models/Post");
const User_1 = require("../models/User");
const serviceHelpers_1 = require("./helpers/serviceHelpers");
const firebaseStorageService_1 = require("./firebaseStorageService");
const Constants_1 = require("../Constants");
const savePost = async ({ text, images, author }) => {
    (0, serviceHelpers_1.checkObjectIdValidity)(author);
    const user = await User_1.User.findById(author);
    if (!user) {
        throw new Error(Constants_1.userNotFoundMessage);
    }
    const imageUrls = await (0, serviceHelpers_1.savePhotos)(images, author, 'posts');
    const newPost = new Post_1.Post({ text, imageUrls, author });
    await newPost.save();
    await newPost.populate({
        path: 'author',
        select: 'username profilePicture'
    });
    return newPost;
};
exports.savePost = savePost;
const getPosts = async (userId = null, liked) => {
    userId && (0, serviceHelpers_1.checkObjectIdValidity)(userId);
    let criteria = {};
    if (liked && userId) {
        criteria = { 'likes.userLikes': userId };
    }
    else if (!liked && userId) {
        criteria = { author: userId };
    }
    return await Post_1.Post.find(criteria).populate({
        path: 'author',
        select: 'username profilePicture'
    }).sort({ createdAt: 'desc' });
};
exports.getPosts = getPosts;
const editPost = async (text, postId) => {
    (0, serviceHelpers_1.checkObjectIdValidity)(postId);
    try {
        const updatedPost = await Post_1.Post.findByIdAndUpdate(postId, { text }, { new: true, runValidators: true }).populate({
            path: 'author',
            select: 'username profilePicture'
        });
        return updatedPost;
    }
    catch (error) {
        console.error(error);
        throw new Error(Constants_1.postUpdateMessage);
    }
};
exports.editPost = editPost;
const removePost = async (_postId) => {
    (0, serviceHelpers_1.checkObjectIdValidity)(_postId);
    const post = await User_1.User.find({ _id: _postId });
    if (!post) {
        throw new Error(Constants_1.postNotFoundMessage);
    }
    const deletedPost = await Post_1.Post.findByIdAndDelete(_postId);
    if (!deletedPost) {
        throw new Error(Constants_1.postUpdateMessage);
    }
    deletedPost.imageUrls.forEach((url) => (0, firebaseStorageService_1.deleteImage)(url, 'posts'));
    await Comment_1.Comment.deleteMany({ _postId });
};
exports.removePost = removePost;
const likePost = async (postId, userId) => {
    (0, serviceHelpers_1.checkObjectIdValidity)(postId, userId);
    try {
        const post = await Post_1.Post.findById(postId);
        if (!post) {
            throw new Error(Constants_1.postNotFoundMessage);
        }
        const action = post.likes.userLikes.includes(userId) ? '$pull' : '$push';
        return await Post_1.Post.findByIdAndUpdate(postId, { [action]: { 'likes.userLikes': userId } }, { new: true, runValidators: true });
    }
    catch (error) {
        throw error;
    }
};
exports.likePost = likePost;
//# sourceMappingURL=postService.js.map