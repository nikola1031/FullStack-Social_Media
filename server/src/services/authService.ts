import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import { comparePasswords, hashPassword } from './helpers/serviceHelpers';
import { IUserData } from '../types/types';
import { accountExistsValidationMessage, jwtExpirationTime, wrongEmailOrPasswordMessage } from '../Constants';

const SECRET = process.env.JWT_SECRET;

async function login(email: string, password: string): Promise<IUserData> {
    
    const existingUser = await User.findOne({email});

    if (!existingUser || !(await comparePasswords(password, existingUser.password))){
        throw new Error(wrongEmailOrPasswordMessage);
    }

    const userData = {
        email, 
        username: existingUser.username, 
        bio: existingUser.bio, 
        gender: existingUser.gender, 
        role: existingUser.role,
        profilePicture: existingUser.profilePicture || '', 
        _id: existingUser._id as string
    }
    
    const accessToken = jwt.sign(userData, SECRET!, {expiresIn: jwtExpirationTime});
    return { ...userData, accessToken };
}

async function register(email: string, username: string, password: string, gender: 'male' | 'female'): Promise<IUserData> {
    const existingEmail = await User.findOne({email});
    const existingUsername = await User.findOne({username});

    if (existingEmail || existingUsername) {
        throw new Error(accountExistsValidationMessage);
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({email, username, password: hashedPassword, gender});

    const userData = {
        email, 
        username, 
        bio: user.bio, 
        gender: user.gender, 
        role: user.role,
        profilePicture: user.profilePicture || '', 
        _id: user._id as string
    }

    const accessToken = jwt.sign(userData, SECRET!, {expiresIn: jwtExpirationTime});
    return { ...userData, accessToken };
}

function logout() {}

export { login, register, logout };
