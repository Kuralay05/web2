const Joi = require("joi");

// 📌 Валидация регистрации
const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
});

// 📌 Валидация логина
const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

// 📌 Валидация обновления профиля
const profileSchema = Joi.object({
    username: Joi.string().min(3).max(30),
    email: Joi.string().email(),
});

// 📌 Валидация блога
const blogSchema = Joi.object({
    title: Joi.string().min(5).max(100).required(),
    body: Joi.string().min(10).required(),
});

module.exports = { registerSchema, loginSchema, profileSchema, blogSchema };
