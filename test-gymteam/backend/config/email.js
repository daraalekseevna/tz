// config/email.js
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(to, subject, htmlContent) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [to],
      subject: subject,
      html: htmlContent,
    });
    
    if (error) {
      console.error('Ошибка Resend:', error);
      return false;
    }
    
    console.log('Письмо отправлено через Resend, ID:', data?.id);
    return true;
  } catch (error) {
    console.error('Ошибка Resend:', error.message);
    return false;
  }
}

module.exports = { sendEmail };