import { Schema, model, Types } from 'mongoose';

const postSchema: Schema = new Schema(
    {
        text: { type: String, required: true, maxLength: 500 },
        imageUrls: { type: [String], default: [] },
        likes: {
            userLikes: [{type: Types.ObjectId, ref: 'User', default: []}]
        },
        commentCount: { type: Number, default: 0 },
        author: { type: Types.ObjectId, ref: 'User', required: true },
    }, { timestamps: true }
);

postSchema.index({ author: 1 });
postSchema.virtual('likes.likeCount').get(function (this: any) {
    return this.likes.userLikes.length;
});
export const Post = model('Post', postSchema);
