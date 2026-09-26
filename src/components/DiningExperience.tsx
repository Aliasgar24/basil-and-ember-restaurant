import React from 'react';
import { RESTAURANT_IMAGES } from '../data/restaurantData';
import { ArrowRight, Sparkles } from 'lucide-react';

interface DiningExperienceProps {
  onInquirePrivateEvents: () => void;
}

export const DiningExperience: React.FC<DiningExperienceProps> = ({ onInquirePrivateEvents }) => {
  return (
    <section id="experience" className="w-full bg-[#f6f3ee] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-[#1c1c19] text-white">
          <div className="relative min-h-[520px] lg:h-[560px] w-full flex items-center">
            {/* Background Image */}
            <img
              src={RESTAURANT_IMAGES.interior}
              alt="Warm intimate dining room interior with amber lighting"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
              loading="lazy"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1c1c19] via-[#1c1c19]/75 to-transparent"></div>

            {/* Content */}
            <div className="relative z-10 p-6 sm:p-12 lg:p-16 flex flex-col justify-center max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#9d3d26] text-white self-start">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[11px] font-semibold uppercase tracking-widest">
                  Atmosphere &amp; Cellar
                </span>
              </div>

              <h2 className="font-headline-lg text-white">
                An Intimate Setting for Convivial Evenings
              </h2>

              <p className="text-[16px] sm:text-[17px] text-[#f3f0eb]/90 leading-relaxed font-sans">
                Designed with reclaimed brick, hand-planed walnut tables, and warm architectural amber lighting that evokes a subterranean wine cave in Montalcino. From our heated outdoor pergola terrace to the buzzing hearth counter, every vantage point invites lingering conversation.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-lg bg-[#31302d]/80 backdrop-blur-sm border border-white/10">
                  <span className="font-serif text-[24px] font-semibold text-[#ffdad2] block">
                    24 Seats
                  </span>
                  <span className="text-[12px] text-[#f3f0eb]/80">
                    Private Dining Salon
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-[#31302d]/80 backdrop-blur-sm border border-white/10">
                  <span className="font-serif text-[24px] font-semibold text-[#ffdad2] block">
                    8 Counter
                  </span>
                  <span className="text-[12px] text-[#f3f0eb]/80">
                    Chef's Hearth Counter
                  </span>
                </div>

                <div className="p-4 rounded-lg bg-[#31302d]/80 backdrop-blur-sm border border-white/10">
                  <span className="font-serif text-[24px] font-semibold text-[#ffdad2] block">
                    1,200+
                  </span>
                  <span className="text-[12px] text-[#f3f0eb]/80">
                    Cellar Selections
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onInquirePrivateEvents}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#9d3d26] text-white text-[12px] font-semibold uppercase tracking-wider hover:bg-[#bd553b] transition-colors cursor-pointer shadow-md"
                >
                  <span>Inquire for Private Events</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
