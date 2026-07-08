// src/pages/MethodPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MethodPage.css';

function MethodPage() {
  const [time, setTime] = useState({
    hours: 20,
    minutes: 52,
    seconds: 44
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const pricingRef = useRef(null);

  const scrollToPricing = () => {
    if (pricingRef.current) {
      pricingRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.classList.add('method-page-body');
    return () => {
      document.body.classList.remove('method-page-body');
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0 && minutes < 0 && seconds < 0) {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Открыть модальное окно
  const openModal = (tariff) => {
    setSelectedTariff(tariff);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Закрыть модальное окно
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
    setFormData({ name: '', phone: '', email: '' });
  };

  // Обработка изменения полей
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Отправка заявки
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Здесь можно добавить отправку данных на сервер
    console.log('Заявка отправлена:', {
      tariff: selectedTariff,
      ...formData
    });

    // Показываем сообщение об успехе
    alert(`Заявка на тариф "${selectedTariff}" успешно отправлена!`);
    
    // Закрываем модальное окно
    closeModal();
  };

  // Закрытие по клику на фон
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="method-page">

      {/* ===== ГЕРОЙ-БЛОК ===== */}
      <div className="method-hero">
        <img src="/images/000.png" alt="Метод Усмановой" className="method-bg-image" />
        
        <div className="method-overlay">
          <div className="method-top">
            <p className="method-badge">
              ХВАТИТ ИСКАТЬ СПОСОБ. ЕСТЬ ОБНОВЛЁННЫЙ <br />
              <span className="pink-text">«МЕТОД УСМАНОВОЙ»</span>
            </p>
            
            <h1 className="method-title">
              ЗА ЛЕТО ВЕРНИТЕ <br />
              <span className="pink-text">ЛЁГКОСТЬ, ЭНЕРГИЮ</span> <br />
              <span className="pink-text">И ФОРМУ</span>
            </h1>
          </div>

          <div className="method-image-wrapper">
            <img src="/images/1234.png" alt="Метод Усмановой" className="method-center-image" />
          </div>

          <div className="method-bottom">
            <p className="method-desc">
              <span className="pink-text">Домашние тренировки с Катей и готовое питание по неделям</span><br />
              возвращают лёгкость, подтягивают тело и наконец превращают<br />
              спорт в чистое удовольствие.
            </p>
            
            <button className="method-btn" onClick={scrollToPricing}>
              ПОЛУЧИТЬ МЕТОД
            </button>
            
            <p className="method-vpn">Для корректной работы сайта отключите VPN</p>
            
            <div className="method-timer">
              <p className="timer-label">
                <span className="pink-text">Успейте забрать тренировки со скидкой до 82%</span>
              </p>
              <div className="timer">
                <div className="timer-item">
                  <span className="timer-value">{String(time.hours).padStart(2, '0')}</span>
                  <span className="timer-label-text">часов</span>
                </div>
                <span className="timer-separator">:</span>
                <div className="timer-item">
                  <span className="timer-value">{String(time.minutes).padStart(2, '0')}</span>
                  <span className="timer-label-text">минут</span>
                </div>
                <span className="timer-separator">:</span>
                <div className="timer-item">
                  <span className="timer-value">{String(time.seconds).padStart(2, '0')}</span>
                  <span className="timer-label-text">секунд</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== БЕГУЩАЯ СТРОКА ===== */}
      <div className="marquee-wrapper">
        <div className="marquee marquee-right">
          <span>
            ● По Методу Усмановой уже тренируются более 590 000 женщин &nbsp;&nbsp;&nbsp;&nbsp;
            ● По Методу Усмановой уже тренируются более 590 000 женщин &nbsp;&nbsp;&nbsp;&nbsp;
            ● По Методу Усмановой уже тренируются более 590 000 женщин &nbsp;&nbsp;&nbsp;&nbsp;
            ● По Методу Усмановой уже тренируются более 590 000 женщин &nbsp;&nbsp;&nbsp;&nbsp;
            ● По Методу Усмановой уже тренируются более 590 000 женщин &nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>

      {/* ===== БЛОК: С МЕТОДОМ МЕНЯЕТСЯ НЕ ТОЛЬКО ФИГУРА ===== */}
      <section className="changes-section">
        <div className="container">
          <h2 className="changes-title">
            С МЕТОДОМ МЕНЯЕТСЯ <br />
            <span className="pink-text">НЕ ТОЛЬКО ФИГУРА</span>
          </h2>
          
          <p className="changes-subtitle">
            Тело это то, что можно взять под контроль уже за месяц.<br />
            А следом возвращается всё остальное.
          </p>

          <div className="white-box">
            <div className="changes-list">
              <div className="change-item">
                <img src="/images/ene.png" alt="Энергия" className="change-icon-img" />
                <div className="change-text">
                  <h3 className="change-item-title">Энергия</h3>
                  <p className="change-item-desc">
                    Утро начинается легко, сил хватает на весь день. Как пишут ученицы, «я просто ожила».
                  </p>
                </div>
              </div>

              <div className="change-item">
                <img src="/images/for.png" alt="Лёгкость и форма" className="change-icon-img" />
                <div className="change-text">
                  <h3 className="change-item-title">Лёгкость и форма</h3>
                  <p className="change-item-desc">
                    Уходят объёмы, одежда сидит свободнее, тело подтянуто.
                  </p>
                </div>
              </div>

              <div className="change-item">
                <img src="/images/yv.png" alt="Уверенность" className="change-icon-img" />
                <div className="change-text">
                  <h3 className="change-item-title">Уверенность</h3>
                  <p className="change-item-desc">
                    Спорт становится в кайф, а не в наказание. Появляется гордость за себя и привычка, которая остаётся.
                  </p>
                </div>
              </div>
            </div>

            <img src="/images/10.png" alt="Результат" className="changes-bottom-image" />
          </div>

          <button className="changes-btn" onClick={scrollToPricing}>
            ХОЧУ ТАК ЖЕ
          </button>

          <div className="pricing-full-card" ref={pricingRef}>
            <div className="pricing-full-content">
              <p className="pricing-vpn">Для корректной работы сайта отключите VPN</p>
              
              <h3 className="pricing-title-main">
                ВЫБЕРИТЕ ФОРМАТ <br />
                <span className="pink-text">И НАЧНИТЕ СЕГОДНЯ</span>
              </h3>
              
              <p className="pricing-subtitle-main">
                Чем раньше старт, тем больше успеете до конца лета.
              </p>

              <div className="pricing-timer-mini">
                <span className="pink-text">Цены вырастут через:</span>
                <span className="pricing-timer-mini-value">
                  {String(time.hours).padStart(2, '0')} часов: {String(time.minutes).padStart(2, '0')} минут: {String(time.seconds).padStart(2, '0')} секунды
                </span>
              </div>

              <div className="pricing-grid-main">
                {/* ЛЁГКИЙ СТАРТ */}
                <div className="pricing-card-main card-small">
                  <h4>Лёгкий старт</h4>
                  <div className="card-line"></div>
                  <p className="price-main">3 140 ₽</p>
                  <p className="discount-main">Скидка: 51%</p>
                  <p className="what-included">Что входит:</p>
                  <ul className="pricing-list">
                    <li>
                      <img src="/images/21.png" alt="check" className="pricing-icon" />
                      <span>Обновлённый Метод: 20 тренировок, питание по неделям, растяжка и восстановление</span>
                    </li>
                    <li>
                      <img src="/images/21.png" alt="check" className="pricing-icon" />
                      <span>5 лекций по питанию: уходит тяга к сладкому</span>
                    </li>
                  </ul>
                  <button className="pricing-btn-main" onClick={() => openModal('Лёгкий старт')}>
                    ЗАБРАТЬ НАБОР
                  </button>
                </div>

                {/* ПРЕОБРАЖЕНИЕ */}
                <div className="pricing-card-main popular-main card-medium">
                  <h4>Преображение</h4>
                  <div className="card-line"></div>
                  <span className="badge-main">ВЫБОР БОЛЬШИНСТВА</span>
                  <p className="price-main">5 490 ₽</p>
                  <p className="discount-main">Скидка: 75%</p>
                  <p className="what-included">Что входит:</p>
                  <ul className="pricing-list">
                    <li>
                      <img src="/images/21.png" alt="check" className="pricing-icon" />
                      <span>Обновлённый Метод: 20 тренировок, питание по неделям, растяжка и восстановление</span>
                    </li>
                    <li>
                      <img src="/images/21.png" alt="check" className="pricing-icon" />
                      <span>5 лекций по питанию: уходит тяга к сладкому</span>
                    </li>
                    <li>
                      <img src="/images/21.png" alt="check" className="pricing-icon" />
                      <span>Курс питания с Вероникой Гусаковой: 42 урока без диет</span>
                    </li>
                    <li>
                      <img src="/images/21.png" alt="check" className="pricing-icon" />
                      <span>5 тренировок Стаса Свободы: плоский живот и осанка через дыхание</span>
                    </li>
                  </ul>
                  <button className="pricing-btn-main" onClick={() => openModal('Преображение')}>
                    ЗАБРАТЬ НАБОР
                  </button>
                </div>

                {/* МАКСИМУМ */}
                <div className="pricing-card-main card-large">
                  <h4>Максимум</h4>
                  <div className="card-line"></div>
                  <span className="badge-max">МАКСИМАЛЬНЫЙ РЕЗУЛЬТАТ</span>
                  <p className="price-main">6 890 ₽</p>
                  <p className="discount-main">Скидка: 82%</p>
                  <p className="what-included">Что входит:</p>
                  <ul className="pricing-list">
                    <li>
                      <img src="/images/21.png" alt="check" className="pricing-icon" />
                      <span>Обновлённый Метод: 20 тренировок, питание по неделям, растяжка и восстановление</span>
                    </li>
                    <li>
                      <img src="/images/21.png" alt="check" className="pricing-icon" />
                      <span>5 лекций по питанию: уходит тяга к сладкому</span>
                    </li>
                    <li>
                      <img src="/images/21.png" alt="check" className="pricing-icon" />
                      <span>Курс питания с Вероникой Гусаковой: 42 урока без диет</span>
                    </li>
                    <li>
                      <img src="/images/21.png" alt="check" className="pricing-icon" />
                      <span>5 тренировок Стаса Свободы: плоский живот и осанка через дыхание</span>
                    </li>
                    <li>
                      <img src="/images/21.png" alt="check" className="pricing-icon" />
                      <span>Курс «Жиросжигающий»: три уровня по 45 дней на максимальное жиросжигание</span>
                    </li>
                  </ul>
                  <button className="pricing-btn-main" onClick={() => openModal('Максимум')}>
                    ЗАБРАТЬ НАБОР
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== МОДАЛЬНОЕ ОКНО ===== */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>×</button>
            
            <h2 className="modal-title">Оформить заявку</h2>
            <p className="modal-subtitle">
              Тариф: <span className="modal-tariff">{selectedTariff}</span>
            </p>
            
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="name">Ваше имя</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Иван Иванов"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+7 (999) 123-45-67"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="ivan@mail.ru"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="modal-submit-btn">
                Отправить заявку
              </button>
            </form>

            <p className="modal-footer">
              Нажимая кнопку, вы соглашаетесь с <a href="#">условиями обработки данных</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MethodPage;