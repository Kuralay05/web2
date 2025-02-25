const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const authMiddleware = require('../middleware/authMiddleware');
const validateMiddleware = require('../middleware/validateMiddleware');
const { blogSchema } = require('../middleware/schemas');

// 📌 Создание блога с валидацией
router.post('/', authMiddleware, validateMiddleware(blogSchema), async (req, res, next) => {
  try {
      const { title, body } = req.body;
      const blog = new Blog({ title, body, author: req.user._id });
      await blog.save();
      res.status(201).json({ message: "Blog created", blog });
  } catch (err) {
      next(err); // Передаём ошибку в errorMiddleware
  }
});


module.exports = router;
