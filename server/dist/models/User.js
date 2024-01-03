"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userTypes = ['user', 'admin'];
const photoSchema = new mongoose_1.Schema({
    dateAdded: {
        type: Date,
        default: Date.now
    },
    url: { type: String, required: true }
});
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    bio: { type: String, default: '' },
    profilePicture: { type: String, default: '' },
    photos: { type: [photoSchema], default: [] },
    friendRequests: { type: [mongoose_1.Types.ObjectId], ref: 'User', default: [] },
    friends: { type: [mongoose_1.Types.ObjectId], ref: 'User', default: [] },
    followers: { type: [mongoose_1.Types.ObjectId], ref: 'User', default: [] },
    following: { type: [mongoose_1.Types.ObjectId], ref: 'User', default: [] },
    isVerified: { type: Boolean, default: false },
    role: { type: String, default: 'user', enum: { values: userTypes, message: 'Invalid user type' },
    },
}, { timestamps: true });
userSchema.index({ email: 1 }, { collation: { locale: 'en', strength: 1 } });
userSchema.index({ username: 1 }, { collation: { locale: 'en', strength: 1 } });
exports.User = (0, mongoose_1.model)('User', userSchema);
