const express = require('express');

const router = express.Router();

const { getPosts, createPost, updatePost, deletePost, likePost } = require('../controllers/posts');

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.patch('/:id/like', likePost)
router.delete('/:id', deletePost);

module.exports = router;