import { Router } from 'express';
import * as userController from '../controllers/userController';
import { onlyUsers } from '../middlewares/routeGuard';
import { multerUpload } from '../middlewares/multer';
const router = Router();

router.put('/profile/', onlyUsers(), userController.updateProfile);
router.post('/profile/photos', onlyUsers(), multerUpload(), userController.postPhotos);
router.delete('/profile/photos/', onlyUsers(), userController.deletePhoto);
router.put('/profile/picture', onlyUsers(), userController.updateProfilePicture);
router.put('/profile/password', onlyUsers(), userController.updatePassword);
router.get('/profile/:userId/photos', userController.getUserPhotos);
router.get('/profile/:userId', onlyUsers(), userController.getProfile);
router.get('/friend/:userId/status', onlyUsers(), userController.getFriendStatus);
router.post('/friend/:userId/request', onlyUsers(), userController.toggleSendFriendRequest);
router.post('/friend/:userId', onlyUsers(), userController.toggleAddFriend);
router.post('/follow/:userId', onlyUsers(), userController.toggleFollow);

export default router;