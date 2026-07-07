// src/components/ProgramsSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProgramsSection.css';

function ProgramsSection() {
  const programs = [
    {
      id: 1,
      image: "/images/1.4.png",
      flag: "ФЛАГМАН",
      title: "Метод Усмановой",
      description: "Освоите технику и втянетесь в регулярные тренировки — без травм и через силу. Первая программа, с которой начинают все ученицы Кати.",
      isFlagman: true
    },
    {
      id: 2,
      image: "/images/1.1.png",
      flag: "Марафон",
      title: "Стройности",
      description: "Первый видимый результат за 21 день — уходит первый жир, появляется тонус и лёгкость. Для тех, кто стартует с нуля."
    },
    {
      id: 3,
      image: "/images/1.2.png",
      flag: "Марафон",
      title: "Упругая попа 1.0",
      description: "Первый объём и подтянутость ягодиц — с собственным весом. Для тех, кто впервые целенаправленно работает над попой."
    },
    {
      id: 4,
      image: "/images/1.3.png",
      flag: "Марафон",
      title: "Упругая попа 2.0",
      description: "Плотные, упругие ягодицы — следующий уровень после 1.0. С резинкой и утяжелителями, для подготовленных."
    },
    {
      id: 5,
      image: "/images/1.6.png",
      flag: "Марафон",
      title: "Плоский живот",
      description: "Убрать вываливающийся живот, который не уходит даже после похудения. Тренировки на глубокие мышцы пресса, которые отвечают за плоский живот — а не за «кубики»."
    },
    {
      id: 6,
      image: "/images/1.5.png",
      flag: "Курс",
      title: "Жиросжигающий",
      description: "Сжечь жир и проявить рельеф — за 6 недель. Для тех, кто уже тренировался: с гантелями, по схеме интервальных нагрузок."
    }
  ];

  return (
    <section className="programs-section">
      <div className="container">
        <h2 className="programs-section-title">Тренировки дома</h2>
        
        <div className="programs-grid">
          {programs.map((program) => (
            <div 
              key={program.id} 
              className={`program-card ${program.isFlagman ? 'program-card-flagman' : ''}`}
            >
              <img 
                src={program.image} 
                alt={program.title}
                className="program-image" 
              />
              <div className="program-content">
                <div className="program-top">
                  <span className={`program-flag ${program.isFlagman ? 'program-flag-flagman' : ''}`}>
                    {program.flag}
                  </span>
                  <h3 className="program-title">{program.title}</h3>
                </div>
                <p className="program-desc">{program.description}</p>
                <Link to="/method" className="program-link">Подробнее</Link>   {/* ← ВСЕ КНОПКИ ВЕДУТ НА /method */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProgramsSection;