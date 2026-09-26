import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, User } from 'lucide-react';
import { RESTAURANT_IMAGES } from '../data/restaurantData';

interface HeaderProps {
  onReserveClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReserveClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      } else {
        setScrollProgress(0);
      }

      const sections = ['home', 'story', 'dishes', 'philosophy', 'menu', 'experience', 'reviews', 'gallery', 'reservations'];
      const scrollPosition = window.scrollY + 140;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Menu', href: '#menu', id: 'menu' },
    { label: 'Our Story', href: '#story', id: 'story' },
    { label: 'Philosophy', href: '#philosophy', id: 'philosophy' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar at very top of viewport */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] bg-transparent pointer-events-none"
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page reading and scroll progress"
      >
        <div
          className="h-full bg-[#9d3d26] transition-[width] duration-150 ease-out shadow-[0_0_8px_rgba(157,61,38,0.4)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 bg-[#fcf9f4]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-all">
      {/* Top Seasonal Announcement Banner */}
      <div className="bg-[#f0ede9] text-[#1c1c19] py-2 px-4 sm:px-6 text-center border-b border-[#ebe8e3]">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-[11px] sm:text-[12px] font-semibold tracking-widest uppercase">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#9d3d26]" aria-hidden="true"></span>
          <span className="truncate">Now accepting seasonal reservations for autumn & winter tasting menus</span>
          <button
            type="button"
            onClick={() => {
              onReserveClick();
              const el = document.getElementById('reservations');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label="Book a table for the autumn and winter seasonal tasting menus"
            className="ml-2 underline underline-offset-4 text-[#9d3d26] hover:text-[#56423d] transition-colors shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#9d3d26] focus:ring-offset-1 rounded-sm"
          >
            Book Table
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          aria-label="Basil & Ember Ristorante Italiano & Forno — Return to home section"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#9d3d26] focus:ring-offset-2 rounded"
        >
          <img
            src={RESTAURANT_IMAGES.logo}
            alt="Basil & Ember Emblem"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            onError={(e) => {
              // Fallback to elegant monogram if CDN fails
              const target = e.currentTarget;
              target.style.display = 'none';
            }}
          />
          <div className="flex flex-col">
            <span className="font-serif text-[22px] font-semibold tracking-tight text-[#1c1c19] group-hover:text-[#9d3d26] transition-colors">
              Basil & Ember
            </span>
            <span className="text-[10px] tracking-[0.2em] text-[#56423d] uppercase font-semibold">
              Ristorante Italiano & Forno
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation" className="hidden xl:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                aria-label={`Scroll to ${item.label} section`}
                aria-current={isActive ? 'page' : undefined}
                className={`text-[12px] font-semibold uppercase tracking-wider py-1 transition-all focus:outline-none focus:ring-2 focus:ring-[#9d3d26] rounded-sm ${
                  isActive
                    ? 'text-[#9d3d26] border-b-2 border-[#9d3d26]'
                    : 'text-[#56423d] hover:text-[#9d3d26]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href="tel:+12125550198"
            aria-label="Call Basil & Ember restaurant concierge at +1 (212) 555-0198"
            className="hidden md:flex items-center gap-1.5 text-[12px] font-semibold text-[#56423d] hover:text-[#9d3d26] transition-colors focus:outline-none focus:ring-2 focus:ring-[#9d3d26] rounded-sm"
          >
            <Phone className="w-3.5 h-3.5 text-[#9d3d26]" aria-hidden="true" />
            <span className="text-[11px] text-[#56423d] tracking-wider uppercase mr-1">Tel:</span>
            +(1) 212 555 0198
          </a>

          <button
            type="button"
            onClick={() => {
              onReserveClick();
              const el = document.getElementById('reservations');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label="Reserve a Table at Basil & Ember"
            className="bg-[#9d3d26] text-white hover:bg-[#bd553b] px-4 sm:px-5 py-2.5 rounded font-sans text-[12px] font-semibold uppercase tracking-wider transition-all duration-200 transform hover:-translate-y-0.5 shadow-[0_1px_8px_rgba(0,0,0,0.06)] flex items-center gap-1.5 cursor-pointer whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#9d3d26] focus:ring-offset-2"
          >
            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reserve a Table</span>
          </button>

          <button
            type="button"
            className="hidden sm:flex w-8 h-8 rounded-full bg-[#9d3d26] items-center justify-center shrink-0 text-white cursor-pointer hover:bg-[#bd553b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#9d3d26] focus:ring-offset-2"
            title="Guest Profile / VIP Booking"
            aria-label="Guest Profile and VIP booking concierge"
            onClick={() => {
              const el = document.getElementById('reservations');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <User className="w-4 h-4" aria-hidden="true" />
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            className="xl:hidden p-2 text-[#56423d] hover:text-[#9d3d26] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#9d3d26] rounded"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="xl:hidden fixed inset-x-0 top-[120px] bottom-0 bg-[#fcf9f4] border-t border-[#ebe8e3] p-6 overflow-y-auto flex flex-col justify-between shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <nav aria-label="Mobile Menu Links" className="flex flex-col space-y-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  aria-label={`Navigate to ${item.label} section`}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-[15px] font-medium tracking-wide py-2.5 border-b border-[#f0ede9] flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#9d3d26] rounded px-1 ${
                    isActive ? 'text-[#9d3d26] font-semibold' : 'text-[#1c1c19] hover:text-[#9d3d26]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-[#8a726c] font-serif" aria-hidden="true">→</span>
                </a>
              );
            })}
          </nav>

          <div className="pt-8 border-t border-[#ebe8e3] flex flex-col space-y-4">
            <div className="text-sm text-[#56423d] space-y-1">
              <p className="font-semibold text-[#1c1c19]">Hours of Hospitality</p>
              <p>Dinner: Mon – Sun 5:00pm – 11:00pm</p>
              <p>Lunch: Wed – Sun 12:00pm – 3:00pm</p>
              <p className="pt-1">482 Mercer Street, SoHo, NY</p>
            </div>

            <a
              href="tel:+12125550198"
              aria-label="Call Basil & Ember restaurant at +1 (212) 555-0198"
              className="inline-flex items-center gap-2 text-sm text-[#9d3d26] font-medium focus:outline-none focus:ring-2 focus:ring-[#9d3d26] rounded py-1"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>+(1) 212 555 0198</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onReserveClick();
                const el = document.getElementById('reservations');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-label="Proceed to reserve a table at Basil & Ember"
              className="w-full py-3.5 rounded bg-[#9d3d26] text-white font-sans text-xs font-semibold uppercase tracking-wider text-center focus:outline-none focus:ring-2 focus:ring-[#9d3d26] focus:ring-offset-2"
            >
              Reserve a Table
            </button>
          </div>
        </div>
      )}
      </header>
    </>
  );
};
