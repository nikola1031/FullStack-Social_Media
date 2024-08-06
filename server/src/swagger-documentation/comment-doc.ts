const postIdParams = [
    {
        name: 'postId',
        in: 'path',
        required: true,
        description: 'Id of targeted post',
        schema: { type: 'string' },
    },
];

const commentIdParams = [
    {
        name: 'commentId',
        in: 'path',
        required: true,
        description: 'Id of targeted comment',
        schema: { type: 'string' },
    },
];

// CREATE COMMENT

const createCommentRequestBody = {
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

const createCommentResponses = {
    201: {
        description: 'Successful creation of comment',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Comment',
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

const createCommentOperation = {
    tags: ['comment'],
    summary: 'Create a comment',
    description: 'Create a new comment for a post',
    parameters: postIdParams,
    requestBody: createCommentRequestBody,
    responses: createCommentResponses,
    security: [{bearerAuth: []}]

};

// GET ALL COMMENTS

const getAllCommentsResponses = {
    200: {
        description: 'Successful retrieval of comments',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        $ref: '#/components/schemas/Comment',
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

const getAllCommentsOperation = {
    tags: ['comment'],
    summary: 'Get all comments',
    description: 'Retrieve all comments for a post',
    parameters: postIdParams,
    responses: getAllCommentsResponses,
    security: [{bearerAuth: []}]

};

// DELETE COMMENT

const deleteCommentResponses = {
    200: {
        description: 'Successful deletion of comment',
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
}

const deleteCommentOperation = {
    tags: ['comment'],
    summary: 'Delete a comment',
    description: 'Delete a comment for a post',
    parameters: [...postIdParams, ...commentIdParams],
    responses: deleteCommentResponses,
    security: [{bearerAuth: []}]

};

// UPDATE COMMENT

const updateCommentRequestBody = {
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

const updateCommentResponses = {
    200: {
        description: 'Successful update of comment',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Comment',
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
}

const updateCommentOperation = {
    tags: ['comment'],
    summary: 'Update a comment',
    description: 'Update an existing comment for a post',
    parameters: [...postIdParams, ...commentIdParams],
    requestBody: updateCommentRequestBody,
    responses: updateCommentResponses,
    security: [{bearerAuth: []}]

};

// LIKE COMMENT

const likeCommentResponses = {
    200: {
        description: 'Successful like of comment',
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
}

const likeCommentOperation = {
    tags: ['comment'],
    summary: 'Like a comment',
    description: 'Like a comment for a post',
    parameters: [...postIdParams, ...commentIdParams],
    responses: likeCommentResponses,
    security: [{bearerAuth: []}]
};

// EXPORTS

export const CommentDoc = {
    '/posts/{postId}/comments': {
        get: getAllCommentsOperation,
        post: createCommentOperation,
    },
    '/posts/{postId}/comments/{commentId}': {
        put: updateCommentOperation,
        delete: deleteCommentOperation,
    },
    '/posts/{postId}/comments/{commentId}/like': {
        post: likeCommentOperation,
    }
};
