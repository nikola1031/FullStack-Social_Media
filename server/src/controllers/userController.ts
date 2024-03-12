import { NextFunction, Request, Response } from 'express';
import * as userService from '../services/userService';
import { trimmer } from '../utils/helpers';
import { errorHandler } from '../utils/errorHandler';
import { fileUploadNotFoundMessage, passwordUpdateSuccessMessage, userFollowSuccess } from '../Constants';

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    const loggedInUserId = req.user!._id;
    const { userId } = req.params;
    try {
        const userData = await userService.fetchProfileData(loggedInUserId, userId);
        res.status(200).json(userData);
    } catch (error: any) {
        res.status(404).json(errorHandler(error));
    }
};

export const getFriendStatus = async (req: Request, res: Response, next: NextFunction) => {
    const loggedInUserId = req.user!._id;
    const { userId } = req.params;
    try {
        const result = await userService.fetchFriendStatus(loggedInUserId, userId);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json(errorHandler(error));
    }
}

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    const trimmedBody = trimmer(req.body);
    const { username, email, password, bio } = trimmedBody;
    const data = { username, email, password, bio };

    try {
        const user = await userService.editProfile(data, req.user!._id);
        return res.status(200).json(user.toObject());
    } catch (error: any) {        
        res.status(400).json(errorHandler(error))
    }
};

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    const trimmedBody = trimmer(req.body);
    const { password, newPassword, confirmPass } = trimmedBody;
    const data = { password, newPassword, confirmPass };

    try {
        await userService.editPassword(data, req.user!._id);
        res.status(200).json({message: passwordUpdateSuccessMessage})
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}

export const updateProfilePicture = async (req: Request, res: Response, next: NextFunction) => {
    const { profilePicture } = req.body;
    try {
        if (!profilePicture) {
            return res.status(400).json({message: fileUploadNotFoundMessage});
        }
        const user = await userService.editProfilePicture(profilePicture, req.user!._id)
        res.status(200).json(user);
    } catch (error: any) {
        res.status(400).json(errorHandler(error));
    }
}

export const postPhotos = async (req: Request, res: Response, next: NextFunction) => {
    const images = (req.files as Express.Multer.File[]) || [];
    try {
        const imageData = await userService.uploadPhotos(images, req.user!._id);
        res.status(200).json(imageData);
    } catch (error: any) {
        res.status(400).json(errorHandler(error));
    }
}

export const deletePhoto = async (req: Request, res: Response, next: NextFunction) => {
    const { url }: { url: string } = req.body;
    try {
        const photos = await userService.deletePhoto(url, req.user!._id);
        res.status(200).json(photos);
    } catch (error: any) {
        res.status(400).json(errorHandler(error));
    }
}

export const getUserPhotos = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    try {
        const photos = await userService.fetchPhotos(userId) || [];
        res.status(200).json(photos);
    } catch (error: any) {
        res.status(400).json(errorHandler(error));
    }
}

export const toggleSendFriendRequest = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const loggedInUserId = req.user!._id;

    try {
        const updatedUser = await userService.toggleFriendshipRequest(loggedInUserId, userId);
        res.status(200).json(updatedUser);
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}

export const toggleAddFriend = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const loggedInUserId = req.user!._id;

    try {
        const updatedUser = await userService.toggleFriendship(loggedInUserId, userId);
        res.status(200).json(updatedUser);
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}

export const toggleFollow = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const loggedInUserId = req.user!._id;
    
    try {
        await userService.toggleFollowUser(loggedInUserId, userId);
        res.status(200).json({message: userFollowSuccess});
    } catch (error: any) {
        res.status(400).json(errorHandler(error));
    }
}

