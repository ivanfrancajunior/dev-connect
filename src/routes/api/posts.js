import express from 'express';
const router = express.Router();
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { validate } from '../../middlewares/handleValidations.js';
import { createPostValidation } from '../../middlewares/postValidations.js';

import {
  createPost,
  getPostById,
  getPosts,
  deletePost
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
export default router;
