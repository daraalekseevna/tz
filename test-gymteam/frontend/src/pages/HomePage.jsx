// src/pages/HomePage.jsx
import React from 'react';
import Header from '../components/Header';
import AchievementsCarousel from '../components/AchievementsCarousel';
import TrustSection from '../components/TrustSection';   // ← импорт

function HomePage() {
  return (
    <main className="home-page">
      <Header />
      <AchievementsCarousel />
      <TrustSection />   {/* ← добавляем */}
    </main>
  );
}

export default HomePage;