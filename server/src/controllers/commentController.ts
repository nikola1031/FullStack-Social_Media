import { Request, Response } from 'express';
import * as commentService from '../services/commentService';
import { TargetType } from '../services/types/enums';
import { toggleLike } from '../services/helpers/serviceHelpers';

export const createComment = async (req: Request, res: Response) => {
    const _ownerId = req.user!._id!;
    const { text } = req.body;
    const { postId } = req.params;

    try {
        const newComment = await commentService.saveComment(text, postId, _ownerId);
        res.status(201).json(newComment);
    } catch (error: any) {
        console.log('Error here');
        res.status(400).json({ message: error.message });
    }
};

export const getAllComments = async (req: Request, res: Response) => {
    const { postId } = req.params;
    try {
        const comments = await commentService.getComments(postId);
        res.status(200).json(comments);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const updateComment = async (req: Request, res: Response) => {
    const { text } = req.body;
    const { commentId } = req.params;

    try {
        const updatedComment = await commentService.editComment(text, commentId)
        res.status(200).json(updatedComment);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const { postId } = req.params;

    try {
        await commentService.removeComment(commentId, postId);
        res.status(200).json({ message: 'Comment successfully deleted' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const likeComment = async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const userId = req.user!._id!;
    try {
        await toggleLike(commentId, userId, TargetType.Comment);
        res.status(200).json({ message: 'Like/Unlike successful' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};