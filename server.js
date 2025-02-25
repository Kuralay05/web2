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

// Подключаем EJS для рендеринга страниц
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Раздаём статические файлы (CSS, изображения)
app.use(express.static(path.join(__dirname, 'public')));

// Подключаем MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Подключаем маршруты
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);

// 📌 **Главная страница (рендеринг EJS)**
app.get('/', (req, res) => {
    res.render('index', { title: "Welcome to My Blog" });
});

// Обработчик ошибок
const errorMiddleware = require('./middleware/errorMiddleware');
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
