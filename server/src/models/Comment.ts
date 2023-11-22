import { Schema, model, Types } from 'mongoose';

const commentSchema = new Schema(
    {
        text: { type: String, required: true, maxlength: 500 },
        image: { type: String },
        likes: {type: [Types.ObjectId], ref: 'Like', default: []},
        likeCount: { type: Number, default: 0 },
        _postId: { type: Types.ObjectId, ref: 'Post', required: true },
        _ownerId: { type: Types.ObjectId, ref: 'User', required: true },
    }, { timestamps: true }
);

commentSchema.index({ _ownerId: 1, postId: 1 });

export const Comment = model('Comment', commentSchema);
