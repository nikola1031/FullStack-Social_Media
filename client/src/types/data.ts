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

export type Friend = {
    _id: string;
    username: string;
    profilePicture: string;
}

export type PostData = BaseData & {
    imageUrls: string[];
    commentCount: number;
};

export type CommentData = BaseData & {
    _postId: string;
};

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
    friendRequests: Friend[];
    friends: Friend[];
    following: string[];
    followers: string[];
};
