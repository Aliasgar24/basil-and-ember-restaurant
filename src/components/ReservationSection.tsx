import React, { useState, useRef } from 'react';
import { Phone, MapPin, Calendar, Clock, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { ReservationData } from '../types/restaurant';

interface ReservationSectionProps {
  onReservationComplete: (data: ReservationData) => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({ onReservationComplete }) => {
  const [partySize, setPartySize] = useState('2 Guests');
  const [diningDate, setDiningDate] = useState('Tonight (Limited)');
  const [preferredTime, setPreferredTime] = useState('7:30 PM (Main Salon)');
  const [seatingArea, setSeatingArea] = useState<'Main Dining Room' | 'Hearth Chef Counter' | 'Outdoor Heated Loggia'>('Main Dining Room');
  
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  
  const [errors, setErrors] = useState<{ guestName?: string; guestEmail?: string }>({});
  const [touched, setTouched] = useState<{ guestName?: boolean; guestEmail?: boolean }>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inlineSuccess, setInlineSuccess] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const validate = (nameVal: string, emailVal: string) => {
    const newErrors: { guestName?: string; guestEmail?: string } = {};

    if (!nameVal.trim()) {
      newErrors.guestName = 'Guest name is required to secure your table reservation.';
    } else if (nameVal.trim().length < 2) {
      newErrors.guestName = 'Please enter a valid guest name (at least 2 characters).';
    }

    if (!emailVal.trim()) {
      newErrors.guestEmail = 'Guest email is required to receive instant booking confirmation.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal.trim())) {
      newErrors.guestEmail = 'Please provide a valid email format (e.g. guest@domain.com).';
    }

    return newErrors;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setGuestName(val);
    if (touched.guestName || submitAttempted) {
      const currentErrors = validate(val, guestEmail);
      setErrors((prev) => ({ ...prev, guestName: currentErrors.guestName }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setGuestEmail(val);
    if (touched.guestEmail || submitAttempted) {
      const currentErrors = validate(guestName, val);
      setErrors((prev) => ({ ...prev, guestEmail: currentErrors.guestEmail }));
    }
  };

  const handleBlur = (field: 'guestName' | 'guestEmail') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const currentErrors = validate(guestName, guestEmail);
    setErrors((prev) => ({ ...prev, [field]: currentErrors[field] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setTouched({ guestName: true, guestEmail: true });

    const validationErrors = validate(guestName, guestEmail);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Focus first error field for screen readers and keyboard users
      if (validationErrors.guestName) {
        nameInputRef.current?.focus();
      } else if (validationErrors.guestEmail) {
        emailInputRef.current?.focus();
      }
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setInlineSuccess(true);
      onReservationComplete({
        partySize,
        date: diningDate,
        timeSlot: preferredTime,
        seatingArea,
        guestName: guestName.trim(),
        guestEmail: guestEmail.trim(),
        guestPhone: guestPhone.trim() || '+(1) 212 555 0198',
      });
    }, 600);
  };

  return (
    <section id="reservations" aria-labelledby="reservations-heading" className="w-full bg-[#fcf9f4] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="rounded-2xl bg-[#31302d] text-[#f3f0eb] p-6 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden">
          {/* Ambient Warm Hearth Glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#9d3d26]/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Text Information Column */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ffdad2]">
                Prenotazioni
              </span>
              <h2 id="reservations-heading" className="font-headline-lg text-white leading-tight">
                Your table is waiting.
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#f3f0eb]/80 leading-relaxed font-sans">
                Reservations release 30 days in advance at 10:00 AM EST. We gladly reserve half of our counter seating for spontaneous walk-in guests every evening.
              </p>

              <div className="pt-3 flex flex-col space-y-3 text-[13px] text-[#f3f0eb]/90 border-t border-white/10">
                <a
                  href="tel:+12125550198"
                  aria-label="Call Basil & Ember concierge and private events at +1 (212) 555-0198"
                  className="flex items-center gap-2.5 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#ffdad2] rounded py-0.5"
                >
                  <Phone className="w-4 h-4 text-[#ffdad2] shrink-0" aria-hidden="true" />
                  <span>Concierge &amp; Private Events: +(1) 212 555 0198</span>
                </a>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#ffdad2] shrink-0" aria-hidden="true" />
                  <span>482 Mercer Street, SoHo, New York, NY 10013</span>
                </div>
              </div>
            </div>

            {/* Quick Reservation Selector Widget */}
            <div className="lg:col-span-7 bg-white text-[#1c1c19] rounded-xl p-6 sm:p-8 shadow-lg border border-[#ebe8e3]">
              <form onSubmit={handleSubmit} noValidate className="flex flex-col space-y-4" aria-label="Restaurant table reservation form">
                {/* Form-level error banner if submission failed */}
                {submitAttempted && (errors.guestName || errors.guestEmail) && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="p-3.5 rounded bg-[#fdf2f0] border border-[#ddc0ba] text-[#9d3d26] text-[13px] flex items-start gap-2.5"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#9d3d26]" aria-hidden="true" />
                    <div>
                      <p className="font-semibold">Required Information Missing</p>
                      <p className="text-[12px] text-[#56423d] mt-0.5">
                        Please provide both the <strong>Guest Name</strong> and a valid <strong>Email Address</strong> to reserve your table.
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Party Size */}
                  <div className="flex flex-col space-y-1.5">
                    <label
                      htmlFor="reservation-party-size"
                      className="text-[11px] font-semibold uppercase tracking-wider text-[#56423d] flex items-center gap-1"
                    >
                      <Users className="w-3.5 h-3.5 text-[#9d3d26]" aria-hidden="true" />
                      <span>Party Size</span>
                    </label>
                    <select
                      id="reservation-party-size"
                      value={partySize}
                      onChange={(e) => setPartySize(e.target.value)}
                      aria-label="Select number of dining guests"
                      className="w-full bg-[#f6f3ee] text-[#1c1c19] px-3 py-2.5 rounded text-[13px] font-sans border border-[#e5e2dd] focus:outline-none focus:ring-2 focus:ring-[#9d3d26] cursor-pointer"
                    >
                      <option value="1 Guest">1 Guest</option>
                      <option value="2 Guests">2 Guests</option>
                      <option value="3 Guests">3 Guests</option>
                      <option value="4 Guests">4 Guests</option>
                      <option value="5 Guests">5 Guests</option>
                      <option value="6+ Guests (Private Dining)">6+ Guests (Private Dining)</option>
                    </select>
                  </div>

                  {/* Dining Date */}
                  <div className="flex flex-col space-y-1.5">
                    <label
                      htmlFor="reservation-dining-date"
                      className="text-[11px] font-semibold uppercase tracking-wider text-[#56423d] flex items-center gap-1"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#9d3d26]" aria-hidden="true" />
                      <span>Dining Date</span>
                    </label>
                    <select
                      id="reservation-dining-date"
                      value={diningDate}
                      onChange={(e) => setDiningDate(e.target.value)}
                      aria-label="Select dining date"
                      className="w-full bg-[#f6f3ee] text-[#1c1c19] px-3 py-2.5 rounded text-[13px] font-sans border border-[#e5e2dd] focus:outline-none focus:ring-2 focus:ring-[#9d3d26] cursor-pointer"
                    >
                      <option value="Tonight (Limited)">Tonight (Limited)</option>
                      <option value="Tomorrow Evening">Tomorrow Evening</option>
                      <option value="This Friday">This Friday</option>
                      <option value="This Saturday">This Saturday</option>
                      <option value="Next Weekend">Next Weekend</option>
                    </select>
                  </div>

                  {/* Preferred Time */}
                  <div className="flex flex-col space-y-1.5">
                    <label
                      htmlFor="reservation-preferred-time"
                      className="text-[11px] font-semibold uppercase tracking-wider text-[#56423d] flex items-center gap-1"
                    >
                      <Clock className="w-3.5 h-3.5 text-[#9d3d26]" aria-hidden="true" />
                      <span>Preferred Time</span>
                    </label>
                    <select
                      id="reservation-preferred-time"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      aria-label="Select preferred reservation seating time"
                      className="w-full bg-[#f6f3ee] text-[#1c1c19] px-3 py-2.5 rounded text-[13px] font-sans border border-[#e5e2dd] focus:outline-none focus:ring-2 focus:ring-[#9d3d26] cursor-pointer"
                    >
                      <option value="5:30 PM (Early Hearth)">5:30 PM (Early Hearth)</option>
                      <option value="6:00 PM (Dining Room)">6:00 PM (Dining Room)</option>
                      <option value="7:30 PM (Main Salon)">7:30 PM (Main Salon)</option>
                      <option value="8:45 PM (Chef's Counter)">8:45 PM (Chef's Counter)</option>
                      <option value="9:30 PM (Late Seating)">9:30 PM (Late Seating)</option>
                    </select>
                  </div>
                </div>

                {/* Seating Preference Radiogroup */}
                <fieldset className="pt-1 border-0 m-0 p-0">
                  <legend id="seating-area-label" className="text-[11px] font-semibold uppercase tracking-wider text-[#56423d] block mb-2">
                    Preferred Atmosphere
                  </legend>
                  <div role="radiogroup" aria-labelledby="seating-area-label" className="flex flex-wrap gap-4">
                    {(['Main Dining Room', 'Hearth Chef Counter', 'Outdoor Heated Loggia'] as const).map((area) => (
                      <label key={area} className="inline-flex items-center gap-2 cursor-pointer text-[#56423d] text-[13px]">
                        <input
                          type="radio"
                          name="seating"
                          checked={seatingArea === area}
                          onChange={() => setSeatingArea(area)}
                          aria-label={`Select ${area} seating`}
                          className="accent-[#9d3d26] focus:ring-2 focus:ring-[#9d3d26]"
                        />
                        <span>{area}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Guest Contact Inputs with Explicit Required Visuals & Validation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {/* Guest Name */}
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="guest-name-input"
                      className="text-[11px] font-semibold uppercase tracking-wider text-[#56423d] flex items-center justify-between"
                    >
                      <span>
                        Guest Name <span className="text-[#9d3d26] font-bold" aria-hidden="true">*</span>
                      </span>
                      <span className="text-[10px] text-[#9d3d26] font-normal lowercase tracking-normal">required</span>
                    </label>
                    <input
                      ref={nameInputRef}
                      id="guest-name-input"
                      type="text"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.guestName}
                      aria-describedby={errors.guestName ? 'guest-name-error' : undefined}
                      aria-label="Primary guest full name (required)"
                      placeholder="e.g. Alessandro Rossi"
                      value={guestName}
                      onChange={handleNameChange}
                      onBlur={() => handleBlur('guestName')}
                      className={`w-full px-3 py-2 rounded text-[13px] border transition-colors focus:outline-none ${
                        errors.guestName
                          ? 'border-[#9d3d26] bg-[#fdf2f0] text-[#1c1c19] focus:ring-2 focus:ring-[#9d3d26]'
                          : 'bg-[#f6f3ee] text-[#1c1c19] border-[#e5e2dd] focus:ring-2 focus:ring-[#9d3d26]'
                      }`}
                    />
                    {errors.guestName && (
                      <p
                        id="guest-name-error"
                        role="alert"
                        aria-live="polite"
                        className="text-[11px] text-[#9d3d26] flex items-center gap-1 font-medium mt-0.5"
                      >
                        <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                        <span>{errors.guestName}</span>
                      </p>
                    )}
                  </div>

                  {/* Guest Email */}
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="guest-email-input"
                      className="text-[11px] font-semibold uppercase tracking-wider text-[#56423d] flex items-center justify-between"
                    >
                      <span>
                        Confirmation Email <span className="text-[#9d3d26] font-bold" aria-hidden="true">*</span>
                      </span>
                      <span className="text-[10px] text-[#9d3d26] font-normal lowercase tracking-normal">required</span>
                    </label>
                    <input
                      ref={emailInputRef}
                      id="guest-email-input"
                      type="email"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.guestEmail}
                      aria-describedby={errors.guestEmail ? 'guest-email-error' : undefined}
                      aria-label="Guest email address for booking confirmation (required)"
                      placeholder="e.g. a.rossi@domain.com"
                      value={guestEmail}
                      onChange={handleEmailChange}
                      onBlur={() => handleBlur('guestEmail')}
                      className={`w-full px-3 py-2 rounded text-[13px] border transition-colors focus:outline-none ${
                        errors.guestEmail
                          ? 'border-[#9d3d26] bg-[#fdf2f0] text-[#1c1c19] focus:ring-2 focus:ring-[#9d3d26]'
                          : 'bg-[#f6f3ee] text-[#1c1c19] border-[#e5e2dd] focus:ring-2 focus:ring-[#9d3d26]'
                      }`}
                    />
                    {errors.guestEmail && (
                      <p
                        id="guest-email-error"
                        role="alert"
                        aria-live="polite"
                        className="text-[11px] text-[#9d3d26] flex items-center gap-1 font-medium mt-0.5"
                      >
                        <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                        <span>{errors.guestEmail}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Optional Mobile Phone for SMS table alert */}
                <div className="pt-1">
                  <label
                    htmlFor="guest-phone-input"
                    className="text-[11px] font-semibold uppercase tracking-wider text-[#56423d] flex items-center justify-between mb-1"
                  >
                    <span>Mobile Phone (Optional for SMS Table Alert)</span>
                    <span className="text-[10px] text-[#8a726c] font-normal lowercase tracking-normal">optional</span>
                  </label>
                  <input
                    id="guest-phone-input"
                    type="tel"
                    aria-label="Mobile phone number for optional SMS updates"
                    placeholder="e.g. +1 (212) 555-0198"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-[#f6f3ee] text-[#1c1c19] px-3 py-2 rounded text-[13px] border border-[#e5e2dd] focus:outline-none focus:ring-2 focus:ring-[#9d3d26]"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-label="Find and reserve table on the Resy network"
                    className="w-full py-3.5 rounded bg-[#9d3d26] text-white text-[12px] font-semibold uppercase tracking-wider hover:bg-[#bd553b] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-[#9d3d26] focus:ring-offset-2"
                  >
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    <span>
                      {isSubmitting ? 'Securing Table on Resy Network...' : 'Find a Table on Resy'}
                    </span>
                  </button>
                </div>

                {inlineSuccess && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="p-3.5 rounded bg-[#d5e5ca] text-[#3d4b37] text-[13px] flex items-center gap-2 border border-[#bccbb2] animate-in fade-in"
                  >
                    <CheckCircle className="w-4 h-4 text-[#54624e] shrink-0" aria-hidden="true" />
                    <span>
                      Table held for {partySize} on {diningDate} at {preferredTime} ({seatingArea}). Opening confirmation details...
                    </span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
