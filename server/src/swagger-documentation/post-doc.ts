const postIdParams = [
    {
        name: 'postId',
        in: 'path',
        required: true,
        description: 'Id of targeted post',
        schema: { type: 'string' },
    },
];

// CREATE POST

const createPostRequestBody = {
    required: true,
    content: {
        'multipart/form-data': {
            schema: {
                type: 'object',
                properties: {
                    text: { type: 'string'},
                    files: {
                        type: 'array',
                        items: {
                            type: 'string',
                            format: 'binary',
                        },
                    },
                },
                required: ['text']
            },
        },
    },
};

const createPostResponses = {
    201: {
        description: 'Successful creation of post',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Post',
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

const createPostOperation = {
    tags: ['post'],
    summary: 'Create a post',
    description: 'Create a new post',
    requestBody: createPostRequestBody,
    responses: createPostResponses,
    security: [{ bearerAuth: [] }],
};

// GET POSTS

const getPostsResponses = {
    200: {
        description: 'Successful retrieval of posts',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        $ref: '#/components/schemas/Post',
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

const getPostsOperation = {
    tags: ['post'],
    summary: 'Get posts',
    description: 'Retrieve posts',
    responses: getPostsResponses,
    security: [{ bearerAuth: [] }],
};

// UPDATE POST

const updatePostRequestBody = {
    required: true,
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    text: { type: 'string' },
                },
                required: ['text'],
            },
        },
    },
};

const updatePostResponses = {
    200: {
        description: 'Successful update of post',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Post',
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

const updatePostOperation = {
    tags: ['post'],
    summary: 'Update a post',
    description: 'Update an existing post',
    parameters: postIdParams,
    requestBody: updatePostRequestBody,
    responses: updatePostResponses,
    security: [{ bearerAuth: [] }],
};

// DELETE POST

const deletePostResponses = {
    200: {
        description: 'Successful deletion of post',
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

const deletePostOperation = {
    tags: ['post'],
    summary: 'Delete a post',
    description: 'Delete a post',
    parameters: postIdParams,
    responses: deletePostResponses,
    security: [{ bearerAuth: [] }],
};

// LIKE POST

const likePostResponses = {
    200: {
        description: 'Successful like of post',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        likeCount: { type: 'integer' },
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

const likePostOperation = {
    tags: ['post'],
    summary: 'Like a post',
    description: 'Like a post',
    parameters: postIdParams,
    responses: likePostResponses,
    security: [{ bearerAuth: [] }],
};

// EXPORTS

export const PostDoc = {
    '/posts': {
        get: getPostsOperation,
        post: createPostOperation,
    },
    '/posts/{postId}': {
        put: updatePostOperation,
        delete: deletePostOperation,
    },
    '/posts/{postId}/like': {
        post: likePostOperation,
    },
};
