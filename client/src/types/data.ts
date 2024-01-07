type BaseData = {
    _id: string;
    text: string;
    likes: {
        likeCount: number;
        userLikes: string[];
    }
    author: {
        _id: string;
        username: string;
        profilePicture: string;
    };
    createdAt: string;
}

export type PostData = BaseData & {
    imageUrls: string[];
    commentCount: number;
};

export type CommentData = BaseData & {
    _postId: string;
}

export type IUserData = {
    _id: string;
    username: string;
    email: string;
    gender: 'male' | 'female'
    role: 'user' | 'admin';
    accessToken: string;
}
