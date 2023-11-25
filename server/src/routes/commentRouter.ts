import { Router } from "express";
import * as commentController from "../controllers/commentController";
import { onlyAuthors, onlyUsers } from "../middlewares/routeGuard";
import { Comment } from "../models/Comment";
const router = Router({mergeParams: true});

router.post('/', onlyUsers(), commentController.createComment);
router.get('/', commentController.getAllComments);
router.put('/:commentId', onlyAuthors(Comment), commentController.updateComment);
router.delete('/:commentId', onlyAuthors(Comment), commentController.deleteComment);
router.post('/:commentId/like', onlyUsers(), commentController.likeComment);

export default router;