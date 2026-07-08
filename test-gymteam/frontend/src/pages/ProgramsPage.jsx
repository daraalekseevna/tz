// src/pages/ProgramsPage.jsx
import React, { useState } from 'react';
import '../styles/ProgramsPage.css';

function ProgramsPage() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: ''
  });

  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [partnerCode, setPartnerCode] = useState(null);

  // API_URL теперь всегда указывает на Render (без localhost)
  const API_URL = 'https://ambassador-backend-h10x.onrender.com';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (submitStatus) setSubmitStatus(null);
    if (partnerCode) setPartnerCode(null);
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Пожалуйста, введите корректный email адрес');
      return false;
    }

    if (formData.name.trim().length < 2) {
      alert('Пожалуйста, введите ваше имя (минимум 2 символа)');
      return false;
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      alert('Пожалуйста, введите корректный номер телефона (минимум 10 цифр)');
      return false;
    }

    if (!agreed) {
      alert('Пожалуйста, согласитесь на получение рассылки');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    setPartnerCode(null);

    try {
      const response = await fetch(`${API_URL}/api/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.code) {
          setPartnerCode(data.code);
          setSubmitStatus('exists');
          alert(`Этот email уже зарегистрирован! Ваш код: ${data.code}`);
          return;
        }
        throw new Error(data.error || 'Ошибка отправки');
      }

      setSubmitStatus('success');
      setPartnerCode(data.data.partnerCode);
      alert(`🎉 Партнёрский код отправлен на вашу почту!\nКод: ${data.data.partnerCode}`);
      
      setFormData({
        email: '',
        name: '',
        phone: ''
      });
      setAgreed(false);
      
    } catch (error) {
      console.error('Ошибка:', error);
      setSubmitStatus('error');
      alert('Произошла ошибка. Пожалуйста, попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="programs-page">
      <div className="container">
        <div className="programs-content">
          <h1 className="programs-title">Условия программы для амбассадоров</h1>
          
          <p className="programs-description">
            Краткое описание программы (преимущества, правила и тд)
          </p>

          <div className="offer-link">
            <a href="#" className="offer-link-text">Оферта</a>
          </div>

          <div className="form-wrapper">
            <h2 className="form-title">
              Зарегистрируйтесь, чтобы получить промокод амбассадора
            </h2>

            <form onSubmit={handleSubmit} className="ambassador-form" noValidate>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Введите ваш эл. адрес"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Введите ваше имя"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Введите ваш телефон"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="form-input"
                  disabled={isSubmitting}
                />
              </div>

              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Отправка...' : 'Получить промокод'}
              </button>
            </form>

            <p className="form-hint">
              Ваш партнёрский код придёт вам на почту в течение 10 минут после заполнения формы.
            </p>

            <div className="checkbox-wrapper">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                  className="checkbox-input"
                  disabled={isSubmitting}
                />
                <span className="checkbox-text">
                  Я согласна на получение информационных и маркетинговых рассылок 
                  (вы в любой момент можете отказаться от получения писем в личном кабинете)
                </span>
              </label>
            </div>


            {submitStatus === 'error' && (
              <div className="error-message">
              Произошла ошибка. Пожалуйста, попробуйте позже.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgramsPage;