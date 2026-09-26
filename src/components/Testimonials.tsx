import React from 'react';
import { TESTIMONIALS } from '../data/restaurantData';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="w-full bg-[#fcf9f4] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9d3d26]">
            Voices &amp; Reviews
          </span>
          <h2 className="font-headline-lg text-[#1c1c19]">
            Acclaim from City &amp; Cellar
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-xl bg-[#f6f3ee] shadow-sm flex flex-col justify-between space-y-6 border border-[#ebe8e3] hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex text-[#82510b] gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#82510b]" />
                  ))}
                </div>

                <p className="font-serif text-[17px] sm:text-[18px] text-[#1c1c19] italic leading-relaxed">
                  “{t.quote}”
                </p>
              </div>

              <div className="flex flex-col border-t border-[#ebe8e3] pt-4">
                <span className="text-[13px] font-semibold uppercase tracking-wider text-[#1c1c19]">
                  {t.author}
                </span>
                <span className="text-[12px] text-[#56423d] mt-0.5">
                  {t.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
