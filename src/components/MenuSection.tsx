import React, { useState } from 'react';
import { ALL_MENU_ITEMS } from '../data/restaurantData';
import { Wine, Leaf, Wine as WineGlass, Download } from 'lucide-react';
import { Dish } from '../types/restaurant';

interface MenuSectionProps {
  onOpenWineList: () => void;
  onDishSelect?: (dish: Dish) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onOpenWineList, onDishSelect }) => {
  const [activeTab, setActiveTab] = useState<'pasta' | 'antipasti' | 'pizza' | 'secondi' | 'dolci'>('pasta');

  const categories = [
    { key: 'pasta', label: 'Pasta Fatta a Mano' },
    { key: 'antipasti', label: 'Antipasti' },
    { key: 'pizza', label: 'Pizze al Forno' },
    { key: 'secondi', label: 'Secondi Piatti' },
    { key: 'dolci', label: 'Dolci' },
  ] as const;

  const currentDishes = ALL_MENU_ITEMS[activeTab];

  return (
    <section id="menu" className="w-full bg-[#fcf9f4] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-baseline justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9d3d26]">
              Carta delle Pietanze
            </span>
            <h2 className="font-headline-lg text-[#1c1c19]">
              Dinner Tasting &amp; À la Carte
            </h2>
          </div>
          <p className="text-[13px] text-[#56423d] max-w-sm">
            All dishes prepared fresh to order with house-pressed oils and estate vinegar reserves.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 pb-2">
          {categories.map((cat) => {
            const isActive = activeTab === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveTab(cat.key)}
                className={`px-5 py-2.5 rounded-full text-[12px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#9d3d26] text-white shadow-sm'
                    : 'bg-[#f0ede9] text-[#1c1c19] hover:bg-[#ebe8e3]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Menu Panel */}
        <div className="p-6 sm:p-10 rounded-2xl bg-white shadow-sm border border-[#ebe8e3]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentDishes.map((dish) => (
              <div
                key={dish.id}
                onClick={() => onDishSelect?.(dish)}
                className="flex flex-col justify-between space-y-2.5 p-4 rounded-lg hover:bg-[#fcf9f4] transition-colors border border-transparent hover:border-[#ebe8e3] cursor-pointer group"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="font-serif text-[18px] font-semibold text-[#1c1c19] group-hover:text-[#9d3d26] transition-colors">
                      {dish.name}
                    </h4>
                    <span className="font-serif text-[19px] font-semibold text-[#9d3d26] shrink-0">
                      ${dish.price}
                    </span>
                  </div>

                  <p className="text-[13px] text-[#56423d] mt-1 leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px]">
                  {dish.tag && (
                    <span className="px-2 py-0.5 rounded bg-[#f0ede9] text-[#56423d] font-semibold">
                      {dish.tag}
                    </span>
                  )}
                  {dish.pairing && (
                    <span className="text-[#82510b] flex items-center gap-1 font-semibold ml-auto">
                      <Wine className="w-3 h-3" />
                      <span>Pair: {dish.pairing}</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action Bar */}
          <div className="mt-8 pt-8 border-t border-[#f0ede9] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[#56423d] text-[13px]">
              <Leaf className="w-4 h-4 text-[#54624e]" />
              <span>Custom dietary accommodations gladly prepared with 24 hours advance notice.</span>
            </div>

            <button
              type="button"
              onClick={onOpenWineList}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-[#f0ede9] text-[12px] font-semibold uppercase tracking-wider text-[#1c1c19] hover:bg-[#ebe8e3] hover:text-[#9d3d26] transition-colors cursor-pointer"
            >
              <WineGlass className="w-4 h-4 text-[#9d3d26]" />
              <span>Explore Wine &amp; Cocktails List</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
