import type { Request, Response, NextFunction } from 'express';

import { env } from '@/config/env.js';

/**
 * Middleware untuk memvalidasi `x-api-key` header.
 * Hanya request dari backend utama iYou Messenger yang diizinkan.
 *
 * @throws {401} Jika header `x-api-key` tidak ada
 * @throws {403} Jika nilai `x-api-key` tidak valid
 */
export const requireApiKey = (req: Request, res: Response, next: NextFunction): void => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    res.status(401).json({ success: false, message: 'Missing API key.' });
    return;
  }

  if (apiKey !== env.MAILER_API_KEY) {
    res.status(403).json({ success: false, message: 'Invalid API key.' });
    return;
  }

  next();
};
