"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleFollow = exports.toggleAddFriend = exports.denyFriendRequest = exports.toggleSendFriendRequest = exports.getUserPhotos = exports.postPhotos = exports.updateProfilePicture = exports.updatePassword = exports.updateProfile = exports.getProfile = void 0;
const userService = __importStar(require("../services/userService"));
const trimmer_1 = require("../utils/trimmer");
const validators_1 = require("../validators/validators");
const getProfile = async (req, res) => {
    try {
        const userData = await userService.fetchProfileData(req.user._id);
        res.status(200).json({ user: userData });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    const trimmedBody = (0, trimmer_1.trimmer)(req.body);
    const { username, email, password, bio } = trimmedBody;
    const data = { username, email, password, bio };
    try {
        const user = await userService.editProfile(data, req.user._id);
        return res.status(200).json(user.toObject());
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateProfile = updateProfile;
const updatePassword = async (req, res) => {
    const trimmedBody = (0, trimmer_1.trimmer)(req.body);
    const { password, newPassword, confirmPass } = trimmedBody;
    const data = { password, newPassword, confirmPass };
    try {
        await userService.editPassword(data, req.user._id);
        res.status(200).json({ message: 'Password updated successfully' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updatePassword = updatePassword;
const updateProfilePicture = async (req, res) => {
    const trimmedBody = (0, trimmer_1.trimmer)(req.body);
    const profilePicture = trimmedBody.profilePicture;
    try {
        if (!profilePicture || !profilePicture.startsWith('http://')) {
            return res.status(400).json({ message: 'Invalid profile picture format' });
        }
        const user = await userService.editProfilePicture(profilePicture, req.user._id);
        res.status(200).json(user.toObject());
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateProfilePicture = updateProfilePicture;
const postPhotos = async (req, res) => {
    const trimmedBody = (0, trimmer_1.trimmer)(req.body);
    const photos = (0, validators_1.filterImageUrls)(trimmedBody.photos);
    try {
        if (photos.length === 0) {
            return res.status(400).json({ message: 'Invalid photo URL format' });
        }
        const data = await userService.uploadPhotos(photos, req.user._id);
        res.status(200).json(data.toObject());
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.postPhotos = postPhotos;
const getUserPhotos = async (req, res) => {
    const userId = req.params.userId;
    try {
        const photos = await userService.fetchPhotos(userId) || [];
        res.status(200).json(photos);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getUserPhotos = getUserPhotos;
const toggleSendFriendRequest = async (req, res) => {
    const userId = req.user._id;
    const otherUserId = req.params.userId;
    try {
        await userService.toggleFriendshipRequest(userId, otherUserId);
        res.status(200).json({ message: 'Friend request successful' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.toggleSendFriendRequest = toggleSendFriendRequest;
const denyFriendRequest = async (req, res) => {
    const userId = req.user._id;
    const otherUserId = req.params.userId;
    try {
        await userService.removeFriendshipRequest(userId, otherUserId);
        res.status(200).json({ message: 'Friend request removed successfully' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.denyFriendRequest = denyFriendRequest;
const toggleAddFriend = async (req, res) => {
    const userId = req.user._id;
    const otherUserId = req.params.userId;
    try {
        await userService.toggleFriendship(userId, otherUserId);
        res.status(200).json({ message: 'Add/Remove friend successful' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.toggleAddFriend = toggleAddFriend;
const toggleFollow = async (req, res) => {
    const userId = req.user._id;
    const otherUserId = req.params.userId;
    try {
        await userService.toggleFollowUser(userId, otherUserId);
        res.status(200).json({ message: 'User followed successfully' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.toggleFollow = toggleFollow;
