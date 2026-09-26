import React from 'react';
import { ArrowRight, Wine, MapPin } from 'lucide-react';
import { SIGNATURE_DISHES } from '../data/restaurantData';
import { Dish } from '../types/restaurant';

interface SignatureDishesProps {
  onDishSelect?: (dish: Dish) => void;
  onViewMenuClick: () => void;
}

export const SignatureDishes: React.FC<SignatureDishesProps> = ({ onDishSelect, onViewMenuClick }) => {
  return (
    <section id="dishes" className="w-full bg-[#fcf9f4] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="flex flex-col space-y-2 max-w-2xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9d3d26]">
              Il Nostro Menu Degustazione
            </span>
            <h2 className="font-headline-lg text-[#1c1c19]">
              Curated Signature Dishes
            </h2>
            <p className="text-[15px] text-[#56423d]">
              Every plate tells a story of terroir, heritage, and time-honored artisanal craft.
            </p>
          </div>

          <button
            onClick={onViewMenuClick}
            className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-[#9d3d26] hover:text-[#56423d] transition-colors self-start md:self-end cursor-pointer group"
          >
            <span>View Seasonal Tasting Menu</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4 Food Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SIGNATURE_DISHES.map((dish) => (
            <div
              key={dish.id}
              onClick={() => onDishSelect?.(dish)}
              className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#ebe8e3] cursor-pointer"
            >
              {/* Image Frame */}
              <div className="relative h-64 overflow-hidden bg-[#f0ede9]">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {dish.tag && (
                  <span
                    className={`absolute top-3 left-3 px-2.5 py-1 rounded text-[11px] font-semibold uppercase tracking-wider ${
                      dish.tag === 'Wood-Fired Hearth'
                        ? 'bg-[#82510b] text-white'
                        : 'bg-[#d5e5ca] text-[#3d4b37]'
                    }`}
                  >
                    {dish.tag}
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-[19px] font-semibold text-[#1c1c19] group-hover:text-[#9d3d26] transition-colors">
                      {dish.name}
                    </h3>
                    <span className="font-serif text-[20px] font-semibold text-[#9d3d26] shrink-0">
                      ${dish.price}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#56423d] leading-relaxed line-clamp-3">
                    {dish.description}
                  </p>
                </div>

                {/* Footer Origin & Pairing */}
                <div className="pt-3 border-t border-[#f0ede9] flex items-center justify-between text-[11px] text-[#56423d] font-medium">
                  {dish.origin && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#8a726c]" />
                      <span>{dish.origin}</span>
                    </span>
                  )}
                  {dish.pairing && (
                    <span className="text-[#82510b] flex items-center gap-1 font-semibold">
                      <Wine className="w-3 h-3" />
                      <span>Pair: {dish.pairing}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
