import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUserData } from "../services/types";

export function auth() {
    return function(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({message: 'Authorization token missing. Login required'});
        }

        const token = authHeader.split(' ')[1];
        
        try {
            const user = validateToken(token);
            req.user = user;
        } catch (error) {
            return res.status(401).json({message: 'Invalid access token. Please log in'});
        }

        next();
    }
}

function validateToken(token: string): IUserData {
    return jwt.verify(token, process.env.SECRET!) as IUserData;
}