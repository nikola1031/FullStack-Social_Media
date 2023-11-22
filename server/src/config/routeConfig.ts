import { Application } from 'express';
import { router as userController } from '../controllers/userController';

export function initRoutes(app: Application) {
    app.use('/auth', userController);
}
