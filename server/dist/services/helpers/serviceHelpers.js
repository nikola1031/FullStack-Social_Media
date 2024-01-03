"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleLike = exports.comparePasswords = exports.hashPassword = void 0;
const Comment_1 = require("../../models/Comment");
const Like_1 = require("../../models/Like");
const Post_1 = require("../../models/Post");
const bcrypt_1 = __importDefault(require("bcrypt"));
const modelMapping = {
    Post: Post_1.Post,
    Comment: Comment_1.Comment
};
const saltRounds = 10;
const hashPassword = async (password) => await bcrypt_1.default.hash(password, saltRounds);
exports.hashPassword = hashPassword;
const comparePasswords = async (password, hash) => await bcrypt_1.default.compare(password, hash);
exports.comparePasswords = comparePasswords;
const toggleLike = async (_targetId, _userId, targetType) => {
    const like = await Like_1.Like.findOne({ _targetId, _userId });
    if (!like) {
        const newLike = new Like_1.Like({ _targetId, _userId, targetType });
        await Promise.all([newLike.save(), adjustLikes(_targetId, 1, modelMapping[targetType])]);
    }
    else {
        const result = await Like_1.Like.deleteOne({ _id: like._id });
        if (result.deletedCount === 1) {
            adjustLikes(_targetId, -1, modelMapping[targetType]);
        }
    }
};
exports.toggleLike = toggleLike;
async function adjustLikes(_targetId, count, Model) {
    await Model.updateOne({ _id: _targetId }, { $inc: { likeCount: count } });
}
