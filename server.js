const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const path = require('path');

dotenv.config();

const app = express(); // <-- Сначала создаём `app`
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Импорт маршрутов (только после объявления `app`)
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);

// Обработчик ошибок (должен быть в конце)
const errorMiddleware = require('./middleware/errorMiddleware');
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
