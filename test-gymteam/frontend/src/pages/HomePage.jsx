// src/pages/HomePage.jsx
import React from 'react';
import Header from '../components/Header';
import AchievementsCarousel from '../components/AchievementsCarousel';
import TrustSection from '../components/TrustSection';
import ProgramsSection from '../components/ProgramsSection';   // ← импорт

function HomePage() {
  return (
    <main className="home-page">
      <Header />
      <AchievementsCarousel />
      <TrustSection />
      <ProgramsSection />   {/* ← добавляем */}
    </main>
  );
}

export default HomePage;