import express from 'express';
import healthRouter from './routes/health.js';

const app = express();
app.use(express.json());

app.use('/health', healthRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express CI Starter 👋' });
});

export default app;
