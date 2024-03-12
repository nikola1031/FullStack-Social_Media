import { MulterError } from 'multer';
import { accountExistsValidationMessage } from '../Constants';

interface MongoValidationError extends Error {
    name: 'ValidationError';
    errors: {
        [key: string]: {
            properties: {
                message: string;
                value: string;
                // omitting other properties, since I won't be using them
            };
        };
    };
}

export function errorHandler(error: any) {
    if (error.code === 11000) {
        return { message: accountExistsValidationMessage };
    }

    if (error.name === 'ValidationError') {
        const mongoValidationError = error as MongoValidationError;
        const errors = Object.values(mongoValidationError.errors).map(
            (err) => err.properties.message
        );
        return { message: errors[0] };
    }

    return { message: error.message };
}
