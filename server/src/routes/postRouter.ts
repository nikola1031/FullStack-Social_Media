import { Router } from 'express';
import * as postController from '../controllers/postController';
import { onlyAuthors, onlyUsers } from '../middlewares/routeGuard';
import { Post } from '../models/Post';
const router = Router();

router.post('/', onlyUsers(), postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/user/:userId', postController.getPostsByUserId);
router.put('/:postId', onlyAuthors(Post), postController.updatePost);
router.delete('/:postId', onlyAuthors(Post), postController.deletePost);
router.post('/:postId/like', onlyUsers(), postController.likePost);

export default router;
