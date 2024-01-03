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
exports.likeComment = exports.deleteComment = exports.updateComment = exports.getAllComments = exports.createComment = void 0;
const commentService = __importStar(require("../services/commentService"));
const types_1 = require("../services/types/types");
const serviceHelpers_1 = require("../services/helpers/serviceHelpers");
const createComment = async (req, res) => {
    const _ownerId = req.user._id;
    const { text } = req.body;
    const { postId } = req.params;
    try {
        const newComment = await commentService.saveComment(text, postId, _ownerId);
        res.status(201).json(newComment);
    }
    catch (error) {
        console.log('Error here');
        res.status(400).json({ message: error.message });
    }
};
exports.createComment = createComment;
const getAllComments = async (req, res) => {
    const { postId } = req.params;
    try {
        const comments = await commentService.getComments(postId);
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.getAllComments = getAllComments;
const updateComment = async (req, res) => {
    const { text } = req.body;
    const { commentId } = req.params;
    try {
        const updatedComment = await commentService.editComment(text, commentId);
        res.status(200).json(updatedComment);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateComment = updateComment;
const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const { postId } = req.params;
    try {
        await commentService.removeComment(commentId, postId);
        res.status(200).json({ message: 'Comment successfully deleted' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deleteComment = deleteComment;
const likeComment = async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user._id;
    try {
        await (0, serviceHelpers_1.toggleLike)(commentId, userId, types_1.TargetType.Comment);
        res.status(200).json({ message: 'Like/Unlike successful' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.likeComment = likeComment;
