import React from 'react';
import { Calendar, ArrowRight, Flame } from 'lucide-react';
import { RESTAURANT_IMAGES } from '../data/restaurantData';

interface HeroProps {
  onReserveClick: () => void;
  onExploreMenuClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onReserveClick, onExploreMenuClick }) => {
  return (
    <section id="home" className="relative w-full overflow-hidden bg-[#fcf9f4] pb-12 lg:pb-20 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-4 lg:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Editorial Text Column */}
          <div className="lg:col-span-6 flex flex-col space-y-6 z-10">
            {/* Kicker Tag */}
            <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-[#ebe8e3] text-[#82510b] border border-[#ddc0ba]/40">
              <Flame className="w-3.5 h-3.5 fill-[#82510b]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
                Established 2018 • SoHo, New York
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display-lg text-[#1c1c19] tracking-tight">
              Italian tradition,{' '}
              <span className="italic font-normal text-[#9d3d26]">reimagined.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-[16px] sm:text-[18px] text-[#56423d] max-w-xl leading-relaxed font-sans">
              Handmade pasta, wood-fired flavors, and seasonal ingredients — served with warmth in the heart of the city.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onReserveClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded bg-[#9d3d26] text-white text-[12px] font-semibold uppercase tracking-wider transition-all duration-200 shadow-md hover:-translate-y-0.5 hover:bg-[#bd553b] cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Table</span>
              </button>

              <button
                onClick={onExploreMenuClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded bg-[#f0ede9] text-[#1c1c19] text-[12px] font-semibold uppercase tracking-wider transition-all duration-200 hover:bg-[#ebe8e3] cursor-pointer"
              >
                <span>Explore Our Menu</span>
                <ArrowRight className="w-4 h-4 text-[#9d3d26]" />
              </button>
            </div>

            {/* Micro Rating Highlights */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#ebe8e3]/80">
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-[#9d3d26] uppercase tracking-widest">
                  Guide
                </span>
                <span className="font-serif text-[20px] font-semibold text-[#1c1c19] mt-0.5">
                  Michelin
                </span>
                <span className="text-[12px] text-[#56423d]">
                  Selected 2023 & 2024
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-[#9d3d26] uppercase tracking-widest">
                  Heritage
                </span>
                <span className="font-serif text-[20px] font-semibold text-[#1c1c19] mt-0.5">
                  100%
                </span>
                <span className="text-[12px] text-[#56423d]">
                  House-Milled Grains
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-[#9d3d26] uppercase tracking-widest">
                  Cellar
                </span>
                <span className="font-serif text-[20px] font-semibold text-[#1c1c19] mt-0.5">
                  Best Of
                </span>
                <span className="text-[12px] text-[#56423d]">
                  Wine Spectator Award
                </span>
              </div>
            </div>
          </div>

          {/* Hero Photographic Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[560px] rounded-xl overflow-hidden shadow-xl bg-[#ebe8e3] group">
              <img
                src={RESTAURANT_IMAGES.tagliatelle}
                alt="Handmade Tagliatelle with shaved black truffle and aged parmigiano"
                className="w-full h-full object-cover transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c19]/60 via-transparent to-transparent pointer-events-none"></div>

              {/* Bottom dish card */}
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 p-4 rounded-lg bg-white/95 backdrop-blur-md flex items-center justify-between shadow-sm border border-[#ebe8e3]">
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9d3d26]">
                    Dish of the Season
                  </span>
                  <span className="font-serif text-[18px] sm:text-[21px] font-semibold text-[#1c1c19]">
                    Tagliatelle al Tartufo
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-serif text-[22px] font-semibold text-[#9d3d26]">
                    $42
                  </span>
                  <span className="block text-[11px] text-[#56423d] font-medium">
                    Fresh Norcia Truffle
                  </span>
                </div>
              </div>
            </div>

            {/* Hearth Tag Overlay */}
            <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2 bg-[#82510b] text-white px-4 py-2 rounded shadow-lg">
              <Flame className="w-4 h-4 fill-white text-white" />
              <span className="text-[11px] font-semibold tracking-widest uppercase">
                900° Beechwood Hearth
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
