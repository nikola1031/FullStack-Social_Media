import { Comment } from "../models/Comment";
import { Post } from "../models/Post";
import { User } from "../models/User";
import { checkObjectIdValidity, savePhotos } from "./helpers/serviceHelpers";
import { deleteImage } from "./firebaseStorageService";
import { postNotFoundMessage, postUpdateMessage, userNotFoundMessage } from "../Constants";

interface IPost {
    text: string;
    images: Express.Multer.File[];
    author: string;
}

export const savePost = async ({text, images, author}: IPost) => {
    checkObjectIdValidity(author);

    const user = await User.findById(author);

    if (!user) {
        throw new Error(userNotFoundMessage);
    }

    const imageUrls = await savePhotos(images, author, 'posts');
    
    const newPost = new Post({text, imageUrls, author})
    await newPost.save()
    await newPost.populate({
        path: 'author',
        select: 'username profilePicture'
    })

    return newPost;
}

export const getPosts = async (userId: string | null = null, liked?: string | undefined) => {
    userId && checkObjectIdValidity(userId);

    let criteria: Record<string, string> = {};
    console.log(liked, userId)
    if (liked && userId) {
        criteria = {'likes.userLikes': userId};
    } else if (!liked && userId) {
        criteria = {author: userId};
    }
    
    return await Post.find(criteria).populate(
        {
            path: 'author',
            select: 'username profilePicture'
        }).sort({createdAt: 'desc'});    

}

export const editPost = async (text: string, postId: string) => {
    checkObjectIdValidity(postId);

    try {
        const updatedPost = await Post.findByIdAndUpdate(postId, { text }, { new: true, runValidators: true }).populate({
            path: 'author',
            select: 'username profilePicture'
        });
        return updatedPost;
    } catch (error) {
        console.error(error);
        throw new Error(postUpdateMessage);
    }
}

export const removePost = async (_postId: string) => {
    checkObjectIdValidity(_postId);

    const post = await User.find({_id: _postId});
    if (!post) {
        throw new Error(postNotFoundMessage);
    }

    const deletedPost = await Post.findByIdAndDelete(_postId);
    if (!deletedPost) {
        throw new Error(postUpdateMessage);
    }

    deletedPost.imageUrls.forEach((url: string) => deleteImage(url, 'posts'));
    
    await Comment.deleteMany({_postId});
}

export const likePost = async (postId: string, userId: string) => {
    checkObjectIdValidity(postId, userId);
    
    try {
        const post = await Post.findById(postId);
        if (!post) {
            throw new Error(postNotFoundMessage);
        }
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