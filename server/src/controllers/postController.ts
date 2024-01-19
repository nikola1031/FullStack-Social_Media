import { Request, Response } from 'express';
import * as postService from '../services/postService';
import { deleteImage, uploadImages } from '../services/firebaseStorageService';

export const createPost = async (req: Request, res: Response) => {
    const author = req.user!._id!;
    const { text } = req.body;
    const images = req.files as Express.Multer.File[];
    
    if (!text) {
        throw new Error('Cannot post without text');
    }
    let imageUrls: string[] = [];

    try {
        imageUrls = await uploadImages(images);
        const newPost = await postService.savePost({text, imageUrls, author})
        res.status(201).json(newPost);
    } catch (error: any) {
        if (imageUrls.length) {
            imageUrls.forEach(deleteImage);
        }
        res.status(400).json({ message: error.message });
    }
};

export const getPosts = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { liked } = req.query;
    try {
           const posts = await postService.getPosts(userId, liked);
           res.status(200).json(posts);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const updatePost = async (req: Request, res: Response) => {
    const text = req.body.text;
    const { postId } = req.params;

    try {
        const updatedPost = await postService.editPost(text, postId)
        res.status(200).json(updatedPost);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    const { postId } = req.params;

    try {
        await postService.removePost(postId);
        res.status(200).json({ message: 'Post successfully deleted' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};


export const likePost = async (req: Request, res: Response) => {
    const { postId } = req.params;
    const userId = req.user!._id;
    try {
        const likedPost = await postService.likePost(postId, userId);
        res.status(200).json({ likeCount: likedPost?.likes.userLikes.length });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};