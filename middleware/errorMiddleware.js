const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Если статус 200, значит ошибка сервера
    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Показываем стек только в режиме разработки
    });
};

module.exports = errorMiddleware;
