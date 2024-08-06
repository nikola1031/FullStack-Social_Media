import { Schemas } from "./swagger-schemas";
import { AuthDoc } from "./auth-doc";
import { CommentDoc } from "./comment-doc";
import { PostDoc } from "./post-doc";
import { UserDoc } from "./user-doc";

export const apiDoc = {
    openapi: '3.0.0',
    info: {
        title: 'Swagger Gather Grid',
        version: '1.0.0',
        description: 'This is documentation for the Gather Grid social media server',
    },
    license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
    },
    servers: [
        {
            url: 'http://localhost:3000/api',
            description: 'Development server',
        },
        {
            url: 'https://gather-grid-api.onrender.com/api',
            description: 'Production server',
        },
    ],
    tags: [
        { name: 'comment', description: 'Endpoints related to comments' },
        { name: 'post', description: 'Endpoints related to posts' },
        { name: 'user', description: 'Endpoints related to users' },
        { name: 'auth', description: 'Endpoints related to authentication' },
    ],
    paths: {
        ...AuthDoc,
        ...CommentDoc,
        ...PostDoc,
        ...UserDoc,
    },
    components: {
        schemas: Schemas,
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
};