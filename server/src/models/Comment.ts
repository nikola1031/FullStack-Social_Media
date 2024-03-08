import { Schema, model, Types } from 'mongoose';
import { missingAuthorIdValidationMessage, missingPostIValidationdMessage, commentLengthValidationMessage } from '../Constants';

const commentSchema: Schema = new Schema(
    {
        text: { type: String, required: true, maxlength: [500, commentLengthValidationMessage] },
        _postId: { type: Types.ObjectId, ref: 'Post', required: [true, missingPostIValidationdMessage] },
        author: { type: Types.ObjectId, ref: 'User', required: [true, missingAuthorIdValidationMessage] },
        likes: {
            userLikes: [{type: Types.ObjectId, ref: 'User', default: []}]
        },
    }, { timestamps: true }
);

commentSchema.index({ author: 1, postId: 1 });
export const Comment = model('Comment', commentSchema);
