import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUserData } from "../services/types";

export function auth() {
    return function(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        let token = '';

        if (authHeader) {
            token = authHeader.split(' ')[1];
        }

        try {
            const user = validateToken(token);
            req.user = user;
            next();
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(498).json({message: 'Token expired'});
            } else
                return res.status(401).json({message: 'Invalid access token. Please log in'});
        }

    }
}

function validateToken(token: string): IUserData {
    return jwt.verify(token, process.env.JWT_SECRET!) as IUserData;
}