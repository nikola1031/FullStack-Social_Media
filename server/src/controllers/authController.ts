import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { trimmer } from '../utils/trimmer';

export const login = async (req: Request, res: Response) => {
    const trimmedBody = trimmer(req.body);
    const { email, password } = trimmedBody;
    try {
        if (!email || !password) {
            throw new Error('All fields are required');
        }

        const user = await authService.login(email.toLocaleLowerCase(), password);
        res.status(200).json(user);
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }

}

export const register = async (req: Request, res: Response) => {
    const trimmedBody = trimmer(req.body);
    const { email, username, password, confirmPass, gender } = trimmedBody;
    
    try {
        if (!email || !username || !password || !confirmPass || !gender) {
            throw new Error('All fields are required');
        }

        if (password !== confirmPass) {
            throw new Error('Passwords must match');
        }

        const user = await authService.register(email.toLocaleLowerCase(), username, password, gender);
        res.status(201).json(user);
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}

export const logout = async (req: Request, res: Response) => {

}