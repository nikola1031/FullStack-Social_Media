import { Schema, model, Types } from 'mongoose';
import { missingAuthorIdValidationMessage, postLengthValidationMessage } from '../Constants';

const postSchema: Schema = new Schema(
    {
        text: { type: String, required: true, maxLength: [500, postLengthValidationMessage] },
        imageUrls: { type: [String], default: [] },
        likes: {
            userLikes: [{type: Types.ObjectId, ref: 'User', default: []}]
        },
        commentCount: { type: Number, default: 0 },
        author: { type: Types.ObjectId, ref: 'User', required: [true, missingAuthorIdValidationMessage] },
    }, { timestamps: true }
);

postSchema.index({ author: 1 });
export const Post = model('Post', postSchema);