const User = {
    type: 'object',
    properties: {
        username: { type: 'string' },
        email: { type: 'string' },
        _id: { type: 'string' },
        gender: { type: 'string' },
        role: { type: 'string' },
        profilePicture: { type: 'string' },
        accessToken: { type: 'string' },
        bio: { type: 'string' },
    },
};

const Friend = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
        username: { type: 'string' },
        profilePicture: { type: 'string' },
    },
};

const FriendStatus = {
    type: 'string',
    enum: ['received', 'sent', 'friends', 'none'],
};

const Photo = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
        url: { type: 'string' },
        dateAdded: { type: 'string' },
    },
};

const FriendRequests = {
    type: 'object',
    properties: {
        received: {
            type: 'array',
            items: Friend,
        },
        sent: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
    },
};

const UserProfile = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
        username: { type: 'string' },
        bio: { type: 'string' },
        profilePicture: { type: 'string' },
        gender: {
            type: 'string',
            enum: ['male', 'female'],
        },
        photos: {
            type: 'array',
            items: Photo,
        },
        friendRequests: FriendRequests,
        friends: {
            type: 'array',
            items: Friend,
        },
        following: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
        followers: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
    },
};

const RegisterData = {
    type: 'object',
    properties: {
        email: { type: 'string' },
        username: { type: 'string' },
        password: { type: 'string' },
        confirmPass: { type: 'string' },
        gender: { type: 'string' },
    },
    required: ['email', 'username', 'password', 'confirmPass', 'gender'],
};

const LoginData = {
    type: 'object',
    properties: {
        email: { type: 'string' },
        password: { type: 'string' },
    },
    required: ['email', 'password'],
};

const Comment = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
        _postId: { type: 'string' },
        text: { type: 'string' },
        likes: {
            type: 'object',
            properties: {
                userLikes: {
                    type: 'array',
                    items: { type: 'string' },
                },
            },
        },
        author: {
            type: 'object',
            properties: {
                _id: { type: 'string' },
                username: { type: 'string' },
                profilePicture: { type: 'string' },
            },
        },
        updatedAt: { type: 'string' },
        createdAt: { type: 'string' },
        __v: { type: 'number', format: 'integer' },
    },
};

const Post = {
    type: 'object',
    properties: {
        _id: { type: 'string' },
        text: { type: 'string' },
        imageUrls: {
            type: 'array',
            items: { type: 'string' },
        },
        commentCount: { type: 'number', format: 'integer' },
        likes: {
            type: 'object',
            properties: {
                userLikes: {
                    type: 'array',
                    items: { type: 'string' },
                },
            },
        },
        author: {
            type: 'object',
            properties: {
                _id: { type: 'string' },
                username: { type: 'string' },
                profilePicture: { type: 'string' },
            },
        },
        updatedAt: { type: 'string' },
        createdAt: { type: 'string' },
        __v: { type: 'number', format: 'integer' },
    },
};

const Error = {
    type: 'object',
    properties: {
        message: { type: 'string' },
    },
};

const Success = {
    type: 'object',
    properties: {
        message: { type: 'string' },
    },
};

export const Schemas = {
    User: User,
    UserProfile: UserProfile,
    RegisterData: RegisterData,
    LoginData: LoginData,
    FriendStatus: FriendStatus,
    Photo: Photo,
    Comment: Comment,
    Post: Post,
    Error: Error,
    Success: Success,
};
