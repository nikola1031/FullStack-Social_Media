import { Router } from 'express';
import * as authController from '../controllers/authController';
import { onlyGuests, onlyUsers } from '../middlewares/routeGuard';
const router = Router();

router.post('/login', onlyGuests(), authController.login);
router.post('/register', onlyGuests(), authController.register);
router.post('/logout', onlyUsers(), authController.logout);

export default router;
