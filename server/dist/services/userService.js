"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchProfileData = exports.fetchPhotos = exports.uploadPhotos = exports.toggleFollowUser = exports.toggleFriendship = exports.removeFriendshipRequest = exports.toggleFriendshipRequest = exports.editProfilePicture = exports.editPassword = exports.editProfile = void 0;
const User_1 = require("../models/User");
const serviceHelpers_1 = require("./helpers/serviceHelpers");
function hasEmailAndPassword(data) {
    return data && typeof data.email === 'string' && typeof data.password === 'string';
}
const editProfile = async (data, userId) => {
    const user = await User_1.User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    if (hasEmailAndPassword(data) && !(await (0, serviceHelpers_1.comparePasswords)(data.password, user.password))) {
        throw new Error('Incorrect password');
    }
    if (hasEmailAndPassword(data)) {
        user.email = data.email;
    }
    data.bio ? user.bio = data.bio : null;
    data.username ? user.username = data.username : null;
    await user.save();
    return user;
};
exports.editProfile = editProfile;
const editPassword = async (passwords, userId) => {
    const user = await User_1.User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    if (!(await (0, serviceHelpers_1.comparePasswords)(passwords.password, user.password))) {
        throw new Error('Incorrect password');
    }
    if (passwords.newPassword !== passwords.confirmPass) {
        throw new Error('Passwords must match');
    }
    user.password = await (0, serviceHelpers_1.hashPassword)(passwords.newPassword);
    await user.save();
};
exports.editPassword = editPassword;
const editProfilePicture = async (profilePicture, userId) => {
    const updatedUser = await User_1.User.findByIdAndUpdate(userId, { profilePicture }, { new: true });
    if (!updatedUser) {
        throw new Error('Profile picture update failed. Invalid user');
    }
    return updatedUser;
};
exports.editProfilePicture = editProfilePicture;
const toggleFriendshipRequest = async (userId, otherUserId) => {
    let result;
    if (userId === otherUserId) {
        throw new Error('Cannot request friendship with self');
    }
    const [user, otherUser] = await Promise.all([User_1.User.findById(userId), User_1.User.findById(otherUserId)]);
    if (!user || !otherUser) {
        throw new Error('User not found');
    }
    if (user.friends.includes(otherUserId)) {
        throw new Error('Users are already friends');
    }
    if (otherUser.friendRequests.includes(userId)) {
        result = await User_1.User.updateOne({ _id: otherUserId }, { $pull: { friendRequests: userId } });
    }
    else {
        result = await User_1.User.updateOne({ _id: otherUserId }, { $push: { friendRequests: userId } });
    }
    if (result.matchedCount === 0) {
        throw new Error('User not found');
    }
    if (result.modifiedCount === 0) {
        throw new Error('Friend request not added');
    }
};
exports.toggleFriendshipRequest = toggleFriendshipRequest;
const removeFriendshipRequest = async (userId, otherUserId) => {
    const result = await User_1.User.updateOne({ _id: userId }, { $pull: { friendRequests: otherUserId } });
    if (result.modifiedCount !== 1) {
        throw new Error('Remove friendship request operation had no effect. Perform database integrity check');
    }
};
exports.removeFriendshipRequest = removeFriendshipRequest;
const toggleFriendship = async (userId, otherUserId) => {
    let result;
    if (userId === otherUserId) {
        throw new Error('Cannot befriend self');
    }
    const user = await User_1.User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    if (user.friends.includes(otherUserId)) {
        result = await Promise.all([
            User_1.User.updateOne({ _id: userId }, { $pull: { friends: otherUserId } }),
            User_1.User.updateOne({ _id: otherUserId }, { $pull: { friends: userId } }),
        ]);
    }
    else {
        result = await Promise.all([
            User_1.User.updateOne({ _id: userId }, { $push: { friends: otherUserId } }),
            User_1.User.updateOne({ _id: otherUserId }, { $push: { friends: userId }, $pull: { friendRequests: userId } }),
        ]);
    }
    if (result[0].modifiedCount === 0 || result[1].modifiedCount === 0) {
        throw new Error('Add/Remove friend operation had no effect. Perform database integrity check');
    }
};
exports.toggleFriendship = toggleFriendship;
const toggleFollowUser = async (userId, otherUserId) => {
    if (userId === otherUserId) {
        throw new Error('Can\'t follow self');
    }
    const users = (await User_1.User.find({ _id: { $in: [userId, otherUserId] } }));
    if (users.length !== 2 || !users[0] || !users[1]) {
        throw new Error('One or more of requested users not found');
    }
    const user = users.find((user) => user._id.toString() === userId);
    const otherUser = users.find((user) => user._id.toString() === otherUserId);
    let result;
    if (user.following.includes(userId)) {
        result = await Promise.all([
            User_1.User.updateOne({ _id: userId }, { $pull: { following: otherUserId } }),
            User_1.User.updateOne({ _id: otherUserId }, { $pull: { followers: userId } }),
        ]);
    }
    else {
        result = await Promise.all([
            User_1.User.updateOne({ _id: userId }, { $push: { following: otherUserId } }),
            User_1.User.updateOne({ _id: otherUserId }, { $push: { followers: userId } }),
        ]);
    }
    if (result[0].modifiedCount === 0 || result[1].modifiedCount === 0) {
        throw new Error('Follow operation had no effect. Perform database integrity check');
    }
};
exports.toggleFollowUser = toggleFollowUser;
const uploadPhotos = async (photos, userId) => {
    const mappedPhotos = photos.map((url) => ({ url }));
    return User_1.User.findByIdAndUpdate(userId, { $push: { photos: { $each: mappedPhotos } } }).select('photos');
};
exports.uploadPhotos = uploadPhotos;
const fetchPhotos = async (userId) => {
    return await User_1.User.findById(userId).select('photos');
};
exports.fetchPhotos = fetchPhotos;
const fetchProfileData = async (userId) => {
    const userData = await User_1.User.findById(userId).select('username email bio profilePicture photos gender');
    const counts = await User_1.User.aggregate([
        { $match: { _id: userId } },
        { $project: {
                friendCount: { $size: "$friends" },
                followersCount: { $size: "$followers" },
                followingCount: { $size: "$following" }
            } }
    ]);
    const profileData = {
        ...userData?.toObject(),
        friendCount: counts[0]?.friendCount || 0,
        followersCount: counts[0]?.followersCount || 0,
        followingCount: counts[0]?.followingCount || 0
    };
    return profileData;
};
exports.fetchProfileData = fetchProfileData;
