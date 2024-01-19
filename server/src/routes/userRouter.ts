import { Router } from 'express';
import * as userController from '../controllers/userController';
import { onlyUsers } from '../middlewares/routeGuard';
const router = Router();

router.put('/profile/', onlyUsers(), userController.updateProfile);
router.post('/profile/photos', onlyUsers(), userController.postPhotos);
router.delete('/profile/photos/', onlyUsers(), userController.deletePhoto)
router.put('/profile/picture', onlyUsers(), userController.updateProfilePicture);
router.put('/profile/password', onlyUsers(), userController.updatePassword);
router.get('/profile/:userId', onlyUsers(), userController.getProfile);
router.get('/profile/:userId/photos', userController.updateProfile);
router.post('/friend/:userId/request', onlyUsers(), userController.toggleSendFriendRequest);
router.post('/friend/:userId/request/deny', onlyUsers(), userController.denyFriendRequest);
router.post('/friend/:userId/confirm', onlyUsers(), userController.toggleAddFriend);
router.post('/follow/:userId', onlyUsers(), userController.toggleFollow);

export default router;