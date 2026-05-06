import { env } from '@/config/env.js';
import { yearNow } from '@/helpers/email-date.js';

/**
 * Template email reset password dengan tombol redirect ke link token.
 *
 * @param {string} username - Username penerima
 * @param {string} token - Token reset password 64 karakter hex
 * @returns {string} HTML email
 */
export const resetPassword = (username: string, token: string): string => {
  const resetUrl = `${env.CLIENT_ORIGIN}/reset-password/${token}`;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Reset Your Password — iYou Messenger</title>
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
                      Reset Your Password
                    </td>
                  </tr>

                  <!-- Description -->
                  <tr>
                    <td style="font-size:15px;color:#555555;line-height:1.7;padding-bottom:28px;">
                      We received a request to reset the password for your iYou Messenger account.
                      Click the button below to create a new password.
                    </td>
                  </tr>

                  <!-- Hero Dark Box -->
                  <tr>
                    <td style="background:#0e0e0e;border-radius:12px;padding:32px;text-align:center;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td align="center" style="font-size:36px;padding-bottom:16px;">&#128273;</td>
                        </tr>
                        <tr>
                          <td style="font-size:14px;color:#666666;line-height:1.6;padding-bottom:24px;">
                            This link will take you to a secure page where<br>you can set a new password for your account.
                          </td>
                        </tr>
                        <tr>
                          <td align="center">
                            <a href="${resetUrl}"
                              style="display:inline-block;background:#f5f5f5;color:#0e0e0e;text-decoration:none;font-size:14px;font-weight:700;padding:14px 36px;border-radius:8px;letter-spacing:-0.2px;">
                              Reset My Password
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Expiry Badge -->
                  <tr>
                    <td style="padding-top:20px;padding-bottom:28px;">
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="background:#fff8ed;border:1px solid #fde8b8;border-radius:20px;padding:6px 14px;font-size:12px;color:#b07d2a;font-weight:500;">
                            &#9203; Link expires in 15 minutes
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Divider -->
                  <tr>
                    <td style="height:1px;background:#f0f0f0;padding:0;font-size:0;">&nbsp;</td>
                  </tr>

                  <!-- URL Fallback -->
                  <tr>
                    <td style="padding-top:28px;">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="background:#f7f7f7;border:1px solid #efefef;border-radius:8px;padding:16px 20px;">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                              <tr>
                                <td style="font-size:11px;color:#aaaaaa;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;padding-bottom:8px;">
                                  Or copy this link
                                </td>
                              </tr>
                              <tr>
                                <td style="font-family:'Courier New',Courier,monospace;font-size:11px;color:#888888;word-break:break-all;line-height:1.5;">
                                  ${resetUrl}
                                </td>
                              </tr>
                            </table>
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
                      If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
                      If you're concerned about your account security,
                      <a href="${env.CLIENT_ORIGIN}/login" style="color:#888888;text-decoration:none;border-bottom:1px solid #dddddd;">contact support</a>.
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
