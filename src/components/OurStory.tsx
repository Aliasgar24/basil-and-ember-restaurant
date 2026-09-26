import React from 'react';
import { RESTAURANT_IMAGES } from '../data/restaurantData';
import { Sparkles, Utensils } from 'lucide-react';

export const OurStory: React.FC = () => {
  return (
    <section id="story" className="w-full bg-[#f6f3ee] py-16 lg:py-24 border-y border-[#ebe8e3]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Text Philosophy */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded bg-[#d5e5ca] text-[#3d4b37]">
              <Sparkles className="w-3.5 h-3.5 text-[#54624e]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em]">
                An Artisanal Sanctuary
              </span>
            </div>

            <h2 className="font-headline-lg text-[#1c1c19]">
              Rooted in Emilia-Romagna,{' '}
              <span className="italic font-normal text-[#9d3d26]">inspired by modern simplicity.</span>
            </h2>

            <div className="space-y-4 text-[#56423d] text-[15px] sm:text-[16px] leading-relaxed">
              <p>
                Founded by Chef Lorenzo Moretti in SoHo, Basil & Ember bridges ancestral Northern Italian craft with the vitality of Lower Manhattan. Our culinary ethos roots itself in centuries-old dough hydration methods preserved across Emilia-Romagna, paired with primal live-fire cooking drawn from rustic Tuscan trattorias.
              </p>
              <p>
                Every morning, our glass-walled pasta counter comes alive with stone-ground heritage flours and farm-fresh organic yolk ribbons, rolled entirely by hand before meeting wood-fired reductions that capture the deep essence of fire, smoke, and soil.
              </p>
            </div>

            {/* Chef Signature & Provenance Card */}
            <div className="p-6 rounded-lg bg-[#ebe8e3] border border-[#ddc0ba]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9d3d26]">
                  Philosophy &amp; Provenance
                </span>
                <p className="font-serif text-[18px] sm:text-[20px] font-semibold text-[#1c1c19]">
                  Crafting memories since 2018 in historic SoHo.
                </p>
              </div>
              <div className="flex flex-col items-start sm:items-end shrink-0 border-t sm:border-t-0 sm:border-l border-[#ddc0ba]/60 pt-3 sm:pt-0 sm:pl-6">
                <span className="font-serif text-[26px] italic text-[#9d3d26] leading-none">
                  Lorenzo Moretti
                </span>
                <span className="text-[11px] text-[#56423d] uppercase tracking-wider font-semibold mt-1">
                  Executive Chef &amp; Co-Founder
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full h-[420px] sm:h-[480px] rounded-xl overflow-hidden shadow-lg bg-[#f0ede9] group">
              <img
                src={RESTAURANT_IMAGES.interior}
                alt="Moody dining room interior with amber lighting and terracotta details"
                className="w-full h-full object-cover transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c19]/60 via-transparent to-transparent pointer-events-none"></div>

              {/* Atmosphere Card */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-md p-4 rounded-lg shadow-sm border border-[#ebe8e3]">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#9d3d26] mb-1">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Atmosphere</span>
                </div>
                <p className="font-serif text-[18px] font-semibold text-[#1c1c19]">
                  The Open Kitchen Counter
                </p>
                <p className="text-[12px] text-[#56423d] mt-1 leading-snug">
                  Watch handmade ribbons meet the embers of our live-fire beechwood oven.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
