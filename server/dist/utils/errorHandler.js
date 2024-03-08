"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const multer_1 = require("multer");
const Constants_1 = require("../Constants");
function errorHandler() {
    return function (error, req, res) {
        console.log(' This is the error');
        if (error instanceof multer_1.MulterError) {
            return res.status(400).json({ message: error.message });
        }
        if (error.code === 11000) {
            return res.status(400).json({ message: Constants_1.accountExistsValidationMessage });
        }
        if (error.name === 'ValidationError') {
            const mongoValidationError = error;
            const errors = Object.values(mongoValidationError.errors).map((err) => err.properties.message);
            return res.status(400).json({ message: errors[0] });
        }
        return res.status(400).json({ message: error.message });
    };
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map