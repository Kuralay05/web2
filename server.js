const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const path = require('path');

dotenv.config();

const app = express();
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

// 🔹 Подключаем маршруты (важно! должно быть **после** app.use(express.json()))
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);

// ✅ Корневой маршрут, чтобы проверить работу сервера
app.get('/', (req, res) => {
    res.send('Server is running! 🚀');
});

// Обработчик ошибок
const errorMiddleware = require('./middleware/errorMiddleware');
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
