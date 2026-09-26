import React, { useState, useEffect } from 'react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GalleryItem } from '../types/restaurant';

export const Gallery: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  const activeItem: GalleryItem | null =
    selectedImageIndex !== null ? GALLERY_ITEMS[selectedImageIndex] : null;

  return (
    <section id="gallery" className="w-full bg-[#f0ede9] py-16 lg:py-24 border-y border-[#ebe8e3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-baseline justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9d3d26]">
              La Nostra Galleria
            </span>
            <h2 className="font-headline-lg text-[#1c1c19]">
              Moments Around the Table
            </h2>
          </div>
          <span className="text-[12px] text-[#56423d] uppercase tracking-wider font-semibold">
            @basilandember • SoHo NYC
          </span>
        </div>

        {/* Asymmetrical Editorial Mosaic */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className={`${item.spanClass} rounded-xl overflow-hidden shadow-sm group relative cursor-pointer bg-[#e5e2dd] border border-[#ebe8e3]`}
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#1c1c19]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                <div className="text-center text-white space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <Maximize2 className="w-6 h-6 mx-auto mb-2 text-[#ffdad2]" />
                  <p className="font-serif text-[17px] font-semibold">{item.title}</p>
                  <p className="text-[11px] text-[#f3f0eb]/80">{item.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#1c1c19]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer z-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer z-50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox content card */}
          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeItem.image}
              alt={activeItem.alt}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl border border-white/10"
            />
            <div className="mt-4 text-center text-white space-y-1 max-w-xl">
              <h3 className="font-serif text-[20px] font-semibold text-[#ffdad2]">
                {activeItem.title}
              </h3>
              <p className="text-[13px] text-[#f3f0eb]/80">
                {activeItem.subtitle}
              </p>
              <span className="text-[11px] text-[#ddc0ba] block pt-1">
                Image {selectedImageIndex! + 1} of {GALLERY_ITEMS.length} • Press ESC to close
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
