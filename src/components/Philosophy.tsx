import React from 'react';
import { PHILOSOPHY_PILLARS } from '../data/restaurantData';
import { Utensils, Leaf, Flame } from 'lucide-react';

export const Philosophy: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'restaurant':
        return <Utensils className="w-6 h-6 text-[#9d3d26]" />;
      case 'eco':
        return <Leaf className="w-6 h-6 text-[#54624e]" />;
      case 'local_fire_department':
        return <Flame className="w-6 h-6 text-[#bd553b]" />;
      default:
        return <Utensils className="w-6 h-6" />;
    }
  };

  return (
    <section id="philosophy" className="w-full bg-[#f0ede9] py-16 lg:py-24 border-y border-[#ebe8e3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9d3d26]">
            Craftsmanship &amp; Provenance
          </span>
          <h2 className="font-headline-lg text-[#1c1c19]">
            The Three Pillars of Basil &amp; Ember
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#56423d] leading-relaxed">
            We believe that great cuisine honors simplicity, allowing uncompromised agricultural ingredients to speak through refined technique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PHILOSOPHY_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="p-8 rounded-xl bg-white shadow-sm flex flex-col space-y-4 hover:-translate-y-1 transition-transform duration-300 border border-[#ebe8e3]"
            >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  pillar.number === '01'
                    ? 'bg-[#f0ede9]'
                    : pillar.number === '02'
                    ? 'bg-[#d5e5ca]'
                    : 'bg-[#ffdad2]'
                }`}
              >
                {getIcon(pillar.iconName)}
              </div>

              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#54624e]">
                {pillar.number} • {pillar.category}
              </span>

              <h3 className="font-serif text-[20px] font-semibold text-[#1c1c19]">
                {pillar.title}
              </h3>

              <p className="text-[13px] text-[#56423d] leading-relaxed flex-1">
                {pillar.description}
              </p>

              <div className="pt-4 border-t border-[#f0ede9] text-[11px] font-semibold text-[#82510b] uppercase tracking-wider flex items-center gap-1.5">
                <span>{pillar.specifications[0]}</span>
                <span className="text-[#ddc0ba]">•</span>
                <span>{pillar.specifications[1]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
