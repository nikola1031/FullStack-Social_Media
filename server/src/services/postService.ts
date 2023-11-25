import { Comment } from "../models/Comment";
import { Like } from "../models/Like";
import { Post } from "../models/Post";
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

export const removePost = async (id: string) => {
    await Post.findByIdAndDelete(id);
    await Comment.deleteMany({_postId: id});
    await Like.deleteMany({})
}