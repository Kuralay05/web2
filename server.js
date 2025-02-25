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

// 📌 Подключаем EJS для рендеринга страниц
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 📌 Подключаем статические файлы (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// 📌 Подключаем MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB Connection Error:', err));

// 📌 Подключаем маршруты API
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);

// 📌 Главная страница
app.get('/', (req, res) => {
  res.render('index', { title: "Welcome to My Blog", user: req.session.user });
});


// 📌 Страница регистрации
app.get('/auth/register', (req, res) => {
    res.render('register', { title: "Register" });
});

// 📌 Страница логина
app.get('/auth/login', (req, res) => {
    res.render('login', { title: "Login" });
});

// 📌 Обработчик ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

// 📌 Запуск сервера
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
