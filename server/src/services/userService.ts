import { User } from "../models/User";
import { comparePasswords, hashPassword } from "./helpers/serviceHelpers";
import { ProfileData, EmailAndPassword, Passwords } from "./types/types";

function hasEmailAndPassword(data: any): data is EmailAndPassword {
    return data && typeof data.email === 'string' && typeof data.password === 'string';
}

export const editProfile = async (data: ProfileData, userId: string) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    if (hasEmailAndPassword(data) && !(await comparePasswords(data.password, user.password))) {
        throw new Error('Incorrect password');
    }

    if (hasEmailAndPassword(data)) {
        user.email = data.email;
    }
    data.bio ? user.bio = data.bio : null;
    data.username ? user.username = data.username : null;

    await user.save();
    return user;
}

export const editPassword = async (passwords: Passwords, userId: string) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    if (!(await comparePasswords(passwords.password, user.password))) {
        throw new Error('Incorrect password')
    }

    if (passwords.newPassword !== passwords.confirmPass){
        throw new Error('Passwords must match');
    }

    user.password = await hashPassword(passwords.newPassword);
    await user.save();
}