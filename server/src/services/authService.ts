import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import { comparePasswords, hashPassword } from './helpers/serviceHelpers';
import { IUserData } from '../types/types';
const defaultProfilePicture = 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'

const SECRET = process.env.JWT_SECRET;

async function login(email: string, password: string): Promise<IUserData> {
    
    const existingUser = await User.findOne({email});

    if (!existingUser || !(await comparePasswords(password, existingUser.password))){
        throw new Error('Wrong email or password');
    }

    const accessToken = jwt.sign({email, username: existingUser.username, _id: existingUser._id, gender: existingUser.gender, role: existingUser.role}, SECRET!, {expiresIn: '2h'});
    return { email, profilePicture: existingUser.profilePicture || defaultProfilePicture, username: existingUser.username, _id: existingUser._id as string, gender: existingUser.gender, role: existingUser.role, accessToken };
}

async function register(email: string, username: string, password: string, gender: 'male' | 'female'): Promise<IUserData> {
    const oldUser = await User.findOne({email, username});
    
    if (oldUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({email, username, password: hashedPassword, gender});

    const accessToken = jwt.sign({email, username, _id: user._id, role: user.role, gender}, SECRET!, {expiresIn: '2h'});
    return { email, profilePicture: defaultProfilePicture, username, role: user.role, _id: user._id as string, gender, accessToken };
}

function logout() {}

export { login, register, logout };
