/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OurStory } from './components/OurStory';
import { SignatureDishes } from './components/SignatureDishes';
import { Philosophy } from './components/Philosophy';
import { MenuSection } from './components/MenuSection';
import { DiningExperience } from './components/DiningExperience';
import { Testimonials } from './components/Testimonials';
import { Gallery } from './components/Gallery';
import { ReservationSection } from './components/ReservationSection';
import { Footer } from './components/Footer';
import {
  ReservationConfirmationModal,
  WineListModal,
  PrivateEventsModal,
  DishDetailModal,
  LegalModal,
} from './components/Modals';
import { ReservationData, Dish } from './types/restaurant';

export default function App() {
  const [reservationData, setReservationData] = useState<ReservationData | null>(null);
  const [isWineListOpen, setIsWineListOpen] = useState(false);
  const [isPrivateEventsOpen, setIsPrivateEventsOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [legalModalInfo, setLegalModalInfo] = useState<{ title: string; content: string } | null>(null);

  const scrollToReservations = () => {
    const el = document.getElementById('reservations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex flex-col selection:bg-[#ffdad2] selection:text-[#3c0700]">
      {/* 1. Header with announcement, navigation, phone, and CTA */}
      <Header onReserveClick={scrollToReservations} />

      {/* Main Container with top offset for fixed header */}
      <main className="w-full pt-28">
        {/* 2. Hero Section */}
        <Hero
          onReserveClick={scrollToReservations}
          onExploreMenuClick={scrollToMenu}
        />

        {/* 3. Our Story Section */}
        <OurStory />

        {/* 4. Signature Dishes Section */}
        <SignatureDishes
          onDishSelect={(dish) => setSelectedDish(dish)}
          onViewMenuClick={scrollToMenu}
        />

        {/* 5. Philosophy Section */}
        <Philosophy />

        {/* 6. Interactive Categorized Menu Section */}
        <MenuSection
          onOpenWineList={() => setIsWineListOpen(true)}
          onDishSelect={(dish) => setSelectedDish(dish)}
        />

        {/* 7. Dining Experience Section (Dark Room / Wine Cellar / Pergola) */}
        <DiningExperience
          onInquirePrivateEvents={() => setIsPrivateEventsOpen(true)}
        />

        {/* 8. Testimonials Section */}
        <Testimonials />

        {/* 9. Asymmetric Image Gallery with Lightbox */}
        <Gallery />

        {/* 10. Interactive Reservation Section */}
        <ReservationSection
          onReservationComplete={(data) => setReservationData(data)}
        />
      </main>

      {/* 11. Footer with Hours, Location, Contact, Social & Newsletter */}
      <Footer
        onOpenLegal={(title, content) => setLegalModalInfo({ title, content })}
        onOpenWineList={() => setIsWineListOpen(true)}
        onOpenPrivateEvents={() => setIsPrivateEventsOpen(true)}
      />

      {/* Interactive Modals */}
      <ReservationConfirmationModal
        data={reservationData}
        onClose={() => setReservationData(null)}
      />

      <WineListModal
        isOpen={isWineListOpen}
        onClose={() => setIsWineListOpen(false)}
      />

      <PrivateEventsModal
        isOpen={isPrivateEventsOpen}
        onClose={() => setIsPrivateEventsOpen(false)}
      />

      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onBookTable={scrollToReservations}
      />

      <LegalModal
        info={legalModalInfo}
        onClose={() => setLegalModalInfo(null)}
      />
    </div>
  );
}
