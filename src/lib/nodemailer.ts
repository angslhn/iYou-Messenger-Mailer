import { createTransport } from 'nodemailer';
import { env } from '@/config/env.js';

/**
 * Instance transporter Nodemailer yang dikonfigurasi untuk menangani pengiriman email keluar.
 */
export const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: env.GMAIL_USER,
    pass: env.GMAIL_APP_PASSWORD,
  },
});
