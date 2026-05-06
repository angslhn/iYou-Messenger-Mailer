/**
 * Format Date ke string yang human-readable untuk email.
 * Menggunakan timezone UTC.
 *
 * @param {Date} date - Objek Date yang akan diformat
 * @returns {string} Contoh: "Friday, April 4, 2025 · 09:41 AM UTC"
 */
export const formatEmailDate = (date: Date): string => {
  const dateStr = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);

  const timeStr = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  }).format(date);

  return `${dateStr} &middot; ${timeStr} UTC`;
};

/** Mengembalikan tahun saat ini */
export const yearNow = new Date().getFullYear();
