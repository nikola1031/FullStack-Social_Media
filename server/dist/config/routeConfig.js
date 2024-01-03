"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRoutes = void 0;
const authRouter_1 = __importDefault(require("../routes/authRouter"));
const postRouter_1 = __importDefault(require("../routes/postRouter"));
const commentRouter_1 = __importDefault(require("../routes/commentRouter"));
const userRouter_1 = __importDefault(require("../routes/userRouter"));
function initRoutes(app) {
    app.use('/api/auth', authRouter_1.default);
    app.use('/api/users', userRouter_1.default);
    app.use('/api/posts', postRouter_1.default);
    app.use('/api/posts/:postId/comments', commentRouter_1.default);
}
exports.initRoutes = initRoutes;
