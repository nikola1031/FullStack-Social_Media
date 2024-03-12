import { NextFunction, Request, Response } from 'express';
import * as authService from '../services/authService';
import { trimmer } from '../utils/helpers';
import { errorHandler } from '../utils/errorHandler';
import { allFieldsRequiredValidationMessage, passwordsMustMatchMessage } from '../Constants';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const trimmedBody = trimmer(req.body);
    const { email, password } = trimmedBody;
    try {
        if (!email || !password) {
            throw new Error(allFieldsRequiredValidationMessage);
        }

        const user = await authService.login(email.toLocaleLowerCase(), password);
        res.status(200).json(user);
    } catch (error: any) {
        res.status(400).json(errorHandler(error));
    }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const trimmedBody = trimmer(req.body);
    const { email, username, password, confirmPass, gender } = trimmedBody;
    try {
        if (!email || !username || !password || !confirmPass || !gender) {
            throw new Error(allFieldsRequiredValidationMessage);
        }

        if (password !== confirmPass) {
            throw new Error(passwordsMustMatchMessage);
        }

        const user = await authService.register(email.toLocaleLowerCase(), username, password, gender);
        res.status(201).json(user);
    } catch (error: any) {
        res.status(400).json(errorHandler(error));
    }
}

export const logout = async (req: Request, res: Response) => {

}