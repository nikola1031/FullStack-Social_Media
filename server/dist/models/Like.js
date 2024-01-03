"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = void 0;
const mongoose_1 = require("mongoose");
const types_1 = require("../services/types/types");
const likeTypes = [types_1.TargetType.Post, types_1.TargetType.Comment];
const likeSchema = new mongoose_1.Schema({
    _userId: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    targetType: { type: String, required: true, enum: { values: likeTypes, message: 'Invalid entity type' } },
    createdAt: { type: Date, default: Date.now },
    _targetId: { type: mongoose_1.Types.ObjectId, required: true }
});
exports.Like = (0, mongoose_1.model)('Like', likeSchema);
