import { NextFunction, Request, Response } from 'express';
import * as commentService from '../services/commentService';
import { errorHandler } from '../utils/errorHandler';
import { commentDeletionSuccessMessage, textRequiredMessage } from '../Constants';

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
    const author = req.user!._id!;
    const { text } = req.body;
    const { postId } = req.params;
    
    try {
        if (!text) {
            throw new Error(textRequiredMessage);
        }
        
        const newComment = await commentService.saveComment(text, postId, author);
        res.status(201).json(newComment);
    } catch (error: any) {
        res.status(400).json(errorHandler(error));
    }
};

export const getAllComments = async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    try {
        const comments = await commentService.getComments(postId);
        res.status(200).json(comments);
    } catch (error: any) {
        res.status(400).json(errorHandler(error));
    }
};

export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
    const { text }: {text: string} = req.body;
    const { commentId } = req.params;

    try {
        const updatedComment = await commentService.editComment(text, commentId)
        res.status(200).json(updatedComment);
    } catch (error: any) {
        res.status(400).json(errorHandler(error));
    }
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    const { commentId, postId } = req.params;

    try {
        await commentService.removeComment(commentId, postId);
        res.status(200).json({ message: commentDeletionSuccessMessage });
    } catch (error: any) {
        res.status(400).json(errorHandler(error));
    }
};

export const likeComment = async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;
    const userId = req.user!._id;
    try {
        const likedComment = await commentService.likeComment(commentId, userId);
        res.status(200).json({likeCount: likedComment?.likes.userLikes.length});
    } catch (error: any) {
        res.status(400).json(errorHandler(error));
    }
};