export interface IUserData {
    username: string;
    email: string;
    password: string;
    _id: string;
    role: 'user' | 'admin';
    accessToken: string;
}