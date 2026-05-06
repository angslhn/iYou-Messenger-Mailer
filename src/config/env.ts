import DotenvFlow from 'dotenv-flow';

// Load environment variables dari file .env
// silent: true agar tidak throw error jika file .env tidak ditemukan
DotenvFlow.config({ silent: true });

/**
 * Konfigurasi environment variable aplikasi.
 * Semua nilai diambil dari file .env melalui dotenv-flow.
 */
export type EnvConfig = {
  readonly PORT: number;
  readonly NODE_ENV: 'development' | 'production' | 'staging' | 'test';
  readonly CLIENT_ORIGIN: string;
  readonly GMAIL_USER: string;
  readonly GMAIL_APP_PASSWORD: string;
  readonly MAILER_API_KEY: string;
};

/**
 * Konfigurasi environment variable aplikasi.
 * Semua nilai diambil dari file .env melalui dotenv-flow.
 * Nilai default tersedia untuk beberapa konfigurasi opsional.
 */
export const env: EnvConfig = {
  // Server
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'staging' | 'test',

  // Client
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN as string,

  // Nodemailer (Gmail OAuth2)
  GMAIL_USER: process.env.GMAIL_USER as string,
  GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD as string,

  // Credential
  MAILER_API_KEY: process.env.MAILER_API_KEY as string,
} as const;
