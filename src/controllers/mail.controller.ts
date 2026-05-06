import { emailVerifyCode, emailResetPassword, emailAccountChanged } from '@/helpers/mailer.js';

import type { Request, Response } from 'express';
import type { MailType } from '@/middlewares/validate.middleware.js';

/**
 * Controller untuk mengirim email berdasarkan tipe yang diberikan.
 *
 * @route  POST /api/mail/send
 *
 * @param {Request} req - Express request object
 * @param {string}  req.body.type           - Tipe email yang akan dikirim
 * @param {string}  req.body.to             - Alamat email tujuan
 * @param {string}  req.body.username       - Username penerima
 * @param {string}  [req.body.otp]          - Kode OTP (register | resend | change_email | change_phone)
 * @param {string}  [req.body.token]        - Token reset password (reset_password)
 * @param {string}  [req.body.maskedOldEmail] - Email lama yang disamarkan (account_changed)
 *
 * @param {Response} res - Express response object
 *
 * @returns {200} { success: true, message: 'Email sent successfully.' }
 * @returns {500} { success: false, message: 'Failed to send email.' }
 */
export const sendMail = async (req: Request, res: Response): Promise<void> => {
  const { type, to, username, otp, token, maskedOldEmail } = req.body as {
    type: MailType;
    to: string;
    username: string;
    otp?: string;
    token?: string;
    maskedOldEmail?: string;
  };

  try {
    switch (type) {
      case 'register':
      case 'resend':
      case 'change_email':
      case 'change_phone':
        await emailVerifyCode(to, username, otp!, type);
        break;
      case 'reset_password':
        await emailResetPassword(to, username, token!);
        break;
      case 'account_changed':
        await emailAccountChanged(to, username, maskedOldEmail!);
        break;
    }

    res.status(200).json({ success: true, message: 'Email sent successfully.' });
  } catch (err) {
    console.error('[MAILER ERROR]', err);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
};
