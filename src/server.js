import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send({ ok: true, message: 'Hello from Express!' });
});

app.get('/health', (req, res) => {
  res.send({ status: 'ok', uptime: process.uptime() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send({ error: 'Not found' });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`[server] running on http://localhost:${port}`);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`server on ${port}`);
});