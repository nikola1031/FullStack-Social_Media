import { Request, Response } from 'express';
import * as postService from '../services/postService';
import { toggleLike } from '../services/helpers/serviceHelpers';
import { TargetType } from '../services/types/types';

export const createPost = async (req: Request, res: Response) => {
    const _ownerId = req.user!._id!;
    const { text } = req.body;
    const imageUrls = req.body.imageUrls || [];

    try {
        const newPost = await postService.savePost({text, imageUrls, _ownerId})
        res.status(201).json(newPost);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await postService.getPosts();
        res.status(200).json(posts);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const getPostsByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const posts = postService.getPosts(userId)
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
    const userId = req.user!._id!;
    try {
        await toggleLike(postId, userId, TargetType.Post);
        res.status(200).json({ message: 'Like/Unlike successful' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};