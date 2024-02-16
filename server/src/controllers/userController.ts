import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { trimmer } from '../utils/trimmer';
import { deleteImage } from '../services/firebaseStorageService';

export const getProfile = async (req: Request, res: Response) => {
    const loggedInUserId = req.user!._id;
    const { userId } = req.params;
    try {
        const userData = await userService.fetchProfileData(loggedInUserId, userId);
        res.status(200).json(userData);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
};

export const getFriendStatus = async (req: Request, res: Response) => {
    const loggedInUserId = req.user!._id;
    const { userId } = req.params;
    try {
        const result = await userService.fetchFriendStatus(loggedInUserId, userId);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

export const updateProfile = async (req: Request, res: Response) => {
    const trimmedBody = trimmer(req.body);
    const { username, email, password, bio } = trimmedBody;
    const data = { username, email, password, bio };

    try {
        const user = await userService.editProfile(data, req.user!._id);
        return res.status(200).json(user.toObject());
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
};

export const updatePassword = async (req: Request, res: Response) => {
    const trimmedBody = trimmer(req.body);
    const { password, newPassword, confirmPass } = trimmedBody;
    const data = { password, newPassword, confirmPass };

    try {
        await userService.editPassword(data, req.user!._id);
        res.status(200).json({message: 'Password updated successfully'})
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}

export const updateProfilePicture = async (req: Request, res: Response) => {
    const profilePicture = req.body.profilePicture;
    try {
        if (!profilePicture) {
            return res.status(400).json({message: 'Invalid profile picture format'});
        }
        const user = await userService.editProfilePicture(profilePicture, req.user!._id)
        res.status(200).json(user);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

export const postPhotos = async (req: Request, res: Response) => {
    const images = (req.files as Express.Multer.File[]) || [];
    try {
        const imageData = await userService.uploadPhotos(images, req.user!._id);
        res.status(200).json(imageData);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

export const deletePhoto = async (req: Request, res: Response) => {
    const { url } = req.body;
    try {
        const [_, photos] = await Promise.all([deleteImage(url), userService.deletePhoto(url, req.user!._id)])
        res.status(200).json(photos);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

export const getUserPhotos = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const photos = await userService.fetchPhotos(userId) || [];
        res.status(200).json(photos);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

export const toggleSendFriendRequest = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const loggedInUserId = req.user!._id;

    try {
        const updatedUser = await userService.toggleFriendshipRequest(loggedInUserId, userId);
        res.status(200).json(updatedUser);
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}

export const toggleAddFriend = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const loggedInUserId = req.user!._id;

    try {
        const updatedUser = await userService.toggleFriendship(loggedInUserId, userId);
        res.status(200).json(updatedUser);
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}

export const toggleFollow = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const loggedInUserId = req.user!._id;
    
    try {
        await userService.toggleFollowUser(loggedInUserId, userId);
        res.status(200).json({message: 'User followed successfully'});
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}

