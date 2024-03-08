"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchFriendStatus = exports.fetchProfileData = exports.deletePhoto = exports.fetchPhotos = exports.uploadPhotos = exports.toggleFollowUser = exports.toggleFriendship = exports.toggleFriendshipRequest = exports.editProfilePicture = exports.editPassword = exports.editProfile = void 0;
const User_1 = require("../models/User");
const serviceHelpers_1 = require("./helpers/serviceHelpers");
const editProfile = async (data, userId) => {
    const user = await User_1.User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    if (!(await (0, serviceHelpers_1.comparePasswords)(data.password, user.password))) {
        throw new Error('Incorrect password');
    }
    user.email = data.email;
    user.bio = data.bio;
    user.username = data.username;
    await user.save();
    return user.populate('friendRequests.received friendRequests.sent friends', 'username profilePicture');
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
    const updatedUser = await User_1.User.findByIdAndUpdate(userId, { profilePicture }, { new: true }).select('profilePicture');
    if (!updatedUser) {
        throw new Error('Profile picture update failed. Invalid user');
    }
    return updatedUser;
};
exports.editProfilePicture = editProfilePicture;
const toggleFriendshipRequest = async (loggedInUserId, otherUserId) => {
    if (loggedInUserId === otherUserId) {
        throw new Error('Cannot request friendship with self');
    }
    const [loggedInUser, otherUser] = await Promise.all([User_1.User.findById(loggedInUserId), User_1.User.findById(otherUserId)]);
    if (!loggedInUser || !otherUser) {
        throw new Error('User not found');
    }
    if (loggedInUser.friends.includes(otherUserId)) {
        throw new Error('You are already friends');
    }
    if (loggedInUser.friendRequests.sent.includes(otherUserId) || loggedInUser.friendRequests.received.includes(otherUserId)) {
        const [_, result] = await Promise.all([
            User_1.User.updateOne({ _id: otherUserId }, { $pull: { 'friendRequests.received': loggedInUserId, 'friendRequests.sent': loggedInUserId } }),
            User_1.User.findByIdAndUpdate(loggedInUserId, { $pull: { 'friendRequests.received': otherUserId, 'friendRequests.sent': otherUserId } }, { new: true })
                .select('friendRequests.received friendRequests.sent')
                .populate('friendRequests.received', 'username profilePicture')
        ]);
        return result;
    }
    else {
        const [_, result] = await Promise.all([
            User_1.User.updateOne({ _id: otherUserId }, { $push: { 'friendRequests.received': loggedInUserId } }),
            User_1.User.findByIdAndUpdate(loggedInUserId, { $push: { 'friendRequests.sent': otherUserId } }, { new: true })
                .select('friendRequests.received friendRequests.sent')
                .populate('friendRequests.received', 'username profilePicture')
        ]);
        return result;
    }
};
exports.toggleFriendshipRequest = toggleFriendshipRequest;
const toggleFriendship = async (loggedInUserId, otherUserId) => {
    if (loggedInUserId === otherUserId) {
        throw new Error('Can\'t befriend self');
    }
    const loggedInUser = await User_1.User.findById(loggedInUserId);
    if (!loggedInUser) {
        throw new Error('User not found');
    }
    if (loggedInUser.friends.includes(otherUserId)) {
        const [_, result] = await Promise.all([
            User_1.User.updateOne({ _id: otherUserId }, { $pull: { friends: loggedInUserId } }),
            User_1.User.findByIdAndUpdate(loggedInUserId, { $pull: { friends: otherUserId } }, { new: true })
                .select('friendRequests.received friendRequests.sent friends')
                .populate('friendRequests.received friends', 'username profilePicture')
        ]);
        return result;
    }
    else if (loggedInUser.friendRequests.received.includes(otherUserId)) {
        const [_, result] = await Promise.all([
            User_1.User.updateOne({ _id: otherUserId }, { $push: { friends: loggedInUserId }, $pull: { 'friendRequests.sent': loggedInUserId } }),
            User_1.User.findByIdAndUpdate(loggedInUserId, { $push: { friends: otherUserId }, $pull: { 'friendRequests.received': otherUserId } }, { new: true })
                .select('friendRequests.received friendRequests.sent friends')
                .populate('friendRequests.received friends', 'username profilePicture')
        ]);
        return result;
    }
};
exports.toggleFriendship = toggleFriendship;
const toggleFollowUser = async (loggedInUserId, otherUserId) => {
    if (loggedInUserId === otherUserId) {
        throw new Error('Can\'t follow self');
    }
    const users = (await User_1.User.find({ _id: { $in: [loggedInUserId, otherUserId] } }));
    if (users.length !== 2 || !users[0] || !users[1]) {
        throw new Error('One or more of requested users not found');
    }
    const loggedInUser = users.find((user) => user._id.toString() === loggedInUserId);
    const otherUser = users.find((user) => user._id.toString() === otherUserId);
    let result;
    if (loggedInUser.following.includes(loggedInUserId)) {
        result = await Promise.all([
            User_1.User.updateOne({ _id: loggedInUserId }, { $pull: { following: otherUserId } }),
            User_1.User.updateOne({ _id: otherUserId }, { $pull: { followers: loggedInUserId } }),
        ]);
    }
    else {
        result = await Promise.all([
            User_1.User.updateOne({ _id: loggedInUserId }, { $push: { following: otherUserId } }),
            User_1.User.updateOne({ _id: otherUserId }, { $push: { followers: loggedInUserId } }),
        ]);
    }
    if (result[0].modifiedCount === 0 || result[1].modifiedCount === 0) {
        throw new Error('Follow operation had no effect. Perform database integrity check');
    }
};
exports.toggleFollowUser = toggleFollowUser;
const uploadPhotos = async (photos, userId) => {
    const imageUrls = await (0, serviceHelpers_1.savePhotos)(photos, userId);
    const images = await User_1.User.findByIdAndUpdate(userId, {
        $push: {
            photos: {
                $each: imageUrls.map(url => ({ url }))
            }
        }
    }, { new: true }).select('photos');
    return images;
};
exports.uploadPhotos = uploadPhotos;
const fetchPhotos = async (userId) => {
    return await User_1.User.findById(userId).select('photos');
};
exports.fetchPhotos = fetchPhotos;
const deletePhoto = async (url, userId) => {
    return await User_1.User.findByIdAndUpdate(userId, { $pull: { photos: { url } } }, { new: true }).select('photos');
};
exports.deletePhoto = deletePhoto;
const fetchProfileData = async (loggedInUserId, userId) => {
    const fields = 'username bio profilePicture photos gender friends following followers';
    let user;
    if (userId === loggedInUserId) {
        user = await User_1.User.findById(userId).select(fields + ' friendRequests')
            .populate('friends friendRequests.received', 'username profilePicture');
    }
    else {
        user = await User_1.User.findById(userId).select(fields).populate('friends', 'username profilePicture');
    }
    throw new Error('Error fetching user');
    user.photos.reverse(); // easiest way to get the newest photos first
    return user;
};
exports.fetchProfileData = fetchProfileData;
const fetchFriendStatus = async (loggedInUserId, otherUserId) => {
    const loggedInUser = await User_1.User.findById(loggedInUserId).select('friendRequests friends');
    if (loggedInUser.friendRequests.received.includes(otherUserId)) {
        return 'received';
    }
    if (loggedInUser.friendRequests.sent.includes(otherUserId)) {
        return 'sent';
    }
    if (loggedInUser.friends.includes(otherUserId)) {
        return 'friends';
    }
    return 'none';
};
exports.fetchFriendStatus = fetchFriendStatus;
//# sourceMappingURL=userService.js.map