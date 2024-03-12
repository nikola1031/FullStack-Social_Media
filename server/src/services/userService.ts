import { alreadyFriendsMessage, avatarUpdateFailedMessage, cannotFollowSelfMessage, fileUploadNotFoundMessage, followUnsucessfulMessage, friendshipWithSelfMessage, passwordsMustMatchMessage, userNotFoundMessage, wrongEmailOrPasswordMessage } from "../Constants";
import { User } from "../models/User";
import { deleteImage } from "./firebaseStorageService";
import { checkObjectIdValidity, comparePasswords, hashPassword, savePhotos } from "./helpers/serviceHelpers";
import { ProfileData, Passwords, FriendStatus } from "./types/types";

export const editProfile = async (data: ProfileData, userId: string) => {
    checkObjectIdValidity(userId)

    const user = await User.findById(userId);
    
    if (!user) {
        throw new Error(userNotFoundMessage);
    }
    
    if (!(await comparePasswords(data.password!, user.password))) {
        throw new Error(wrongEmailOrPasswordMessage);
    }

    user.email = data.email
    user.bio = data.bio;
    user.username = data.username;
    await user.save();
    return user.populate(
        'friendRequests.received friendRequests.sent friends', 
        'username profilePicture'
    );
}

export const editPassword = async (passwords: Passwords, userId: string) => {
    checkObjectIdValidity(userId);
    
    const user = await User.findById(userId);
    if (!user) {
        throw new Error(userNotFoundMessage);
    }

    if (!(await comparePasswords(passwords.password, user.password))) {
        throw new Error(wrongEmailOrPasswordMessage)
    }

    if (passwords.newPassword !== passwords.confirmPass){
        throw new Error(passwordsMustMatchMessage);
    }

    user.password = await hashPassword(passwords.newPassword);
    await user.save();
}

export const editProfilePicture = async (profilePicture: string, userId: string) => {
    checkObjectIdValidity(userId);
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePicture}, {new: true}).select('profilePicture');
        if (!updatedUser){
            throw new Error(avatarUpdateFailedMessage);
        }
        return updatedUser;
    } catch (error) {
        console.error(error);
        throw new Error(avatarUpdateFailedMessage);
    }
}

export const toggleFriendshipRequest = async (loggedInUserId: string, otherUserId: string) => {
    checkObjectIdValidity(loggedInUserId, otherUserId);

    if (loggedInUserId === otherUserId) {
        throw new Error(friendshipWithSelfMessage);
    }

    const [loggedInUser, otherUser] = await Promise.all([User.findById(loggedInUserId), User.findById(otherUserId)])

    if (!loggedInUser || !otherUser) {
        throw new Error(userNotFoundMessage);
    }

    if (loggedInUser.friends.includes(otherUserId)){
        throw new Error(alreadyFriendsMessage);
    }

    if (loggedInUser.friendRequests.sent.includes(otherUserId) || loggedInUser.friendRequests.received.includes(otherUserId)) {
         
        const [_, result] = await Promise.all(
            [
                User.updateOne({_id: otherUserId}, {$pull: {'friendRequests.received': loggedInUserId,'friendRequests.sent': loggedInUserId }}),
                User.findByIdAndUpdate(loggedInUserId, {$pull: {'friendRequests.received': otherUserId,'friendRequests.sent': otherUserId }}, {new: true})
                    .select('friendRequests.received friendRequests.sent')
                    .populate('friendRequests.received', 'username profilePicture')
            ]);

            return result;
    } else {
        const [_, result] = await Promise.all(
                [
                    User.updateOne({_id: otherUserId}, {$push: {'friendRequests.received': loggedInUserId}}),
                    User.findByIdAndUpdate(loggedInUserId, {$push: {'friendRequests.sent': otherUserId}}, {new: true})
                        .select('friendRequests.received friendRequests.sent')
                        .populate('friendRequests.received', 'username profilePicture')
                ]
            );

            return result;
    }
}

