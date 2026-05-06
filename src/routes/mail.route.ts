import { Router } from 'express';

import { requireApiKey } from '@/middlewares/auth.middleware.js';
import { validateMailBody } from '@/middlewares/validate.middleware.js';
import { sendMail } from '@/controllers/mail.controller.js';

export const mailRouter = Router();

/**
 * POST /api/mail/send
 *
 * Mengirim email berdasarkan tipe yang diberikan.
 * Dilindungi oleh API key dan validasi body.
 *
 * Headers:
 * - `x-api-key` (required): API key rahasia dari backend utama
 *
 * Body:
 * - `type` (required): Tipe email yang akan dikirim
 * - `to` (required): Alamat email tujuan
 * - `username` (required): Username penerima
 * - `otp` (required untuk: register, resend, change_email, change_phone)
 * - `token` (required untuk: reset_password)
 * - `maskedOldEmail` (required untuk: account_changed)
 *
 * @returns {200} Email berhasil dikirim
 * @returns {400} Validasi body gagal
 * @returns {401} API key tidak ada
 * @returns {403} API key tidak valid
 * @returns {500} Gagal mengirim email
 */
mailRouter.post('/send', requireApiKey, validateMailBody, sendMail);
