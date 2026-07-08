// src/components/TrustSection.jsx
import React, { useRef } from 'react';
import '../styles/TrustSection.css';

function TrustSection() {
  // Создаём ссылку на блок с формой (ProgramsSection)
  const programsRef = useRef(null);

  // Функция для плавной прокрутки к ProgramsSection с большим отступом
  const scrollToPrograms = () => {
    if (programsRef.current) {
      // Получаем позицию якоря
      const rect = programsRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Смещаем прокрутку на 500px ВНИЗ от якоря
      const targetPosition = rect.top + scrollTop + 100; // ← +100px вниз

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="trust-section">
      <div className="container">
        <h2 className="trust-title">
          Кате доверяют миллионы.<br />
          <span className="highlight">Её методы работают</span> – и об этом говорят все
        </h2>

        <div className="trust-white-box">
          <p className="trust-stats">
            580 000+ учениц. Подкасты. Статьи в СМИ.<br />
            Коллаборации с звёздами.
          </p>

          <div className="trust-grid">
            <div className="trust-card">
              <div 
                className="trust-img" 
                style={{ backgroundImage: `url(/images/0.png)` }}
              />
            </div>

            <div className="trust-card">
              <div 
                className="trust-img" 
                style={{ backgroundImage: `url(/images/01.png)` }}
              />
            </div>

            <div className="trust-card">
              <div 
                className="trust-img" 
                style={{ backgroundImage: `url(/images/02.png)` }}
              />
            </div>

            <div className="trust-card">
              <div 
                className="trust-img" 
                style={{ backgroundImage: `url(/images/03.png)` }}
              />
            </div>
          </div>
        </div>

        {/* КНОПКА ПОД БЕЛЫМ БЛОКОМ */}
        <button className="trust-button" onClick={scrollToPrograms}>
          ВЕРНУТЬ ФОРМУ
        </button>
      </div>

      {/* Якорь для прокрутки */}
      <div ref={programsRef}></div>
    </section>
  );
}

export default TrustSection;