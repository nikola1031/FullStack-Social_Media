import { NextFunction, Request, Response } from 'express';
import * as postService from '../services/postService';
import { errorHandler } from '../utils/errorHandler';
import { postDeletionSuccessMessage, textRequiredMessage } from '../Constants';

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    const author = req.user!._id!;
    const { text } = req.body;
    const images = (req.files as Express.Multer.File[]) || [];
    
    try {
        
        if (!text) {
            throw new Error(textRequiredMessage);
        }
        const newPost = await postService.savePost({text, images, author})
        res.status(201).json(newPost);
    } catch (error: any) {
        res.status(400).json(errorHandler(error));
    }
};

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const { liked }: {liked?: string | undefined} = req.query;
    try {
        const posts = await postService.getPosts(userId, liked);
        res.status(200).json(posts);
    } catch (error: any) {
        res.status(400).json(errorHandler(error));
    }
};

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    const text = req.body.text;
    const { postId } = req.params;

    try {
        const updatedPost = await postService.editPost(text, postId)
        res.status(200).json(updatedPost);
    } catch (error: any) {
        res.status(400).json(errorHandler(error));
    }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    
    try {
        await postService.removePost(postId);
        res.status(200).json({ message: postDeletionSuccessMessage });
    } catch (error: any) {
        res.status(400).json(errorHandler(error));
    }
};


export const likePost = async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    const userId = req.user!._id;
    try {
        const likedPost = await postService.likePost(postId, userId);
        res.status(200).json({ likeCount: likedPost?.likes.userLikes.length });
    } catch (error: any) {
        res.status(400).json(errorHandler(error));
    }
};