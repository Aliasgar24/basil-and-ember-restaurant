import React, { useState } from 'react';
import { Send, CheckCircle, MapPin, Phone, Mail } from 'lucide-react';
import { RESTAURANT_IMAGES } from '../data/restaurantData';

interface FooterProps {
  onOpenLegal: (title: string, content: string) => void;
  onOpenWineList: () => void;
  onOpenPrivateEvents: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenWineList, onOpenPrivateEvents }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="w-full bg-[#f6f3ee] text-[#1c1c19] pt-16 pb-12 border-t border-[#ebe8e3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-[#ebe8e3]">
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-[24px] font-semibold text-[#1c1c19]">
                Basil &amp; Ember
              </span>
              <span className="text-[11px] tracking-[0.2em] text-[#56423d] uppercase font-semibold mt-1">
                Ristorante Italiano &amp; Forno
              </span>
            </div>

            <p className="text-[14px] text-[#56423d] max-w-sm leading-relaxed">
              Basil &amp; Ember is a contemporary celebration of Italian culinary traditions, handmade pasta, and wood-fired hearth cooking.
            </p>

            <div className="pt-2">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#1c1c19] block mb-2">
                Seasonal Newsletter &amp; Cellar Allocations
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 p-2.5 rounded bg-[#d5e5ca] text-[#3d4b37] text-[13px] border border-[#bccbb2]">
                  <CheckCircle className="w-4 h-4 text-[#54624e]" />
                  <span>Grazie! You have been added to our private table release list.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="bg-white text-[#1c1c19] px-3.5 py-2 text-[13px] rounded border border-[#ddc0ba] focus:outline-none focus:ring-1 focus:ring-[#9d3d26] flex-1 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
                  />
                  <button
                    type="submit"
                    className="bg-[#9d3d26] text-white hover:bg-[#bd553b] px-4 py-2 rounded text-[12px] font-semibold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-[#1c1c19]">
              Navigation
            </h4>
            <nav className="flex flex-col space-y-2 text-[13px]">
              <button
                onClick={() => scrollTo('home')}
                className="text-left text-[#56423d] hover:text-[#9d3d26] transition-colors cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => scrollTo('menu')}
                className="text-left text-[#56423d] hover:text-[#9d3d26] transition-colors cursor-pointer"
              >
                Menu
              </button>
              <button
                onClick={() => scrollTo('dishes')}
                className="text-left text-[#56423d] hover:text-[#9d3d26] transition-colors cursor-pointer"
              >
                Tasting Menu
              </button>
              <button
                onClick={onOpenPrivateEvents}
                className="text-left text-[#56423d] hover:text-[#9d3d26] transition-colors cursor-pointer"
              >
                Private Events
              </button>
              <button
                onClick={onOpenWineList}
                className="text-left text-[#56423d] hover:text-[#9d3d26] transition-colors cursor-pointer"
              >
                Wine Cellar
              </button>
              <button
                onClick={() => scrollTo('reviews')}
                className="text-left text-[#56423d] hover:text-[#9d3d26] transition-colors cursor-pointer"
              >
                Press &amp; Reviews
              </button>
              <button
                onClick={() => scrollTo('reservations')}
                className="text-left text-[#56423d] hover:text-[#9d3d26] transition-colors cursor-pointer"
              >
                Reservations
              </button>
            </nav>
          </div>

          {/* Hours & Location Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-[#1c1c19]">
              Hours &amp; Location
            </h4>
            <div className="text-[13px] text-[#56423d] space-y-3 leading-relaxed">
              <div>
                <p className="font-semibold text-[#1c1c19]">Lunch Service</p>
                <p>Wed – Sun: 12:00pm – 3:00pm</p>
              </div>
              <div>
                <p className="font-semibold text-[#1c1c19]">Dinner Service</p>
                <p>Mon – Sun: 5:00pm – 11:00pm</p>
              </div>
              <div>
                <p className="font-semibold text-[#1c1c19]">Address</p>
                <p>482 Mercer Street, SoHo</p>
                <p>New York, NY 10013</p>
              </div>
            </div>
          </div>

          {/* Inquiries & Social Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[13px] font-semibold uppercase tracking-wider text-[#1c1c19]">
              Inquiries &amp; Social
            </h4>
            <div className="text-[13px] text-[#56423d] space-y-2">
              <p>
                <a
                  href="mailto:reservations@basilandember.com"
                  className="hover:text-[#9d3d26] transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#9d3d26]" />
                  <span>reservations@basilandember.com</span>
                </a>
              </p>
              <p>
                <a
                  href="tel:+12125550198"
                  className="hover:text-[#9d3d26] transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#9d3d26]" />
                  <span>+1 (212) 555-0198</span>
                </a>
              </p>
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#1c1c19] block mb-2">
                Connect &amp; Reserves
              </span>
              <div className="flex flex-wrap gap-2 text-[12px] text-[#56423d]">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#9d3d26] transition-colors"
                >
                  Instagram
                </a>
                <span className="text-[#ddc0ba]">•</span>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#9d3d26] transition-colors"
                >
                  Facebook
                </a>
                <span className="text-[#ddc0ba]">•</span>
                <button
                  onClick={() => scrollTo('reservations')}
                  className="hover:text-[#9d3d26] transition-colors cursor-pointer"
                >
                  Resy
                </button>
                <span className="text-[#ddc0ba]">•</span>
                <span className="text-[#82510b] font-semibold">Michelin Guide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Sub-bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#56423d] gap-4">
          <p>© 2024 Basil &amp; Ember Ristorante. All rights reserved.</p>
          <div className="flex gap-6">
            <button
              onClick={() =>
                onOpenLegal(
                  'Privacy Policy',
                  'Basil & Ember is committed to protecting your privacy. We strictly use guest information for table reservations, dietary safety, and communication directly related to your dining experience. We never sell or distribute your data to third parties.'
                )
              }
              className="hover:text-[#9d3d26] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() =>
                onOpenLegal(
                  'Terms of Service',
                  'Table reservations are held for 15 minutes past booking time. For parties of 6 or more and special tasting menus, cancellations made within 24 hours of booking are subject to a $50 per guest fee. Corkage fee is $65 per 750ml bottle, maximum 2 bottles per table.'
                )
              }
              className="hover:text-[#9d3d26] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() =>
                onOpenLegal(
                  'Accessibility Statement',
                  'Basil & Ember is committed to ensuring digital accessibility for people of all abilities. Our dining salon and restrooms are fully ADA wheelchair accessible. For personalized assistance or dietary queries, please call us directly at +(1) 212 555 0198.'
                )
              }
              className="hover:text-[#9d3d26] transition-colors cursor-pointer"
            >
              Accessibility
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
