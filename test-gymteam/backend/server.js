// server.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { transporter, provider } = require('./config/email');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ===== ПОДКЛЮЧЕНИЕ К POSTGRESQL =====
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.connect((err) => {
  if (err) {
    console.error('❌ Ошибка подключения к PostgreSQL:', err.stack);
  } else {
    console.log('✅ PostgreSQL подключена');
  }
});

// ===== ГЕНЕРАЦИЯ ПАРТНЁРСКОГО КОДА =====
function generatePartnerCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'AMB-';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// ===== ОТПРАВКА ПИСЬМА =====
async function sendPartnerCode(email, name, code) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: '🎉 Ваш партнёрский код амбассадора',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background: #f9f9f9; border-radius: 20px;">
        <h1 style="color: #F66297; text-align: center;">Поздравляем!</h1>
        <p style="font-size: 18px; text-align: center;">Вы стали амбассадором программы</p>
        
        <div style="background: white; padding: 30px; border-radius: 16px; margin: 20px 0; text-align: center;">
          <h2 style="color: #333; margin-bottom: 10px;">Ваш партнёрский код:</h2>
          <div style="background: #F66297; color: white; font-size: 32px; font-weight: bold; padding: 20px; border-radius: 12px; letter-spacing: 4px;">
            ${code}
          </div>
          <p style="color: #666; margin-top: 15px;">Используйте этот код для регистрации</p>
        </div>
        
        <div style="background: #f0f0f0; padding: 20px; border-radius: 12px; margin-top: 20px;">
          <p style="margin: 0; color: #555; font-size: 14px;">
            <strong>Ваши данные:</strong><br>
            Имя: ${name}<br>
            Email: ${email}
          </p>
        </div>
        
        <p style="text-align: center; color: #888; font-size: 14px; margin-top: 30px;">
          Если вы не регистрировались, проигнорируйте это письмо.
        </p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Письмо отправлено на ${email} через ${provider}`);
    console.log(`📨 ID сообщения: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`❌ Ошибка отправки письма через ${provider}:`, error.message);
    return false;
  }
}

// ===== API РОУТЫ =====

// 1. Создание заявки
app.post('/api/applications', async (req, res) => {
  try {
    const { email, name, phone } = req.body;

    // Проверка на дубликат
    const existing = await pool.query(
      'SELECT * FROM applications WHERE email = $1',
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({
        error: 'Этот email уже зарегистрирован',
        code: existing.rows[0].partnerCode
      });
    }

    // Генерация уникального кода
    let partnerCode;
    let isUnique = false;
    while (!isUnique) {
      partnerCode = generatePartnerCode();
      const exists = await pool.query(
        'SELECT * FROM applications WHERE "partnerCode" = $1',
        [partnerCode]
      );
      if (exists.rows.length === 0) isUnique = true;
    }

    // Создание заявки
    const result = await pool.query(
      `INSERT INTO applications (email, name, phone, "partnerCode") 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [email, name, phone, partnerCode]
    );

    const application = result.rows[0];

    // Отправка письма
    await sendPartnerCode(email, name, partnerCode);

    res.status(201).json({
      success: true,
      message: 'Заявка создана, код отправлен на почту',
      data: {
        email: application.email,
        name: application.name,
        partnerCode: application.partnerCode
      }
    });

  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// 2. Получение всех заявок
app.get('/api/applications', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM applications ORDER BY "createdAt" DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка получения заявок' });
  }
});

// 3. Получение заявки по коду
app.get('/api/applications/code/:code', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM applications WHERE "partnerCode" = $1',
      [req.params.code]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Код не найден' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка поиска' });
  }
});

// 4. Обновление статуса заявки
app.patch('/api/applications/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const result = await pool.query(
      'UPDATE applications SET status = $1, "updatedAt" = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Заявка не найдена' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка обновления' });
  }
});

// 5. Удаление заявки
app.delete('/api/applications/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM applications WHERE id = $1 RETURNING *',
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Заявка не найдена' });
    }
    res.json({ success: true, message: 'Заявка удалена' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка удаления' });
  }
});

// 6. Статистика
app.get('/api/stats', async (req, res) => {
  try {
    const total = await pool.query('SELECT COUNT(*) FROM applications');
    const pending = await pool.query("SELECT COUNT(*) FROM applications WHERE status = 'pending'");
    const approved = await pool.query("SELECT COUNT(*) FROM applications WHERE status = 'approved'");
    const rejected = await pool.query("SELECT COUNT(*) FROM applications WHERE status = 'rejected'");

    res.json({
      total: parseInt(total.rows[0].count),
      pending: parseInt(pending.rows[0].count),
      approved: parseInt(approved.rows[0].count),
      rejected: parseInt(rejected.rows[0].count)
    });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка статистики' });
  }
});

// 7. Тест отправки письма
app.post('/api/test-email', async (req, res) => {
  try {
    const { email } = req.body;
    const testCode = 'TEST-123';
    
    const success = await sendPartnerCode(email, 'Тест', testCode);
    
    if (success) {
      res.json({ success: true, message: 'Письмо отправлено', provider });
    } else {
      res.status(500).json({ success: false, message: 'Ошибка отправки', provider });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== ЗАПУСК СЕРВЕРА =====
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`📧 Используется провайдер: ${provider}`);
  console.log(`📧 Отправка с: ${process.env.EMAIL_USER}`);
  console.log(`📊 Админ-панель: http://localhost:${PORT}/api/applications`);
});