export interface IUserData {
    username: string;
    email: string;
    _id: string;
    gender: 'male' | 'female'
    role: 'user' | 'admin';
    profilePicture: string;
    accessToken: string;
    bio: string;
}

export type FirebaseImageDestination = 'profile' | 'avatar' | 'posts';