import { Schema, model, Types } from 'mongoose';

const postSchema: Schema = new Schema(
    {
        text: { type: String, required: true, maxLength: 500 },
        imageUrls: { type: [String], default: [] },
        likeCount: { type: Number, default: 0 },
        commentCount: { type: Number, default: 0 },
        _ownerId: { type: Types.ObjectId, ref: 'User', required: true },
    }, { timestamps: true }
);

postSchema.index({ _ownerId: 1 });
export const Post = model('Post', postSchema);
