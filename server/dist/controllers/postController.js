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
exports.likePost = exports.deletePost = exports.updatePost = exports.getPosts = exports.createPost = void 0;
const postService = __importStar(require("../services/postService"));
const errorHandler_1 = require("../utils/errorHandler");
const Constants_1 = require("../Constants");
const createPost = async (req, res, next) => {
    const author = req.user._id;
    const { text } = req.body;
    const images = req.files || [];
    try {
        if (!text) {
            throw new Error(Constants_1.textRequiredMessage);
        }
        const newPost = await postService.savePost({ text, images, author });
        res.status(201).json(newPost);
    }
    catch (error) {
        res.status(400).json((0, errorHandler_1.errorHandler)(error));
    }
};
exports.createPost = createPost;
const getPosts = async (req, res, next) => {
    const { userId } = req.params;
    const { liked } = req.query;
    try {
        const posts = await postService.getPosts(userId, liked);
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(400).json((0, errorHandler_1.errorHandler)(error));
    }
};
exports.getPosts = getPosts;
const updatePost = async (req, res, next) => {
    const text = req.body.text;
    const { postId } = req.params;
    try {
        const updatedPost = await postService.editPost(text, postId);
        res.status(200).json(updatedPost);
    }
    catch (error) {
        res.status(400).json((0, errorHandler_1.errorHandler)(error));
    }
};
exports.updatePost = updatePost;
const deletePost = async (req, res, next) => {
    const { postId } = req.params;
    try {
        await postService.removePost(postId);
        res.status(200).json({ message: Constants_1.postDeletionSuccessMessage });
    }
    catch (error) {
        res.status(400).json((0, errorHandler_1.errorHandler)(error));
    }
};
exports.deletePost = deletePost;
const likePost = async (req, res, next) => {
    const { postId } = req.params;
    const userId = req.user._id;
    try {
        const likedPost = await postService.likePost(postId, userId);
        res.status(200).json({ likeCount: likedPost?.likes.userLikes.length });
    }
    catch (error) {
        res.status(400).json((0, errorHandler_1.errorHandler)(error));
    }
};
exports.likePost = likePost;
//# sourceMappingURL=postController.js.map