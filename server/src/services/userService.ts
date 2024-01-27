import { User } from "../models/User";
import { comparePasswords, hashPassword, savePhotos } from "./helpers/serviceHelpers";
import { ProfileData, EmailAndPassword, Passwords } from "./types/types";

function hasEmailAndPassword(data: any): data is EmailAndPassword {
    return data && typeof data.email === 'string' && typeof data.password === 'string';
}

export const editProfile = async (data: ProfileData, userId: string) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    if (hasEmailAndPassword(data) && !(await comparePasswords(data.password, user.password))) {
        throw new Error('Incorrect password');
    }

    if (hasEmailAndPassword(data)) {
        user.email = data.email;
    }
    data.bio ? user.bio = data.bio : null;
    data.username ? user.username = data.username : null;

    await user.save();
    return user;
}

export const editPassword = async (passwords: Passwords, userId: string) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    if (!(await comparePasswords(passwords.password, user.password))) {
        throw new Error('Incorrect password')
    }

    if (passwords.newPassword !== passwords.confirmPass){
        throw new Error('Passwords must match');
    }

    user.password = await hashPassword(passwords.newPassword);
    await user.save();
}

export const editProfilePicture = async (profilePicture: string, userId: string) => {
    const updatedUser = await User.findByIdAndUpdate(userId, {profilePicture}, {new: true}).select('profilePicture');
    if (!updatedUser) {
        throw new Error('Profile picture update failed. Invalid user');
    }
    return updatedUser;
}

export const toggleFriendshipRequest = async (userId: string, otherUserId: string) => {
    let result; 

    if (userId === otherUserId) {
        throw new Error('Cannot request friendship with self');
    }

    const [user, otherUser] = await Promise.all([User.findById(userId), User.findById(otherUserId)])

    if (!user || !otherUser) {
        throw new Error('User not found');
    }

    if (user.friends.includes(otherUserId)){
        throw new Error('Users are already friends');
    }

    if (otherUser.friendRequests.includes(userId) || user.friendRequests.includes(otherUserId)) {
        result = await Promise.all(
            [
                User.updateOne({_id: otherUserId}, {$pull: {friendRequests: userId}}),
                User.updateOne({_id: otherUserId}, {$pull: {friendRequests: userId}})
            ]);
    } else {
        result = await User.updateOne({_id: otherUserId}, {$push: {friendRequests: userId}});
    }

  /*   if (result[0].matchedCount === 0) {
        throw new Error('User not found');
    }

    if (result.modifiedCount === 0) {
        throw new Error('Friend request not added');
    } */
}

// export const removeFriendshipRequest = async (userId: string, otherUserId: string) => {
//     const result = await User.updateOne({_id: userId}, {$pull: {friendRequests: otherUserId}});
//     if (result.modifiedCount !== 1) {
//         throw new Error('Remove friendship request operation had no effect. Perform database integrity check')
//     }
// }

export const toggleFriendship = async (userId: string, otherUserId: string) => {
    let result;
    
    if (userId === otherUserId) {
        throw new Error('Cannot befriend self');
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new Error('User not found');
    }

    if (user.friends.includes(otherUserId)){
        result = await Promise.all([
            User.updateOne({_id: userId}, {$pull: {friends: otherUserId}}),
            User.updateOne({_id: otherUserId}, {$pull: {friends: userId}}),
        ]);
    } else {
        if (!user.friendRequests.includes(otherUserId)) {
            throw new Error('Friend request must be sent before accepting');
        }
        result = await Promise.all([
            User.updateOne({_id: userId}, {$push: {friends: otherUserId}, $pull: {friendRequests: otherUserId}}),
            User.updateOne({_id: otherUserId}, {$push: {friends: userId}}),
        ]);
    }

    if (result[0].modifiedCount === 0 || result[1].modifiedCount === 0) {
        throw new Error('Add/Remove friend operation had no effect. Perform database integrity check');
    }
}

export const toggleFollowUser = async (userId: string, otherUserId: string) => {
    if (userId === otherUserId) {
        throw new Error('Can\'t follow self');
    }

    const users = (await User.find({_id: {$in: [userId, otherUserId]}}));

    if (users.length !== 2 || !users[0] || !users[1]) {
        throw new Error('One or more of requested users not found');
    }

    const user = users.find((user) => user._id!.toString() === userId);
    const otherUser = users.find((user) => user._id!.toString() === otherUserId);

    let result;

    if (user!.following.includes(userId)) {
        result = await Promise.all([
            User.updateOne({_id: userId}, {$pull: {following: otherUserId}}),
            User.updateOne({_id: otherUserId}, {$pull: {followers: userId}}),
        ]);
    } else {
        result = await Promise.all([
            User.updateOne({_id: userId}, {$push: {following: otherUserId}}),
            User.updateOne({_id: otherUserId}, {$push: {followers: userId}}),
        ]);
    }

    if (result[0].modifiedCount === 0 || result[1].modifiedCount === 0) {
        throw new Error('Follow operation had no effect. Perform database integrity check');
    }
}

export const uploadPhotos = async (photos: Express.Multer.File[], userId: string) => {
    const imageUrls = await savePhotos(photos, userId);
    const images = await User.findByIdAndUpdate(userId, { 
        $push: { 
            photos: { 
                $each: imageUrls.map(url => ({ url })) } } }, 
        {new: true}).select('photos');
    
    return images;
}

export const fetchPhotos = async (userId: string) => {
    return await User.findById(userId).select('photos');
}

export const deletePhoto = async (url: string, userId: string) => {
    return await User.findByIdAndUpdate(userId, {$pull: {photos: { url }}}, {new: true}).select('photos');
}

export const fetchProfileData = async (userId: string, loggedInUserId: string) => {
    const fields = `username bio profilePicture photos gender friendRequests friends following followers`;

    if (userId === loggedInUserId) {
        return await User.findById(userId).select(`${fields}`)
        .populate('friends friendRequests', 'username profilePicture');
    } else {
        return await User.findById(userId).select(fields).populate('friends friendRequests', 'username profilePicture');
    }
}