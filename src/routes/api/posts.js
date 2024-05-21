import express from 'express';
const router = express.Router();
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { validate } from '../../middlewares/handleValidations.js';
import {
  createPostValidation,
  validateComment,
} from '../../middlewares/postValidations.js';

import {
  createPost,
  getPostById,
  getPosts,
  deletePost,
  likePost,
  unlikePost,
  commentPost,
  deleteComment,
} from '../../controllers/postController.js';

router.post(
  '/new',
  authMiddleware,
  createPostValidation(),
  validate,
  (req, res) => {
    return createPost(req, res);
  }
);
router.get('/', authMiddleware, (req, res) => {
  return getPosts(req, res);
});
router.get('/:post_id', authMiddleware, (req, res) => {
  return getPostById(req, res);
});
router.delete('/:post_id', authMiddleware, (req, res) => {
  return deletePost(req, res);
});
router.put('/like/:post_id', authMiddleware, (req, res) => {
  return likePost(req, res);
});
router.put('/unlike/:post_id', authMiddleware, (req, res) => {
  return unlikePost(req, res);
});
router.post(
  '/comment/:post_id',
  authMiddleware,
  validateComment(),
  validate,
  (req, res) => {
    return commentPost(req, res);
  }
);
router.delete('/comment/:post_id/:comment_id', authMiddleware, (req, res) => {
  return deleteComment(req, res);
});
export default router;
