const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
const { getPosts, getPostsBySearch, createPost, getPost, updatePost, deletePost, likePost } = require('../controllers/posts');

router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/search', getPostsBySearch);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.patch('/:id/like', auth, likePost);
router.delete('/:id', auth, deletePost);

module.exports = router;