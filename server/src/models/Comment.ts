import { Schema, model, Types } from 'mongoose';

const commentSchema: Schema = new Schema(
    {
        text: { type: String, required: true, maxlength: 500 },
        _postId: { type: Types.ObjectId, ref: 'Post', required: true },
        author: { type: Types.ObjectId, ref: 'User', required: true },
        likes: {
            userLikes: [{type: Types.ObjectId, ref: 'User', default: []}]
        },
    }, { timestamps: true }
);

commentSchema.index({ author: 1, postId: 1 });
export const Comment = model('Comment', commentSchema);
