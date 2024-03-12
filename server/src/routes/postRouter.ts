import { Router } from 'express';
import * as postController from '../controllers/postController';
import { onlyAuthors, onlyUsers } from '../middlewares/routeGuard';
import { Post } from '../models/Post';
import { multerUpload } from '../middlewares/multer';

const router = Router();

router.post('/', onlyUsers(), multerUpload(), postController.createPost);
router.get('/', onlyUsers(), postController.getPosts);
router.get('/user/:userId', postController.getPosts);
router.put('/:postId', onlyAuthors(Post), postController.updatePost);
router.delete('/:postId', onlyAuthors(Post), postController.deletePost);
router.post('/:postId/like', onlyUsers(), postController.likePost);

export default router;