export const toggleFriendship = async (loggedInUserId: string, otherUserId: string) => {
    checkObjectIdValidity(loggedInUserId, otherUserId);

    if (loggedInUserId === otherUserId) {
        throw new Error(friendshipWithSelfMessage);
    }

    const loggedInUser = await User.findById(loggedInUserId);

    if (!loggedInUser) {
        throw new Error(userNotFoundMessage);
    }

    if (loggedInUser.friends.includes(otherUserId)){
        const [_, result] = await Promise.all([
            User.updateOne({_id: otherUserId}, {$pull: {friends: loggedInUserId}}),
            User.findByIdAndUpdate(loggedInUserId, {$pull: {friends: otherUserId}}, {new: true})
                .select('friendRequests.received friendRequests.sent friends')
                .populate('friendRequests.received friends', 'username profilePicture')
        ]);
        return result;

    } else if (loggedInUser.friendRequests.received.includes(otherUserId)) {
        const [_, result] = await Promise.all(
        [
            User.updateOne({_id: otherUserId}, {$push: {friends: loggedInUserId}, $pull: {'friendRequests.sent': loggedInUserId}}),
            User.findByIdAndUpdate(loggedInUserId, {$push: {friends: otherUserId}, $pull: {'friendRequests.received': otherUserId}}, {new: true})
                .select('friendRequests.received friendRequests.sent friends')
                .populate('friendRequests.received friends', 'username profilePicture')
        ]);
        return result
    }
}

export const toggleFollowUser = async (loggedInUserId: string, otherUserId: string) => {
    checkObjectIdValidity(loggedInUserId, otherUserId);

    if (loggedInUserId === otherUserId) {
        throw new Error(cannotFollowSelfMessage);
    }

    const users = (await User.find({_id: {$in: [loggedInUserId, otherUserId]}}));

    if (users.length !== 2 || !users[0] || !users[1]) {
        throw new Error(userNotFoundMessage);
    }

    const loggedInUser = users.find((user) => user._id!.toString() === loggedInUserId);
    // const otherUser = users.find((user) => user._id!.toString() === otherUserId);

    let result;

    if (loggedInUser!.following.includes(loggedInUserId)) {
        result = await Promise.all([
            User.updateOne({_id: loggedInUserId}, {$pull: {following: otherUserId}}),
            User.updateOne({_id: otherUserId}, {$pull: {followers: loggedInUserId}}),
        ]);
    } else {
        result = await Promise.all([
            User.updateOne({_id: loggedInUserId}, {$push: {following: otherUserId}}),
            User.updateOne({_id: otherUserId}, {$push: {followers: loggedInUserId}}),
        ]);
    }

    if (result[0].modifiedCount === 0 || result[1].modifiedCount === 0) {
        throw new Error(followUnsucessfulMessage);
    }
}

export const uploadPhotos = async (photos: Express.Multer.File[], userId: string) => {
    checkObjectIdValidity(userId);
    if (!photos || photos.length === 0) {
        throw new Error(fileUploadNotFoundMessage);
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new Error(userNotFoundMessage);
    }

    const imageUrls = await savePhotos(photos, userId, 'profile');
    const images = await User.findByIdAndUpdate(userId, { 
        $push: { 
            photos: { 
                $each: imageUrls.map(url => ({ url })) } } }, 
        {new: true})
        .select('photos');
    
    return images;
}

export const fetchPhotos = async (userId: string) => {
    checkObjectIdValidity(userId);

    const user = await User.findById(userId);

    if(!user) {
        throw new Error(userNotFoundMessage);
    }

    return user.photos;
}

export const deletePhoto = async (url: string, userId: string) => {
    checkObjectIdValidity(userId);

    const user = await User.findById(userId);

    if(!user) {
        throw new Error(userNotFoundMessage);
    }
    
    const photos = await User.findByIdAndUpdate(userId, {$pull: {photos: { url }}}, {new: true}).select('photos');
    await deleteImage(url, 'profile');
    return photos;
}

export const fetchProfileData = async (loggedInUserId: string, userId: string ) => {
    checkObjectIdValidity(loggedInUserId, userId);

    const fields = 'username bio profilePicture photos gender friends following followers';
    let user;
    try {
        if (userId === loggedInUserId) {
            user = await User.findById(userId).select(fields + ' friendRequests')
            .populate('friends friendRequests.received', 'username profilePicture');
        } else {
            user = await User.findById(userId).select(fields).populate('friends', 'username profilePicture');
        }
    } catch (error) {
        throw new Error(userNotFoundMessage);
    }
    
    user!.photos.reverse(); // easiest way to get the newest photos first

    return user;
}

export const fetchFriendStatus: (id1: string, id2: string) => Promise<FriendStatus>  = async (loggedInUserId: string, otherUserId: string) => {
    checkObjectIdValidity(loggedInUserId, otherUserId);

    const loggedInUser = await User.findById(loggedInUserId).select('friendRequests friends');

    if (loggedInUser!.friendRequests.received.includes(otherUserId)){
        return 'received';
    } 

    if (loggedInUser!.friendRequests.sent.includes(otherUserId)) {
        return 'sent';
    }
    
    if (loggedInUser!.friends.includes(otherUserId)) {
        return 'friends';
    }
    
    return 'none';
}