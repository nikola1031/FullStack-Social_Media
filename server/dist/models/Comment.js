"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    text: { type: String, required: true, maxlength: 500 },
    _postId: { type: mongoose_1.Types.ObjectId, ref: 'Post', required: true },
    _ownerId: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    likeCount: { type: Number, default: 0 },
}, { timestamps: true });
commentSchema.index({ _ownerId: 1, postId: 1 });
exports.Comment = (0, mongoose_1.model)('Comment', commentSchema);
