import { env } from '@/config/env.js';
import { yearNow } from '@/helpers/email-date.js';

import type { EmailContext } from '@/helpers/mailer.js';

/**
 * Template email verifikasi akun dengan kode OTP.
 *
 * @param {string} username - Username penerima
 * @param {string} otp - Kode OTP 6 digit
 * @param {EmailContext} context - Konteks pengiriman email
 * @returns {string} HTML email
 */
export const verifyCode = (
  username: string,
  otp: string,
  context: EmailContext = 'register',
): string => {
  const digits = otp.split('');

  const digitCell = (digit: string) => `
    <td style="padding:0 5px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="
            width:50px;
            height:55px;
            background:#f7f7f7;
            border:1.5px solid #e8e8e8;
            border-radius:5px;
            text-align:center;
            vertical-align:middle;
            font-family:'DM Sans','Verdana',sans-serif;
            font-size:28px;
            font-weight:700;
            color:#0e0e0e;
            letter-spacing:0;
          ">${digit}</td>
        </tr>
      </table>
    </td>`;

  const copy = {
    register: {
      title: 'Verify Your Account',
      subtitle:
        'Thanks for signing up! Enter the verification code below to activate your account.',
      warning:
        'Never share this code with anyone. iYou Messenger will never ask for your verification code via call, chat, or email.',
      footer:
        "If you didn't create an account with iYou Messenger, you can safely ignore this email. Someone may have entered your email address by mistake.",
    },
    resend: {
      title: 'Your New Verification Code',
      subtitle:
        'You requested a new verification code. Use the code below to complete your account verification.',
      warning:
        'Never share this code with anyone. iYou Messenger will never ask for your verification code via call, chat, or email.',
      footer:
        "If you didn't request a new code, you can safely ignore this email. Someone may have entered your email address by mistake.",
    },
    change_email: {
      title: 'Verify Your New Email',
      subtitle:
        'We received a request to change your email address. Enter the code below to confirm your new email.',
      warning:
        "If you didn't request an email change, please secure your account immediately by changing your password.",
      footer:
        "If you didn't request an email change, you can safely ignore this email. Your current email address will remain unchanged.",
    },
    change_phone: {
      title: 'Verify Your New Phone Number',
      subtitle:
        'We received a request to change your phone number. Enter the code below to confirm your new number.',
      warning:
        "If you didn't request a phone number change, please secure your account immediately by changing your password.",
      footer:
        "If you didn't request a phone number change, you can safely ignore this email. Your current phone number will remain unchanged.",
    },
  }[context];

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>${copy.title} — iYou Messenger</title>
    </head>
    <body style="margin:0;padding:0;background:#f0f0f0;font-family:'DM Sans','Verdana',sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0f0f0;padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 2px 40px rgba(0,0,0,0.10);">

            <!-- HEADER -->
            <tr>
              <td style="background:#0e0e0e;padding:36px 48px 32px;">
                <table cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="font-size:26px;font-weight:700;color:#f0f0f0;letter-spacing:-0.5px;">
                      iYou<span style="color:#555555;">Messenger</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td style="padding:48px 48px 40px;background:#ffffff;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">

                  <!-- Greeting -->
                  <tr>
                    <td style="font-size:13px;color:#999999;padding-bottom:8px;">
                      Hello, ${username}
                    </td>
                  </tr>

                  <!-- Title -->
                  <tr>
                    <td style="font-size:22px;font-weight:700;color:#0e0e0e;letter-spacing:-0.5px;line-height:1.25;padding-bottom:20px;">
                      ${copy.title}
                    </td>
                  </tr>

                  <!-- Description -->
                  <tr>
                    <td style="font-size:15px;color:#555555;line-height:1.7;padding-bottom:36px;">
                      ${copy.subtitle}
                      The code is valid for <strong style="color:#0e0e0e;font-weight:600;">15 minutes</strong>.
                    </td>
                  </tr>

                  <!-- OTP Label -->
                  <tr>
                    <td align="center" style="padding-bottom:20px;">
                      <span style="font-size:11px;color:#aaaaaa;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;">
                        Your verification code
                      </span>
                    </td>
                  </tr>

                  <!-- OTP Digits -->
                  <tr>
                    <td align="center" style="padding-bottom:20px;">
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          ${digitCell(digits[0] ?? '0')}
                          ${digitCell(digits[1] ?? '0')}
                          ${digitCell(digits[2] ?? '0')}
                          ${digitCell(digits[3] ?? '0')}
                          ${digitCell(digits[4] ?? '0')}
                          ${digitCell(digits[5] ?? '0')}
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Expiry -->
                  <tr>
                    <td align="center" style="padding-bottom:32px;">
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="font-size:13px;color:#aaaaaa;padding:0 10px;">Expires in 15 minutes</td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Warning Box -->
                  <tr>
                    <td style="background:#fafafa;border:1px solid #f0f0f0;border-radius:10px;padding:16px 20px;">
                      <table cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                          <td style="font-size:13px;color:#888888;line-height:1.6;">
                            ${copy.warning}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background:#fafafa;border-top:1px solid #f0f0f0;padding:28px 48px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="font-size:12px;color:#bbbbbb;line-height:1.7;">
                      ${copy.footer}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top:12px;font-size:12px;color:#cccccc;">
                      &copy; ${yearNow} iYou Messenger
                      &nbsp;&middot;&nbsp;
                      <a href="${env.CLIENT_ORIGIN}/privacy" style="color:#888888;text-decoration:none;">Privacy Policy</a>
                      &nbsp;&middot;&nbsp;
                      <a href="${env.CLIENT_ORIGIN}/terms" style="color:#888888;text-decoration:none;">Terms of Service</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
    </body>
    </html>`;
};
