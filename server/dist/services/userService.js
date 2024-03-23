"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchFriendStatus = exports.fetchProfileData = exports.deletePhoto = exports.fetchPhotos = exports.uploadPhotos = exports.toggleFollowUser = exports.toggleFriendship = exports.toggleFriendshipRequest = exports.editProfilePicture = exports.editPassword = exports.editProfile = void 0;
const Constants_1 = require("../Constants");
const User_1 = require("../models/User");
const firebaseStorageService_1 = require("./firebaseStorageService");
const serviceHelpers_1 = require("./helpers/serviceHelpers");
const editProfile = async (data, userId) => {
    (0, serviceHelpers_1.checkObjectIdValidity)(userId);
    const user = await User_1.User.findById(userId);
    if (!user) {
        throw new Error(Constants_1.userNotFoundMessage);
    }
    if (!(await (0, serviceHelpers_1.comparePasswords)(data.password, user.password))) {
        throw new Error(Constants_1.wrongEmailOrPasswordMessage);
    }
    user.email = data.email;
    user.bio = data.bio;
    user.username = data.username;
    await user.save();
    return user.populate('friendRequests.received friendRequests.sent friends', 'username profilePicture');
};
exports.editProfile = editProfile;
const editPassword = async (passwords, userId) => {
    (0, serviceHelpers_1.checkObjectIdValidity)(userId);
    const user = await User_1.User.findById(userId);
    if (!user) {
        throw new Error(Constants_1.userNotFoundMessage);
    }
    if (!(await (0, serviceHelpers_1.comparePasswords)(passwords.password, user.password))) {
        throw new Error(Constants_1.wrongEmailOrPasswordMessage);
    }
    if (passwords.newPassword !== passwords.confirmPass) {
        throw new Error(Constants_1.passwordsMustMatchMessage);
    }
    user.password = await (0, serviceHelpers_1.hashPassword)(passwords.newPassword);
    await user.save();
};
exports.editPassword = editPassword;
const editProfilePicture = async (profilePicture, userId) => {
    (0, serviceHelpers_1.checkObjectIdValidity)(userId);
    try {
        const updatedUser = await User_1.User.findByIdAndUpdate(userId, { profilePicture }, { new: true }).select('profilePicture');
        if (!updatedUser) {
            throw new Error(Constants_1.avatarUpdateFailedMessage);
        }
        return updatedUser;
    }
    catch (error) {
        console.error(error);
        throw new Error(Constants_1.avatarUpdateFailedMessage);
    }
};
exports.editProfilePicture = editProfilePicture;
const toggleFriendshipRequest = async (loggedInUserId, otherUserId) => {
    (0, serviceHelpers_1.checkObjectIdValidity)(loggedInUserId, otherUserId);
    if (loggedInUserId === otherUserId) {
        throw new Error(Constants_1.friendshipWithSelfMessage);
    }
    const [loggedInUser, otherUser] = await Promise.all([User_1.User.findById(loggedInUserId), User_1.User.findById(otherUserId)]);
    if (!loggedInUser || !otherUser) {
        throw new Error(Constants_1.userNotFoundMessage);
    }
    if (loggedInUser.friends.includes(otherUserId)) {
        throw new Error(Constants_1.alreadyFriendsMessage);
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
    (0, serviceHelpers_1.checkObjectIdValidity)(loggedInUserId, otherUserId);
    if (loggedInUserId === otherUserId) {
        throw new Error(Constants_1.friendshipWithSelfMessage);
    }
    const loggedInUser = await User_1.User.findById(loggedInUserId);
    if (!loggedInUser) {
        throw new Error(Constants_1.userNotFoundMessage);
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
    (0, serviceHelpers_1.checkObjectIdValidity)(loggedInUserId, otherUserId);
    if (loggedInUserId === otherUserId) {
        throw new Error(Constants_1.cannotFollowSelfMessage);
    }
    const users = (await User_1.User.find({ _id: { $in: [loggedInUserId, otherUserId] } }));
    if (users.length !== 2 || !users[0] || !users[1]) {
        throw new Error(Constants_1.userNotFoundMessage);
    }
    const loggedInUser = users.find((user) => user._id.toString() === loggedInUserId);
    // const otherUser = users.find((user) => user._id!.toString() === otherUserId);
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
        throw new Error(Constants_1.followUnsucessfulMessage);
    }
};
exports.toggleFollowUser = toggleFollowUser;
const uploadPhotos = async (photos, userId) => {
    (0, serviceHelpers_1.checkObjectIdValidity)(userId);
    if (!photos || photos.length === 0) {
        throw new Error(Constants_1.fileUploadNotFoundMessage);
    }
    const user = await User_1.User.findById(userId);
    if (!user) {
        throw new Error(Constants_1.userNotFoundMessage);
    }
    const imageUrls = await (0, serviceHelpers_1.savePhotos)(photos, userId, 'profile');
    const images = await User_1.User.findByIdAndUpdate(userId, {
        $push: {
            photos: {
                $each: imageUrls.map(url => ({ url }))
            }
        }
    }, { new: true })
        .select('photos');
    return images;
};
exports.uploadPhotos = uploadPhotos;
const fetchPhotos = async (userId) => {
    (0, serviceHelpers_1.checkObjectIdValidity)(userId);
    const user = await User_1.User.findById(userId);
    if (!user) {
        throw new Error(Constants_1.userNotFoundMessage);
    }
    return user.photos;
};
exports.fetchPhotos = fetchPhotos;
const deletePhoto = async (url, userId) => {
    (0, serviceHelpers_1.checkObjectIdValidity)(userId);
    const user = await User_1.User.findById(userId);
    if (!user) {
        throw new Error(Constants_1.userNotFoundMessage);
    }
    const photos = await User_1.User.findByIdAndUpdate(userId, { $pull: { photos: { url } } }, { new: true }).select('photos');
    await (0, firebaseStorageService_1.deleteImage)(url, 'profile');
    return photos;
};
exports.deletePhoto = deletePhoto;
const fetchProfileData = async (loggedInUserId, userId) => {
    (0, serviceHelpers_1.checkObjectIdValidity)(loggedInUserId, userId);
    const fields = 'username bio profilePicture photos gender friends following followers';
    let user;
    try {
        if (userId === loggedInUserId) {
            user = await User_1.User.findById(userId).select(fields + ' friendRequests')
                .populate('friends friendRequests.received', 'username profilePicture');
        }
        else {
            user = await User_1.User.findById(userId).select(fields).populate('friends', 'username profilePicture');
        }
    }
    catch (error) {
        throw new Error(Constants_1.userNotFoundMessage);
    }
    user.photos.reverse(); // easiest way to get the newest photos first
    return user;
};
exports.fetchProfileData = fetchProfileData;
const fetchFriendStatus = async (loggedInUserId, otherUserId) => {
    (0, serviceHelpers_1.checkObjectIdValidity)(loggedInUserId, otherUserId);
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