import { Application } from 'express';
import authRouter from '../routes/authRouter';
import postRouter from '../routes/postRouter';
import commentRouter from '../routes/commentRouter';

export function initRoutes(app: Application) {
    app.use('/api/auth', authRouter);
    app.use('/api/posts', postRouter);
    app.use('/api/posts/:postId/comments', commentRouter);
}
