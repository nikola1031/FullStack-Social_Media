type BaseEntityData = {
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

export type Post = BaseEntityData & {
    imageUrls: string[];
    commentCount: number;
};

export type Comment = BaseEntityData & {
    _postId: string;
};

export type ServerMessage = {
    message: string;
}

export type LoggedInUserData = {
    _id: string;
    username: string;
    email: string;
    bio: string;
    profilePicture: string;
    gender: 'male' | 'female';
    role: 'user' | 'admin';
    accessToken: string;
};

export type Image = {
    _id: string;
    url: string;
    dateAdded: string;
}

export type UserImages = {
    _id: string;
    photos: Image[];
}

export type UserProfilePicture = {
    _id: string;
    profilePicture: string;
}

export type UserData = {
    _id: string;
    username: string;
    bio: string;
    profilePicture: string;
    gender: 'male' | 'female';
    photos: Image[];
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

export type Friend = {
    _id: string;
    username: string;
    profilePicture: string;
}

export type FriendRequests = {
    received: Friend[];
    sent: string[];
}

export type FriendData = {
    friendRequests: FriendRequests;
    friends: Friend[];
}

export enum FriendStatusEnum {
    Friend = 'friends',
    Sent = 'sent',
    Received = 'received',
    None = 'none',
}

export type FriendStatus = 'friends' | 'sent' | 'received' | 'none';