import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { trimmer } from '../utils/trimmer';

export const login = async (req: Request, res: Response) => {
    const trimmedBody = trimmer(req.body);
    const { email, password } = trimmedBody;
    try {
        if (!email || !password) {
            throw new Error('All fields are required');
        }

        const user = await userService.login(email.toLocaleLowerCase(), password);
        res.status(200).json(user);
        console.log('logged in')
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }

}

export const register = async (req: Request, res: Response) => {
    const trimmedBody = trimmer(req.body);
    const { email, username, password, confirmPass } = trimmedBody;
    
    try {
        if (!email || !username || !password || !confirmPass) {
            throw new Error('All fields are required');
        }
        console.log(email, username, password, confirmPass)

        if (password !== confirmPass) {
            throw new Error('Passwords must match');
        }

        const user = await userService.register(email.toLocaleLowerCase(), username, password);
        res.status(201).json(user);
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}

export const logout = async (req: Request, res: Response) => {

}