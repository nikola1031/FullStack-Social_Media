import { Schema, model, Types } from 'mongoose';

const likeSchema: Schema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    targetType: { type: String, required: true, enum: ['Post', 'Comment'] },
    targetId: { type: Types.ObjectId, required: true }
});

export const Like = model('Like', likeSchema);