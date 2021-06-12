const mongoose = require('mongoose');
const PostMessage = require('../modals/postMessage');

const getPosts = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 2;
        const startIndex = (Number(page) - 1) * LIMIT;

        const total = await PostMessage.countDocuments({});

        const postMessages = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: postMessages, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// get posts by search
const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    try {
        const title = new RegExp(searchQuery, 'i');

        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });
        res.json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}

const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post found with that id.');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });

    res.json(updatedPost);
}

const deletePost = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('This Id is not valid.');

    await PostMessage.findByIdAndRemove(_id);

    res.json({ message: "Post deleted successfully." });
}

const likePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!req.userId) return res.status(400).json({ message: "Unauthorized." });

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('This Id is not valid.');

    // finding the post
    const post = await PostMessage.findById(_id);

    const index = post.likes.findIndex(id => id === String(req.userId));

    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter(id => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost);

}
module.exports = { getPosts, createPost, updatePost, deletePost, likePost, getPostsBySearch };