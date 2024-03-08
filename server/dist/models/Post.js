"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const Constants_1 = require("../Constants");
const postSchema = new mongoose_1.Schema({
    text: { type: String, required: true, maxLength: [500, Constants_1.postLengthValidationMessage] },
    imageUrls: { type: [String], default: [] },
    likes: {
        userLikes: [{ type: mongoose_1.Types.ObjectId, ref: 'User', default: [] }]
    },
    commentCount: { type: Number, default: 0 },
    author: { type: mongoose_1.Types.ObjectId, ref: 'User', required: [true, Constants_1.missingAuthorIdValidationMessage] },
}, { timestamps: true });
postSchema.index({ author: 1 });
exports.Post = (0, mongoose_1.model)('Post', postSchema);
//# sourceMappingURL=Post.js.map