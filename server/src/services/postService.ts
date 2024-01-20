import { Comment } from "../models/Comment";
import { Post } from "../models/Post";
import { User } from "../models/User";
import { savePhotos } from "./helpers/serviceHelpers";

interface IPost {
    text: string;
    images: Express.Multer.File[];
    author: string;
}

export const savePost = async ({text, images, author}: IPost) => {
    try {
        const imageUrls = await savePhotos(images, author);
        await User.updateOne({_id: author }, { $push: { photos: { $each: imageUrls.map(url => ({url})) } } });

        const newPost = new Post({text, imageUrls, author})
        await newPost.save();

        return newPost;
    } catch (error) {
        throw error;
    }
}

export const getPosts = async (userId: string | null = null, liked: any) => {
    
    if (liked) {
        return await Post.find({'likes.userLikes': userId}).populate(
            {
                path: 'author',
                select: 'username profilePicture'
            }).sort({createdAt: 'desc'});    
    }

    if (userId) {
        return await Post.find({author: userId}).populate(
            {
                path: 'author',
                select: 'username profilePicture'
            }).sort({createdAt: 'desc'});
    }

    return await Post.find(liked ? {'likes.userLikes': userId} : {}).populate(
        {
            path: 'author',
            select: 'username profilePicture'
        }).sort({createdAt: 'desc'});
}

export const editPost = async (text: string, postId: string) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(postId, { text }, { new: true, runValidators: true });
        return updatedPost;
    } catch (error) {
        throw error;
    }
}

export const removePost = async (_postId: string) => {
    const postDeletion = await Post.deleteOne({_id: _postId});
    if (postDeletion.deletedCount === 0) {
        throw new Error('Delete operation had no effect. Perform database integrity check')
    }
    await Comment.deleteMany({_postId});
}

export const likePost = async (postId: string, userId: string) => {
    try {
        const post = await Post.findById(postId);
        if (!post) {
            throw new Error("Post not found");
        }
            // pushing or pulling from array, and adjusting post count by +1 or -1
            const action = post.likes.userLikes.includes(userId) ? '$pull' : '$push';
            return await Post.findByIdAndUpdate(
                postId,
                { [action]: { 'likes.userLikes': userId} }, 
                { new: true, runValidators: true }
            );
            
    } catch (error) {
        throw error;
    }
};