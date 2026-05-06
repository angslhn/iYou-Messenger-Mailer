import type { Request, Response, NextFunction } from 'express';

/** Tipe email yang didukung oleh mailer service */
export type MailType =
  | 'register'
  | 'resend'
  | 'change_email'
  | 'change_phone'
  | 'reset_password'
  | 'account_changed';

/** Field wajib berdasarkan tipe email */
const requiredFields: Record<MailType, string[]> = {
  register: ['to', 'username', 'otp'],
  resend: ['to', 'username', 'otp'],
  change_email: ['to', 'username', 'otp'],
  change_phone: ['to', 'username', 'otp'],
  reset_password: ['to', 'username', 'token'],
  account_changed: ['to', 'username', 'maskedOldEmail'],
};

const validTypes: MailType[] = [
  'register',
  'resend',
  'change_email',
  'change_phone',
  'reset_password',
  'account_changed',
];

/**
 * Middleware untuk memvalidasi request body pada endpoint `/api/mail/send`.
 *
 * Body yang diharapkan:
 * ```json
 * {
 *   "type": "register" | "resend" | "change_email" | "change_phone" | "reset_password" | "account_changed",
 *   "to": "user@email.com",
 *   "username": "johndoe",
 *   "otp": "123456",           // untuk: register, resend, change_email, change_phone
 *   "token": "abc123...",      // untuk: reset_password
 *   "maskedOldEmail": "a***"   // untuk: account_changed
 * }
 * ```
 *
 * @throws {400} Jika `type` tidak ada atau tidak valid
 * @throws {400} Jika field wajib berdasarkan `type` tidak terpenuhi
 */
export const validateMailBody = (req: Request, res: Response, next: NextFunction): void => {
  const { type, to, username, ...rest } = req.body as Record<string, string>;

  // Validasi type
  if (!type) {
    res.status(400).json({ success: false, message: 'Field "type" is required.' });
    return;
  }

  if (!validTypes.includes(type as MailType)) {
    res.status(400).json({
      success: false,
      message: `Invalid type. Must be one of: ${validTypes.join(', ')}.`,
    });
    return;
  }

  // Validasi field umum
  if (!to) {
    res.status(400).json({ success: false, message: 'Field "to" is required.' });
    return;
  }

  if (!username) {
    res.status(400).json({ success: false, message: 'Field "username" is required.' });
    return;
  }

  // Validasi field spesifik per type
  const fields = requiredFields[type as MailType];
  const body: Record<string, string> = { to, username, ...rest };

  for (const field of fields) {
    if (!body[field]) {
      res.status(400).json({
        success: false,
        message: `Field "${field}" is required for type "${type}".`,
      });
      return;
    }
  }

  next();
};
