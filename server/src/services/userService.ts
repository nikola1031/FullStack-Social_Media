import { User } from '../models/User';
import { IUserData } from './types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;
const saltRounds = 10;
const hashPassword = async (password: string) => await bcrypt.hash(password, saltRounds);
const comparePasswords = async (password: string, hash: string) => await bcrypt.compare(password, hash);

async function login({email, password}: IUserData) {
    
    const existingUser = await User.findOne({email});

    if (!existingUser || !(await comparePasswords(password, existingUser.password))){
        throw new Error('Wrong email or password');
    }

    const token = jwt.sign({email, username: existingUser.username, _id: existingUser._id}, SECRET!, {expiresIn: '2h'});
    return { email, username: existingUser.username, _id: existingUser._id, token };
}

async function register({email, username, password}: IUserData) {
    const oldUser = await User.findOne({email, username});
    
    if (oldUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({email, username, password: hashedPassword});

    const token = jwt.sign({email, username, _id: user._id}, SECRET!, {expiresIn: '2h'});
    return { email, username, _id: user._id, token };
}

function logout() {}

export { login, register, logout };
