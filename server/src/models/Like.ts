import { Schema, model, Types } from 'mongoose';
import { TargetType } from '../services/types/enums';

const likeTypes = [TargetType.Post, TargetType.Comment];

const likeSchema: Schema = new Schema({
    _userId: { type: Types.ObjectId, ref: 'User', required: true },
    targetType: { type: String, required: true, enum: {values: likeTypes, message: 'Invalid entity type'} },
    createdAt: { type: Date, default: Date.now },
    _targetId: { type: Types.ObjectId, required: true }
});

export const Like = model('Like', likeSchema);