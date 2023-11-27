import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import { comparePasswords, hashPassword } from './helpers/serviceHelpers';

const SECRET = process.env.JWT_SECRET;

async function login(email: string, password: string) {
    
    const existingUser = await User.findOne({email});

    if (!existingUser || !(await comparePasswords(password, existingUser.password))){
        throw new Error('Wrong email or password');
    }

    const accessToken = jwt.sign({email, username: existingUser.username, _id: existingUser._id, role: existingUser.role}, SECRET!, {expiresIn: '2h'});
    return { email, username: existingUser.username, _id: existingUser._id, role: existingUser.role, accessToken };
}

async function register(email: string, username: string, password: string) {
    const oldUser = await User.findOne({email, username});
    
    if (oldUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({email, username, password: hashedPassword});

    const accessToken = jwt.sign({email, username, _id: user._id, role: user.role}, SECRET!, {expiresIn: '2h'});
    return { email, username, role: user.role, _id: user._id, accessToken };
}

function logout() {}

export { login, register, logout };
