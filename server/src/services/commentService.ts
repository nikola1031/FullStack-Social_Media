import { Comment } from "../models/Comment"
import { Like } from "../models/Like";
import { Post } from "../models/Post"

async function adjustCommentCount(postId: string, count: Number) {
    await Post.updateOne({_id: postId}, {$inc: {commentCount: count}});
}

export const saveComment = async (text: string, _postId: string, _ownerId: string) => {
    const newComment = new Comment({text, _postId, _ownerId});
    await newComment.save();
    
    await adjustCommentCount(_postId, 1);

    return newComment;
}

export const getComments = async (_postId: string) => {
    const comments = await Comment.find({_postId});
    return comments;
}

export const editComment = async (text: string, commentId: string) => {
    const updatedComment = await Comment.findByIdAndUpdate(commentId, {text}, {new: true, runValidators: true});
    return updatedComment;
}

export const removeComment = async (commentId: string, postId: string) => {
    const result = await Comment.deleteOne({_id: commentId});
    if (result.deletedCount === 1) {
        await Like.deleteMany({_targetId: commentId});
        await adjustCommentCount(postId, -1);
    }
}