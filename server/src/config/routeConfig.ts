import { Application } from 'express';
import authRouter from '../routes/authRouter';
import postRouter from '../routes/postRouter';
import commentRouter from '../routes/commentRouter';
import userRouter from '../routes/userRouter';

export function initRoutes(app: Application) {
    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter);
    app.use('/api/posts', postRouter);
    app.use('/api/posts/:postId/comments', commentRouter);
}
