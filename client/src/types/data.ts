type BaseData = {
    _id: string;
    text: string;
    likes: {
        userLikes: string[];
    };
    author: {
        _id: string;
        username: string;
        profilePicture: string;
    };
    createdAt: string;
};

export type PostData = BaseData & {
    imageUrls: string[];
    commentCount: number;
};

export type CommentData = BaseData & {
    _postId: string;
};

export type Friend = {
    _id: string;
    username: string;
    profilePicture: string;
}

export type FriendRequests = {
    received: Friend[]
    sent: string[]
}

export type LoggedInUserData = {
    _id: string;
    username: string;
    email: string;
    gender: 'male' | 'female';
    role: 'user' | 'admin';
    accessToken: string;
    profilePicture: string;
};

export type Image = {
    _id: string;
    url: string;
    dateAdded: string;
}

export type UserData = {
    _id: string;
    username: string;
    bio: string;
    profilePicture: string;
    photos: Image[];
    gender: 'male' | 'female';
    friendRequests: FriendRequests;
    friends: Friend[];
    following: string[];
    followers: string[];
};

export type UserDataDTO = {
    username: string;
    bio: string;
    email: string;
    password: string;
}

export type LoginDetails = {
    email: string;
    password: string;
}

export type RegisterDetails = LoginDetails & {
    username: string;
    gender: string;
    confirmPass?: string;
}

export type ProfileContextType = {
    setUser: React.Dispatch<React.SetStateAction<UserData>>
    toggleFriendship: (id: string) => void;
    friendRequest: (id: string) => void;
    isProfileOwner: boolean;
    user: UserData;
}

export type Passwords = {
    password: string;
    newPassword: string;
    confirmPass: string;
}

export enum FriendStatusEnum {
    Friend = 'friends',
    Sent = 'sent',
    Received = 'received',
    None = 'none',
}

export type FriendStatus = 'friends' | 'sent' | 'received' | 'none';