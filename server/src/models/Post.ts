import { Schema, model, Types } from 'mongoose';

const postSchema = new Schema(
    {
        text: { type: String, required: true, maxLength: 500 },
        image: { type: String },
        liked: {type: [Types.ObjectId]},
        likeCount: { type: Number, default: 0 },
        _ownerId: { type: Types.ObjectId, ref: 'User', required: true },
        comments: { type: [Types.ObjectId], ref: 'Comment' }
    }, { timestamps: true }
);

postSchema.index({ _ownerId: 1 });
export const Post = model('Post', postSchema);
