// config/email.js
const { Resend } = require('resend');

// Инициализация Resend с вашим API ключом
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(to, subject, htmlContent) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Амбассадор <onboarding@resend.dev>', // На время теста
      to: [to],
      subject: subject,
      html: htmlContent,
    });
    
    if (error) {
      console.error('❌ Ошибка Resend:', error);
      return false;
    }
    
    console.log('✅ Письмо отправлено через Resend');
    console.log('📨 ID:', data?.id);
    return true;
  } catch (error) {
    console.error('❌ Ошибка Resend:', error.message);
    return false;
  }
}

module.exports = { sendEmail };