"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePost = exports.deletePost = exports.updatePost = exports.getPostsByUserId = exports.getAllPosts = exports.createPost = void 0;
const postService = __importStar(require("../services/postService"));
const serviceHelpers_1 = require("../services/helpers/serviceHelpers");
const types_1 = require("../services/types/types");
const createPost = async (req, res) => {
    const _ownerId = req.user._id;
    const { text } = req.body;
    const images = req.files;
    console.log('Text', text, 'Images', images);
    return res.status(201).json({ message: 'Post created successfully' });
    const imageUrls = [];
    try {
        const newPost = await postService.savePost({ text, imageUrls, _ownerId });
        res.status(201).json(newPost);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createPost = createPost;
const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getPosts();
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.getAllPosts = getAllPosts;
const getPostsByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const posts = postService.getPosts(userId);
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.getPostsByUserId = getPostsByUserId;
const updatePost = async (req, res) => {
    const text = req.body.text;
    const { postId } = req.params;
    try {
        const updatedPost = await postService.editPost(text, postId);
        res.status(200).json(updatedPost);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updatePost = updatePost;
const deletePost = async (req, res) => {
    const { postId } = req.params;
    try {
        await postService.removePost(postId);
        res.status(200).json({ message: 'Post successfully deleted' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deletePost = deletePost;
const likePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;
    try {
        await (0, serviceHelpers_1.toggleLike)(postId, userId, types_1.TargetType.Post);
        res.status(200).json({ message: 'Like/Unlike successful' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.likePost = likePost;
