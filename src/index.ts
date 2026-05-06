import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';

import { env } from '@/config/env.js';
import { mailRouter } from '@/routes/mail.route.js';

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    methods: ['POST'],
    allowedHeaders: ['Content-Type', 'x-api-key'],
  }),
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests, please try again later.' },
  }),
);

app.use(express.json({ limit: '10kb' }));

app.use('/api/mail', mailRouter);

/** Health check */
app.get('/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'iYou Messenger Mailer is running.' });
});

/** 404 fallback */
app.use((_req, res) => {
  res.sendStatus(404);
});

if (env.NODE_ENV === 'development') {
  app.listen(env.PORT, () => {
    console.log(`[MAILER] Running on port ${env.PORT} (${env.NODE_ENV})`);
  });
}

export default app;
