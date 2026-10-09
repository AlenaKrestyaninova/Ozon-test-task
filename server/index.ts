import express from 'express';
import { productsRouter } from './routes/products.ts';

const PORT = Number(process.env.PORT ?? 3001);
// Имитация реальной сети, чтобы на фронте было видно загрузку и ошибки
const DELAY_MS = Number(process.env.API_DELAY ?? 400);
const ERROR_RATE = Number(process.env.API_ERROR_RATE ?? 0); // 0..1, например 0.3 = 30% запросов падают

const app = express();

app.use(express.json());

app.use((_req, res, next) => {
  setTimeout(() => {
    if (Math.random() < ERROR_RATE) {
      res.status(500).json({ message: 'Случайная ошибка сервера' });
      return;
    }
    next();
  }, DELAY_MS);
});

app.use('/api/products', productsRouter);

app.use((_req, res) => {
  res.status(404).json({ message: 'Ручка не найдена' });
});

app.listen(PORT, () => {
  console.log(`API запущен: http://localhost:${PORT}/api`);
});
