"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Constants_1 = require("../Constants");
function auth() {
    return function (req, res, next) {
        const authHeader = req.headers.authorization;
        let token = '';
        if (authHeader) {
            token = authHeader.split(' ')[1];
        }
        try {
            if (token) {
                const user = validateToken(token);
                req.user = user;
            }
            next();
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                return res.status(403).json({ message: Constants_1.tokenExpiredMessage });
            }
            else {
                return res.status(400).json({ message: error.message });
            }
        }
    };
}
exports.auth = auth;
function validateToken(token) {
    return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
}
//# sourceMappingURL=auth.js.map