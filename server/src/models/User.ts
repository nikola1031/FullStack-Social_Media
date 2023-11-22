import { Schema, model, Types } from 'mongoose';

const userTypes = ['user', 'admin'];

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        bio: { type: String },
        profilePicture: { type: String },
        posts: { type: [Types.ObjectId], ref: 'Post', default: [] },
        likedPosts: { type: [Types.ObjectId], ref: 'Post', default: [] },
        comments: { type: [Types.ObjectId], ref: 'Comment', default: [] },
        friends: { type: [Types.ObjectId], ref: 'User', default: [] },
        followers: { type: [Types.ObjectId], ref: 'User', default: [] },
        following: { type: [Types.ObjectId], ref: 'User', default: [] },
        isVerified: { type: Boolean, default: false },
        role: { type: String, default: 'user', enum: { values: userTypes, message: 'Invalid user type' },
        },
    },
    { timestamps: true }
);

userSchema.index({ email: 1 }, { collation: { locale: 'en', strength: 1 } });
userSchema.index({ username: 1 }, { collation: { locale: 'en', strength: 1 } });

export const User = model('User', userSchema);
