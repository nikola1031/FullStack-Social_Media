import { Schema, model, Types } from 'mongoose';

const userTypes = ['user', 'admin'];

const photoSchema: Schema = new Schema({
    dateAdded: {
        type: Date,
        default: Date.now
    },
    url: {type: String, required: true}
})

const userSchema: Schema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        gender: {type: String, required: true},
        bio: { type: String, default: '' },
        profilePicture: { type: String, default: '' },
        photos: {type: [photoSchema], default: []},
        friendRequests: {type: [Types.ObjectId], ref: 'User', default: []},
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
