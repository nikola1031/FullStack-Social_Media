import { Schema, model, Types } from 'mongoose';

const postSchema: Schema = new Schema(
    {
        text: { type: String, required: true, maxLength: 500 },
        image: { type: String },
        likes: {type: [Types.ObjectId], ref: 'Like', default: []},
        likeCount: { type: Number, default: 0 },
        comments: { type: [Types.ObjectId], ref: 'Comment', default: [] },
        _ownerId: { type: Types.ObjectId, ref: 'User', required: true },
    }, { timestamps: true }
);

postSchema.index({ _ownerId: 1 });
export const Post = model('Post', postSchema);
