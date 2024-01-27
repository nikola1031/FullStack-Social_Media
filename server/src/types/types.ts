export interface IUserData {
    username: string;
    email: string;
    _id: string;
    gender: 'male' | 'female'
    role: 'user' | 'admin';
    profilePicture: string;
    accessToken: string;
}