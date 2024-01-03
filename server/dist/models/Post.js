"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    text: { type: String, required: true, maxLength: 500 },
    imageUrls: { type: [String], default: [] },
    likeCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    _ownerId: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });
postSchema.index({ _ownerId: 1 });
exports.Post = (0, mongoose_1.model)('Post', postSchema);
