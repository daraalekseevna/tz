// src/components/AchievementsCarousel.jsx
import React, { useRef } from 'react';
import '../styles/AchievementsCarousel.css';

function AchievementsCarousel() {
  const scrollRef = useRef(null);

  const images = [
    "/images/icon1.png",
    "/images/icon2.png",
    "/images/icon3.png",
    "/images/icon4.png",
    "/images/icon5.png",
    "/images/icon6.png",
    "/images/icon7.png",
    "/images/icon8.png",
    "/images/icon9.png"
  ];

  const items = [
    "Вице-чемпионка мира и чемпионка России по фитнес-бикини",
    "Профессиональный фитнес-тренер с опытом более 15 лет",
    "Мама 2-х детей. Всего за 100 дней после первых родов похудела на 20 кг и вернулась в прежнюю форму",
    "Автор первых в России масштабных марафонов стройности",
    "Чемпионка России и мира по жиму лёжа"
  ];

  return (
    <section className="achievements-carousel-section">
      <div className="container">
        <h2 className="carousel-title">
          Доверьте свое тело чемпионке
          <br />
          фитнес-бикини и тренеру <span className="highlight">Кате Усмановой</span>
        </h2>

        <p className="carousel-description">
          С 2015 года создаёт топовые тренировки для идеальных ягодиц, плоского живота и стройности без жёстких диет.
          <br />
          Уже более <strong>580 000+</strong> участниц тренируются с Катей, ведь она:
        </p>

        {/* БЕЛЫЙ ПРЯМОУГОЛЬНИК */}
        <div className="white-box">
          {/* ТЕКСТ (СВЕРХУ) */}
          <div className="text-list">
            {items.map((text, index) => (
              <div key={index} className="list-item">
                <img src="/images/1.png" alt="иконка" className="list-icon" />
                <p className="list-text">{text}</p>
              </div>
            ))}
          </div>

          {/* ИКОНКИ (СНИЗУ) + ТЕКСТ + 21.png */}
          <div className="image-scroll-wrapper">
            <div className="image-scroll" ref={scrollRef}>
              {images.map((src, index) => (
                <img 
                  key={index} 
                  src={src} 
                  alt={`иконка ${index + 1}`} 
                  className="scroll-icon"
                />
              ))}
            </div>
            <p className="scroll-hint-text">
              Листайте вправо
              <img 
                src="/images/21.png" 
                alt="→" 
                className="scroll-hint-image"
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AchievementsCarousel;