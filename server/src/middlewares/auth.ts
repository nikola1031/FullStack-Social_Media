import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUserData } from "../types/types";

export function auth() {
    return function(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        let token = '';
        if (authHeader) {
            token = authHeader.split(' ')[1];
        }

        try {
            if (token) {
                const user = validateToken(token);
                req.user = user;
            }
            next();
        } catch (error: any) {
            if (error instanceof jwt.TokenExpiredError) {
                return res.status(401).json({message: 'Token expired or is invalid. Please log in'});
            } else {
                return res.status(400).json({message: error.message});
            }
        }
    }
}

function validateToken(token: string): IUserData {
    return jwt.verify(token, process.env.JWT_SECRET!) as IUserData;
}