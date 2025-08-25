const express = require('express');
const router = express.Router();
const { createPost, getUserPosts, updatePost, deletePost,getPublicPosts,handleLike,handleDislike } = require('../controllers/postController');
const authenticate=require('../middleware/authenticate');

router.get('/', authenticate, getUserPosts);
router.post('/', authenticate, createPost);
router.put('/:id', authenticate, updatePost);
router.delete('/:id', authenticate, deletePost);
router.get('/public',authenticate, getPublicPosts);
router.put('/:id/like', authenticate, handleLike);
router.put('/:id/dislike', authenticate, handleDislike);

module.exports = router;