const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author');
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: "Error fetching blogs" });
    }
});

module.exports = router;

