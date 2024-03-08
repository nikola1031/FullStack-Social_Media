"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const Constants_1 = require("../Constants");
const commentSchema = new mongoose_1.Schema({
    text: { type: String, required: true, maxlength: [500, Constants_1.commentLengthValidationMessage] },
    _postId: { type: mongoose_1.Types.ObjectId, ref: 'Post', required: [true, Constants_1.missingPostIValidationdMessage] },
    author: { type: mongoose_1.Types.ObjectId, ref: 'User', required: [true, Constants_1.missingAuthorIdValidationMessage] },
    likes: {
        userLikes: [{ type: mongoose_1.Types.ObjectId, ref: 'User', default: [] }]
    },
}, { timestamps: true });
commentSchema.index({ author: 1, postId: 1 });
exports.Comment = (0, mongoose_1.model)('Comment', commentSchema);
//# sourceMappingURL=Comment.js.map