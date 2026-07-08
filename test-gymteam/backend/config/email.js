// config/email.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// Настройки для разных провайдеров
const emailConfigs = {
  gmail: {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  },
  yandex: {
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  },
  mailru: {
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  },
};

// Получаем текущего провайдера
const provider = process.env.EMAIL_PROVIDER || 'mailru';

// Создаём transporter
const transporter = nodemailer.createTransport(emailConfigs[provider]);

// Проверка подключения
transporter.verify((error, success) => {
  if (error) {
    console.error(`❌ Ошибка подключения ${provider}:`, error.message);
  } else {
    console.log(`✅ Email провайдер ${provider} подключен`);
    console.log(`📧 Отправка с: ${process.env.EMAIL_USER}`);
  }
});

module.exports = { transporter, provider };