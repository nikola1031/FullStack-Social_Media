import { Schema, model, Types } from 'mongoose';

const postSchema: Schema = new Schema(
    {
        text: { type: String, required: true, maxLength: 500 },
        imageUrls: { type: [String], default: [] },
        likes: {
            likeCount: { type: Number, default: 0 },
            userLikes: [{type: Types.ObjectId, ref: 'User', default: []}]
        },
        commentCount: { type: Number, default: 0 },
        author: { type: Types.ObjectId, ref: 'User', required: true },
    }, { timestamps: true }
);

postSchema.index({ author: 1 });
export const Post = model('Post', postSchema);
