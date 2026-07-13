const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'info@thedigitalaura.com';
const FROM_EMAIL   = process.env.FROM_EMAIL   || `"Digital Aura Website" <${process.env.SMTP_USER || 'noreply@thedigitalaura.com'}>`;

async function sendMail({ to, subject, html }) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('[mailer] SMTP not configured — skipping email:', subject);
    return;
  }
  try {
    await transporter.sendMail({ from: FROM_EMAIL, to, subject, html });
    console.log('[mailer] Sent:', subject, '→', to);
  } catch (err) {
    console.error('[mailer] Failed:', err.message);
  }
}

module.exports = { sendMail, NOTIFY_EMAIL };
