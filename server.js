const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const helmet = require('helmet');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

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

// Маршруты
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');

app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
