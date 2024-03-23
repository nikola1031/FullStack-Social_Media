"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const Constants_1 = require("../Constants");
function errorHandler(error) {
    if (error.code === 11000) {
        return { message: Constants_1.accountExistsValidationMessage };
    }
    if (error.name === 'ValidationError') {
        const mongoValidationError = error;
        const errors = Object.values(mongoValidationError.errors).map((err) => err.properties.message);
        return { message: errors[0] };
    }
    return { message: error.message };
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map