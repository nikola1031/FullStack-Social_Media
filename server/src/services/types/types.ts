export enum TargetType {
    Post = 'Post',
    Comment = 'Comment',
}

interface BaseProfileData {
    username?: string;  
    bio?: string;
}

export interface EmailAndPassword {
    email: string; 
    password: string;
}

export type ProfileData = BaseProfileData | (BaseProfileData & EmailAndPassword)

export interface Passwords {
    password: string;
    newPassword: string;
    confirmPass: string;
}