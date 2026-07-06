// src/components/TrustSection.jsx
import React from 'react';
import '../styles/TrustSection.css';

function TrustSection() {
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

          <button className="trust-button">ВЕРНУТЬ ФОРМУ</button>
        </div>
      </div>
    </section>
  );
}

export default TrustSection;