import { Comment } from "../../models/Comment"
import { Like } from "../../models/Like"
import { Post } from "../../models/Post"
import { TargetType } from "../types/enums"

export const toggleLike = async (_targetId: string, _userId: string, targetType: string) => {
    const like = await Like.findOne({_targetId, _userId});
    if (!like) {
        const newLike = new Like({_targetId, _userId, targetType});
        await newLike.save();

        adjustLikes(_targetId, 1, targetType);
    } else {
        await Like.deleteOne({_id: like._id});
        adjustLikes(_targetId, -1, targetType);
    }
}

async function adjustLikes(_targetId: string, count: Number, targetType: string) {
    if (targetType === TargetType.Post){
        await Post.updateOne({_id: _targetId}, {$inc: {likeCount: count}});
    } else if (targetType === TargetType.Comment){
        await Comment.updateOne({_id: _targetId}, {$inc: {likeCount: count}});
    }
}