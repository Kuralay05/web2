// models/Blog.js
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  body: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [CommentSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Автоматическое обновление updatedAt перед сохранением
BlogSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Полнотекстовый индекс для поиска по title и body
BlogSchema.index({ title: 'text', body: 'text' });

module.exports = mongoose.model('Blog', BlogSchema);

