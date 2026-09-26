import React, { useState } from 'react';
import { X, Calendar, CheckCircle, Wine, Sparkles, MapPin, Download, Clock, Users } from 'lucide-react';
import { CURATED_WINE_LIST } from '../data/restaurantData';
import { ReservationData, Dish } from '../types/restaurant';

// 1. Reservation Confirmation Modal
interface ReservationConfirmationModalProps {
  data: ReservationData | null;
  onClose: () => void;
}

export const ReservationConfirmationModal: React.FC<ReservationConfirmationModalProps> = ({ data, onClose }) => {
  if (!data) return null;

  const confirmationCode = `BE-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleDownloadCalendar = () => {
    // Generate a simple .ics file for calendar export
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Basil & Ember//Reservation Booking//EN
BEGIN:VEVENT
SUMMARY:Dinner at Basil & Ember (${data.partySize})
DESCRIPTION:Reservation confirmed for ${data.guestName} at Basil & Ember in SoHo NYC. Confirmation #${confirmationCode}. Seating: ${data.seatingArea}.
LOCATION:482 Mercer St, New York, NY 10013
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `basil-ember-reservation-${confirmationCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#1c1c19]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#ebe8e3] text-[#1c1c19] relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#56423d] hover:text-[#9d3d26] transition-colors rounded-full hover:bg-[#f6f3ee] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#9d3d26]"
          aria-label="Close reservation confirmation dialog"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-[#ebe8e3]">
          <div className="w-14 h-14 rounded-full bg-[#d5e5ca] text-[#3d4b37] flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-[#54624e]" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#9d3d26]">
              Tavolo Confermato
            </span>
            <h3 className="font-serif text-[24px] font-semibold text-[#1c1c19]">
              Your Table is Reserved
            </h3>
            <p className="text-[13px] text-[#56423d] mt-1">
              Confirmation Code: <strong className="text-[#9d3d26] tracking-wider">{confirmationCode}</strong>
            </p>
          </div>
        </div>

        {/* Details Card */}
        <div className="my-5 p-4 rounded-xl bg-[#f6f3ee] space-y-3 text-[13px] border border-[#ebe8e3]">
          <div className="flex items-center justify-between">
            <span className="text-[#56423d]">Guest Name:</span>
            <span className="font-semibold text-[#1c1c19]">{data.guestName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#56423d]">Party Size:</span>
            <span className="font-semibold text-[#1c1c19]">{data.partySize}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#56423d]">Date &amp; Time:</span>
            <span className="font-semibold text-[#1c1c19]">{data.date} • {data.timeSlot}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#56423d]">Atmosphere:</span>
            <span className="font-semibold text-[#9d3d26]">{data.seatingArea}</span>
          </div>
          <div className="flex items-center justify-between border-t border-[#ebe8e3] pt-2">
            <span className="text-[#56423d]">Location:</span>
            <span className="text-[#1c1c19]">482 Mercer St, SoHo NYC</span>
          </div>
        </div>

        <p className="text-[11px] text-[#8a726c] leading-relaxed mb-6">
          A confirmation SMS has been dispatched. Please inform us of any severe allergies or dietary preferences at least 24 hours prior to service. Tables are held for up to 15 minutes.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownloadCalendar}
            className="flex-1 py-3 px-4 rounded bg-[#f0ede9] text-[#1c1c19] text-[12px] font-semibold uppercase tracking-wider hover:bg-[#ebe8e3] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#9d3d26]" />
            <span>Add to Calendar</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded bg-[#9d3d26] text-white text-[12px] font-semibold uppercase tracking-wider hover:bg-[#bd553b] transition-colors cursor-pointer text-center"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. Curated Wine List Modal
interface WineListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WineListModal: React.FC<WineListModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#1c1c19]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#fcf9f4] rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#ebe8e3] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 bg-[#f0ede9] border-b border-[#ebe8e3] flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#9d3d26]">
              Sommelier Reserve • 1,200+ Selections
            </span>
            <h3 className="font-serif text-[22px] sm:text-[24px] font-semibold text-[#1c1c19]">
              Carta dei Vini &amp; Digestivi
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#56423d] hover:text-[#9d3d26] transition-colors rounded-full hover:bg-[#ebe8e3] cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Wine Categories */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {CURATED_WINE_LIST.map((section) => (
            <div key={section.category} className="space-y-4">
              <h4 className="font-serif text-[18px] font-semibold text-[#9d3d26] border-b border-[#ebe8e3] pb-2">
                {section.category}
              </h4>
              <div className="space-y-4">
                {section.wines.map((wine) => (
                  <div key={wine.name} className="flex flex-col space-y-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <div>
                        <span className="font-serif text-[16px] font-semibold text-[#1c1c19]">
                          {wine.name}
                        </span>
                        <span className="text-[12px] text-[#56423d] ml-2">
                          ({wine.region}, {wine.year})
                        </span>
                      </div>
                      <div className="text-right shrink-0 font-serif text-[15px] font-semibold text-[#1c1c19]">
                        <span className="text-[#82510b]">${wine.glass} gls</span>
                        <span className="mx-1 text-[#8a726c]">/</span>
                        <span>${wine.bottle} btl</span>
                      </div>
                    </div>
                    <p className="text-[12px] text-[#56423d] italic leading-snug">
                      {wine.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f0ede9] border-t border-[#ebe8e3] flex items-center justify-between text-[12px] text-[#56423d]">
          <span>Vintage availability subject to cellar allocation.</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-[#9d3d26] text-white text-[11px] font-semibold uppercase tracking-wider hover:bg-[#bd553b] transition-colors cursor-pointer"
          >
            Close Carta
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. Private Events Inquiry Modal
interface PrivateEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivateEventsModal: React.FC<PrivateEventsModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [guestCount, setGuestCount] = useState('12 - 24 Guests');
  const [eventType, setEventType] = useState('Private Celebration');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#1c1c19]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#ebe8e3] text-[#1c1c19] relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#56423d] hover:text-[#9d3d26] transition-colors rounded-full hover:bg-[#f6f3ee] cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 mb-5">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#9d3d26]">
            Salone Privato &amp; Buyouts
          </span>
          <h3 className="font-serif text-[22px] font-semibold text-[#1c1c19]">
            Inquire for Private Events
          </h3>
          <p className="text-[13px] text-[#56423d]">
            Hosting up to 24 guests in our secluded wine salon or full dining room buyouts up to 75 guests.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-xl bg-[#d5e5ca] text-[#3d4b37] text-center space-y-2 border border-[#bccbb2]">
            <CheckCircle className="w-8 h-8 mx-auto text-[#54624e]" />
            <p className="font-serif text-[18px] font-semibold">Inquiry Dispatched</p>
            <p className="text-[13px]">
              Our Events Director, Francesca Mancini, will review your request and connect with you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-[13px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#56423d] block mb-1">
                  Expected Guests
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full bg-[#f6f3ee] px-3 py-2 rounded border border-[#e5e2dd] focus:outline-none focus:ring-1 focus:ring-[#9d3d26]"
                >
                  <option>8 - 14 Guests (Hearth Salon)</option>
                  <option>15 - 24 Guests (Private Dining)</option>
                  <option>25 - 50 Guests (Partial Buyout)</option>
                  <option>50 - 75 Guests (Full Ristorante Buyout)</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#56423d] block mb-1">
                  Occasion Type
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full bg-[#f6f3ee] px-3 py-2 rounded border border-[#e5e2dd] focus:outline-none focus:ring-1 focus:ring-[#9d3d26]"
                >
                  <option>Private Celebration</option>
                  <option>Corporate Dinner</option>
                  <option>Wedding Rehearsal</option>
                  <option>Wine &amp; Truffle Tasting</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#56423d] block mb-1">
                  Contact Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#f6f3ee] px-3 py-2 rounded border border-[#e5e2dd] focus:outline-none focus:ring-1 focus:ring-[#9d3d26]"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#56423d] block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#f6f3ee] px-3 py-2 rounded border border-[#e5e2dd] focus:outline-none focus:ring-1 focus:ring-[#9d3d26]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#56423d] block mb-1">
                Event Vision &amp; Preferred Dates
              </label>
              <textarea
                rows={3}
                placeholder="Share any special preferences, tasting menu wishes, or wine pairings..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#f6f3ee] px-3 py-2 rounded border border-[#e5e2dd] focus:outline-none focus:ring-1 focus:ring-[#9d3d26]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded bg-[#9d3d26] text-white text-[12px] font-semibold uppercase tracking-wider hover:bg-[#bd553b] transition-colors cursor-pointer shadow-md"
            >
              Submit Private Event Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// 4. Dish Detail Modal
interface DishDetailModalProps {
  dish: Dish | null;
  onClose: () => void;
  onBookTable: () => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({ dish, onClose, onBookTable }) => {
  if (!dish) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#1c1c19]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#ebe8e3] text-[#1c1c19] relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md text-[#1c1c19] hover:text-[#9d3d26] transition-colors rounded-full shadow cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {dish.image && (
          <div className="h-56 w-full relative bg-[#f0ede9]">
            <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
            {dish.tag && (
              <span className="absolute bottom-3 left-4 px-3 py-1 rounded bg-[#d5e5ca] text-[#3d4b37] text-[11px] font-semibold uppercase tracking-wider">
                {dish.tag}
              </span>
            )}
          </div>
        )}

        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-serif text-[22px] font-semibold text-[#1c1c19]">
                {dish.name}
              </h3>
              {dish.origin && (
                <span className="text-[12px] text-[#56423d] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#9d3d26]" />
                  <span>Region: {dish.origin}</span>
                </span>
              )}
            </div>
            <span className="font-serif text-[24px] font-semibold text-[#9d3d26] shrink-0">
              ${dish.price}
            </span>
          </div>

          <p className="text-[14px] text-[#56423d] leading-relaxed">
            {dish.description}
          </p>

          {dish.pairing && (
            <div className="p-3.5 rounded-lg bg-[#f6f3ee] border border-[#ebe8e3] flex items-center gap-2.5 text-[13px]">
              <Wine className="w-4 h-4 text-[#82510b] shrink-0" />
              <div>
                <span className="text-[#8a726c] uppercase tracking-wider text-[10px] block font-semibold">
                  Recommended Sommelier Pairing
                </span>
                <span className="font-semibold text-[#1c1c19]">{dish.pairing}</span>
              </div>
            </div>
          )}

          <div className="pt-2 flex gap-3">
            <button
              onClick={() => {
                onClose();
                onBookTable();
              }}
              className="flex-1 py-3 rounded bg-[#9d3d26] text-white text-[12px] font-semibold uppercase tracking-wider hover:bg-[#bd553b] transition-colors cursor-pointer text-center"
            >
              Reserve Table to Taste
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 5. Legal / Privacy Modal
interface LegalModalProps {
  info: { title: string; content: string } | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ info, onClose }) => {
  if (!info) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#1c1c19]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#ebe8e3] text-[#1c1c19] relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#56423d] hover:text-[#9d3d26] transition-colors rounded-full hover:bg-[#f6f3ee] cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-serif text-[20px] font-semibold text-[#1c1c19] mb-3">
          {info.title}
        </h3>
        <p className="text-[14px] text-[#56423d] leading-relaxed mb-6">
          {info.content}
        </p>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded bg-[#f0ede9] text-[#1c1c19] text-[12px] font-semibold uppercase tracking-wider hover:bg-[#ebe8e3] transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};
