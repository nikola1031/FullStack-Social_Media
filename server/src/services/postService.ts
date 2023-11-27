import { Comment } from "../models/Comment";
import { Like } from "../models/Like";
import { Post } from "../models/Post";
import { TargetType } from "./types/types";
import { filterImageUrls } from "./validators/validators"; 

interface IPost {
    text: string;
    imageUrls: string[];
    _ownerId: string;
}

export const savePost = async ({text, imageUrls, _ownerId}: IPost) => {
    const newPost = new Post({text, imageUrls: filterImageUrls(imageUrls), _ownerId});
    await newPost.save();

    return newPost;
}

export const getPosts = async (userId?: string) => {
    if (userId) {
        return await Post.find({_ownerId: userId})
    }
    const posts = await Post.find({});
    return posts;
}

export const editPost = async (text: string, postId: string) => {
    const updatedPost = await Post.findByIdAndUpdate(postId, { text }, { new: true, runValidators: true });
    return updatedPost;
}

export const removePost = async (_postId: string) => {
    const postDeletion = await Post.deleteOne({_id: _postId});
    if (postDeletion.deletedCount === 0) {
        throw new Error('Post not found. Deletion unsuccessful')
    }
    const commentDeletion = await Comment.deleteMany({_postId});
    
    if (commentDeletion.deletedCount === 0) {
        return;
    }
    
    const commentIds = await Comment.distinct('_id', { _postId });
    await Like.deleteMany({
        $or: [
            { _targetId: _postId, targetType: TargetType.Post },
            { _targetId: { $in: commentIds }, targetType: TargetType.Comment }
        ]
    });
}