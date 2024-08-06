const profileIdParams = [
    {
        name: 'userId',
        in: 'path',
        required: true,
        description: 'Id of the user profile',
        schema: { type: 'string' },
    },
];

// GET PROFILE

const getProfileResponses = {
    200: {
        description: 'Successful retrieval of user profile',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/UserProfile',
                },
            },
        },
    },
    404: {
        description: 'User profile not found',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Error',
                },
            },
        },
    },
};

const getProfileOperation = {
    tags: ['user'],
    summary: 'Get user profile',
    description: 'Retrieve user profile data',
    parameters: profileIdParams,
    responses: getProfileResponses,
    security: [{ bearerAuth: [] }],
};

// GET FRIEND STATUS

const getFriendStatusResponses = {
    200: {
        description: 'Successful retrieval of friend status',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/FriendStatus',
                },
            },
        },
    },
    400: {
        description: 'Bad request',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Error',
                },
            },
        },
    },
};

const getFriendStatusOperation = {
    tags: ['user'],
    summary: 'Get friend status',
    description: 'Retrieve the friend status between two users',
    parameters: profileIdParams,
    responses: getFriendStatusResponses,
    security: [{ bearerAuth: [] }],
};

// UPDATE PROFILE

const updateProfileRequestBody = {
    required: true,
    content: {
        'application/json': {
            schema: {
                $ref: '#/components/schemas/UserProfileUpdate',
            },
        },
    },
};

const updateProfileResponses = {
    200: {
        description: 'Successful update of user profile',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/UserProfile',
                },
            },
        },
    },
    400: {
        description: 'Bad request',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Error',
                },
            },
        },
    },
};

const updateProfileOperation = {
    tags: ['user'],
    summary: 'Update user profile',
    description: 'Update user profile data',
    requestBody: updateProfileRequestBody,
    responses: updateProfileResponses,
    security: [{ bearerAuth: [] }],
};

// UPDATE PASSWORD

const updatePasswordRequestBody = {
    required: true,
    content: {
        'application/json': {
            schema: {
                $ref: '#/components/schemas/PasswordUpdate',
            },
        },
    },
};

const updatePasswordResponses = {
    200: {
        description: 'Successful update of user password',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Success',
                },
            },
        },
    },
    400: {
        description: 'Bad request',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Error',
                },
            },
        },
    },
};

const updatePasswordOperation = {
    tags: ['user'],
    summary: 'Update user password',
    description: 'Update user password',
    requestBody: updatePasswordRequestBody,
    responses: updatePasswordResponses,
    security: [{ bearerAuth: [] }],
};

// UPDATE PROFILE PICTURE

const updateProfilePictureRequestBody = {
    required: true,
    content: {
        'multipart/form-data': {
            schema: {
                type: 'object',
                properties: {
                    profilePicture: { type: 'string', format: 'binary' },
                },
            },
        },
    },
};

const updateProfilePictureResponses = {
    200: {
        description: 'Successful update of user profile picture',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/UserProfile',
                },
            },
        },
    },
    400: {
        description: 'Bad request',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Error',
                },
            },
        },
    },
};

const updateProfilePictureOperation = {
    tags: ['user'],
    summary: 'Update user profile picture',
    description: 'Update user profile picture',
    requestBody: updateProfilePictureRequestBody,
    responses: updateProfilePictureResponses,
    security: [{ bearerAuth: [] }],
};

// POST PHOTOS
const postPhotosRequestBody = {
    required: true,
    content: {
        'multipart/form-data': {
            schema: {
                type: 'object',
                properties: {
                    files: {
                        type: 'array',
                        items: {
                            type: 'string',
                            format: 'binary',
                        },
                    },
                },
            },
        },
    },
};

const postPhotosResponses = {
    200: {
        description: 'Successful upload of photos',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        $ref: '#/components/schemas/Photo',
                    },
                },
            },
        },
    },
    400: {
        description: 'Bad request',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Error',
                },
            },
        },
    },
};

const postPhotosOperation = {
    tags: ['user'],
    summary: 'Post photos',
    description: 'Upload photos for the user',
    requestBody: postPhotosRequestBody,
    responses: postPhotosResponses,
    security: [{ bearerAuth: [] }],
};

// DELETE PHOTO
const deletePhotoRequestBody = {
    required: true,
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    url: { type: 'string' },
                },
                required: ['url'],
            },
        },
    },
};

const deletePhotoResponses = {
    200: {
        description: 'Successful deletion of photo',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        $ref: '#/components/schemas/Photo',
                    },
                },
            },
        },
    },
    400: {
        description: 'Bad request',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Error',
                },
            },
        },
    },
};

const deletePhotoOperation = {
    tags: ['user'],
    summary: 'Delete photo',
    description: 'Delete a photo of the user',
    requestBody: deletePhotoRequestBody,
    responses: deletePhotoResponses,
    security: [{ bearerAuth: [] }],
};

// GET USER PHOTOS

const getUserPhotosResponses = {
    200: {
        description: 'Successful retrieval of user photos',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        $ref: '#/components/schemas/Photo',
                    },
                },
            },
        },
    },
    400: {
        description: 'Bad request',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Error',
                },
            },
        },
    },
};

const getUserPhotosOperation = {
    tags: ['user'],
    summary: 'Get user photos',
    description: 'Retrieve photos of the user',
    parameters: profileIdParams,
    responses: getUserPhotosResponses,
    security: [{ bearerAuth: [] }],
};

// TOGGLE SEND FRIEND REQUEST

const toggleSendFriendRequestResponses = {
    200: {
        description: 'Successful toggle of send friend request',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/UserProfile',
                },
            },
        },
    },
    400: {
        description: 'Bad request',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    },
                },
            },
        },
    },
};

const toggleSendFriendRequestOperation = {
    tags: ['user'],
    summary: 'Toggle send friend request',
    description: 'Send or cancel a friend request to a user',
    parameters: profileIdParams,
    responses: toggleSendFriendRequestResponses,
    security: [{ bearerAuth: [] }],
};

// TOGGLE ADD FRIEND

const toggleAddFriendResponses = {
    200: {
        description: 'Successful toggle of add friend',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/UserProfile',
                },
            },
        },
    },
    400: {
        description: 'Bad request',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    },
                },
            },
        },
    },
};

const toggleAddFriendOperation = {
    tags: ['user'],
    summary: 'Toggle add friend',
    description: 'Add or remove a user as a friend',
    parameters: profileIdParams,
    responses: toggleAddFriendResponses,
    security: [{ bearerAuth: [] }],
};

export const UserDoc = {
    '/users/profile/{userId}': {
        get: getProfileOperation,
    },
    '/users/profile': {
        put: updateProfileOperation,
    },
    '/users/profile/photos': {
        post: postPhotosOperation,
        delete: deletePhotoOperation,
    },
    '/users/profile/{userId}/photos': {
        get: getUserPhotosOperation,
    },
    '/users/profile/picture': {
        put: updateProfilePictureOperation,
    },
    '/users/friend/{userId}/status': {
        get: getFriendStatusOperation,
    },
    '/users/profile/password': {
        put: updatePasswordOperation,
    },
    '/users/friend/{userId}/request': {
        post: toggleSendFriendRequestOperation,
    },
    '/users/friend/{userId}': {
        post: toggleAddFriendOperation,
    },
    /*     '/users/toggle-follow/{userId}': {
        post: toggleFollowOperation,
    }, */
};
