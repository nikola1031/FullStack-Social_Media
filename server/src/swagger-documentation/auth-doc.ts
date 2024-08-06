// LOGIN

const loginRequestBody = {
    required: true,
    content: {
        'application/json': {
            schema: {
                $ref: '#/components/schemas/LoginData',
            },
        },
    },
};

const loginResponse = {
    200: {
        description: 'Successful login',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/User',
                },
            },
        },
    },
    401: {
        description: 'Unsuccessful login',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Error',
                },
            },
        },
    },
};

const loginOperation = {
    tags: ['auth'],
    summary: 'Log in user',
    description: 'Authenticate user and generate access token',
    requestBody: loginRequestBody,
    responses: loginResponse,
};

// REGISTER

const registerRequestBody = {
    required: true,
    content: {
        'application/json': {
            schema: {
                $ref: '#/components/schemas/RegisterData',
            },
        },
    },
};

const registerResponse = {
    201: {
        description: 'Successful registration',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/User',
                },
            },
        },
    },
    400: {
        description: 'Unsuccessful registration',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/Error',
                },
            },
        },
    },
};

const registerOperation = {
    tags: ['auth'],
    summary: 'Register user',
    description: 'Create a new user account and login user',
    requestBody: registerRequestBody,
    responses: registerResponse,
};

// EXPORTS

export const AuthDoc = {
    '/auth/login': {
        post: loginOperation,
    },
    '/auth/register': {
        post: registerOperation,
    },
};
