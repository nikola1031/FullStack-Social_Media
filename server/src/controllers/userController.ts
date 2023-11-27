import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { trimmer } from '../utils/trimmer';

export const updateProfile = async (req: Request, res: Response) => {
    const trimmedBody = trimmer(req.body);
    const { username, email, password, bio } = trimmedBody;
    const data = { username, email, password, bio };

    try {
        const user = await userService.editProfile(data, req.user!._id);
        return res.status(200).json(user);
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