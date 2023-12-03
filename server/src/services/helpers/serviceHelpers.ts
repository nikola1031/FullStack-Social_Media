import { Comment } from "../../models/Comment"
import { Like } from "../../models/Like"
import { Post } from "../../models/Post"
import { TargetType } from "../types/types"
import bcrypt from 'bcrypt';

const modelMapping = {
    Post,
    Comment
}

const saltRounds = 10;

export const hashPassword = async (password: string) => await bcrypt.hash(password, saltRounds);
export const comparePasswords = async (password: string, hash: string) => await bcrypt.compare(password, hash);

export const toggleLike = async (_targetId: string, _userId: string, targetType: TargetType.Post | TargetType.Comment) => {
    const like = await Like.findOne({_targetId, _userId});
    if (!like) {
        const newLike = new Like({_targetId, _userId, targetType});

        await Promise.all([newLike.save(), adjustLikes(_targetId, 1, modelMapping[targetType])])
    } else {
        const result = await Like.deleteOne({_id: like._id});
        if (result.deletedCount === 1) {
            adjustLikes(_targetId, -1, modelMapping[targetType]);
        }
    }
}

async function adjustLikes(_targetId: string, count: Number, Model: any) {
    await Model.updateOne({_id: _targetId}, {$inc: {likeCount: count}});
}