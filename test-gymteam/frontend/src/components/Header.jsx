// src/components/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';  // ← импортируем хук
import '../styles/Header.css';

function Header() {
  const navigate = useNavigate();  // ← хук для навигации

  const handleChooseProgram = () => {
    navigate('/programs');  // ← перенаправляем на страницу /programs
  };

  return (
    <section className="header-section">
      <div className="container">
        <div className="flex-row">
          <div className="text-col">
            <h1 className="title">
              ПРИВЕДИТЕ ТЕЛО В ФОРМУ
              <br />
              С ЧЕМПИОНКОЙ
              <br />
              КАТЕЙ УСМАНОВОЙ
            </h1>
            <p className="subtitle">
              без диет, голода и запретов
              <br />
              с пользой для здоровья
            </p>
            <p className="desc">
              Похудеть, подтянуть попу и живот, набрать форму
              <br />
              в зале, восстановиться после родов — тренировки
              <br />
              и питание под вашу цель
            </p>
            <button className="btn" onClick={handleChooseProgram}>
              ВЫБРАТЬ ПРОГРАММУ
            </button>
            <p className="vpn">Для корректной работы сайта отключите VPN</p>
          </div>
          <div className="img-col">
            <img
              src="/images/katya.png"
              alt="Катя Усманова"
              className="hero-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;