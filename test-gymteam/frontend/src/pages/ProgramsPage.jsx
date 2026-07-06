// src/pages/ProgramsPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProgramsPage.css';

function ProgramsPage() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: ''
  });

  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) {
      alert('Пожалуйста, согласитесь на получение рассылки');
      return;
    }
    console.log('Данные формы:', formData);
    alert('Промокод отправлен на вашу почту!');
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

            <form onSubmit={handleSubmit} className="ambassador-form">
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Введите ваш эл. адрес"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
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
                />
              </div>

              <button type="submit" className="submit-btn">
                Получить промокод
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
                />
                <span className="checkbox-text">
                  Я согласна на получение информационных и маркетинговых рассылок 
                  (вы в любой момент можете отказаться от получения писем в личном кабинете)
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgramsPage;