"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { calendarEvents, MONTHS, isEventPassed } from "@/utils/calendarEventsData";

/* ─────────────────── LEFT MONTH PANEL ─────────────────── */

function MonthPanel({ activeMonthIndex, onPrevMonth, onNextMonth }) {
  const activeMonth = MONTHS[activeMonthIndex];

  return (
    <div className="w-full md:w-[240px] lg:w-[280px] shrink-0 bg-[#0068fffa] flex flex-col justify-between items-center py-6 sm:py-8 px-4 select-none min-h-[160px] md:min-h-full rounded-t-3xl sm:rounded-t-3xl md:rounded-l-2xl md:rounded-l-3xl md:rounded-tr-none">
      {/* Month Name */}
      <div className="flex-1 flex items-center justify-center">
        <span className="text-white text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-black tracking-wider uppercase font-bespoke-sans-bold drop-shadow-md">
          {activeMonth}
        </span>
      </div>

      {/* Navigation Arrows at bottom */}
      <div className="flex items-center justify-center gap-6 pt-2">
        <button
          onClick={onPrevMonth}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer"
          aria-label="Previous Month"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={onNextMonth}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer"
          aria-label="Next Month"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ─────────────────── EVENT ROW ─────────────────── */

function EventRow({ event, index, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const hoverColor = event.color || "#0033ff";

  return (
    <button
      onClick={() => onClick(event)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="group w-full min-h-[93px] sm:min-h-[106px] md:min-h-[120px] text-left cursor-pointer transition-all duration-200 active:scale-[0.99] focus:outline-none flex items-center px-6 sm:px-8 md:px-10 shrink-0 border-b border-black/10 last:border-b-0"
      style={{
        backgroundColor: isHovered ? hoverColor : "#ffffff",
        color: isHovered ? "#ffffff" : "#000000",
      }}
    >
      <div className="flex items-center justify-between w-full min-w-0">
        <span className="font-black text-xl sm:text-2xl lg:text-3xl tracking-tight truncate font-bespoke-sans transition-colors duration-200">
          {event.name}
        </span>
        <div
          className={`shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            isHovered
              ? "bg-white/20 text-white opacity-100"
              : "bg-black/10 text-black opacity-0 group-hover:opacity-100"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
}

/* ─────────────────── EVENT LIST ─────────────────── */

function EventList({ events, onEventClick }) {
  if (events.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-[#e3fafa] min-h-[280px] sm:min-h-[320px] md:min-h-[360px] rounded-b-2xl sm:rounded-b-3xl md:rounded-r-2xl md:rounded-r-3xl md:rounded-bl-none">
        <p className="text-black text-base sm:text-lg font-bold uppercase tracking-wider font-bespoke-sans">
          Coming Soon
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#e3fafa] rounded-b-2xl sm:rounded-b-3xl md:rounded-r-2xl md:rounded-r-3xl md:rounded-bl-none overflow-hidden h-[280px] sm:h-[320px] md:h-[360px]">
      <div
        className="flex flex-col h-full overflow-y-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(0, 0, 0, 0.2) transparent",
        }}
      >
        {events.map((event, index) => (
          <EventRow
            key={`${event.id}-${index}`}
            event={event}
            index={index}
            onClick={onEventClick}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────── EVENT DETAIL POPUP CARD ─────────────────── */

function EventDetailPopup({ event, onClose }) {
  const popupRef = useRef(null);
  const backdropRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Smooth entrance animation
  useEffect(() => {
    if (!backdropRef.current || !popupRef.current) return;

    backdropRef.current.style.opacity = "0";
    popupRef.current.style.opacity = "0";
    popupRef.current.style.transform = "scale(0.9) translateY(24px)";

    const rafId = requestAnimationFrame(() => {
      if (!backdropRef.current || !popupRef.current) return;
      backdropRef.current.style.transition = "opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)";
      popupRef.current.style.transition =
        "opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)";

      backdropRef.current.style.opacity = "1";
      popupRef.current.style.opacity = "1";
      popupRef.current.style.transform = "scale(1) translateY(0)";
    });

    return () => cancelAnimationFrame(rafId);
  }, []);

  const accentColor = event.color || "#0251c1";
  const isPassed = isEventPassed(event);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6"
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        background: "rgba(0, 0, 0, 0.65)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Outer Card Container */}
      <div
        ref={popupRef}
        className="relative w-full max-w-[400px] sm:max-w-[440px] bg-white text-neutral-900 rounded-[28px] overflow-hidden shadow-2xl flex flex-col border border-black/10 backdrop-blur-xl transition-all"
        style={{
          boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 30px 0 ${accentColor}25`,
        }}
      >
        {/* Top Image Banner Section */}
        <div className="relative w-full aspect-[16/10] bg-neutral-900 overflow-hidden group">
          {event.image ? (
            <Image
              src={event.image}
              alt={event.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 440px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-800 via-neutral-900 to-blue-950">
              <span className="text-white/40 font-mono text-xs tracking-widest uppercase">CSI Event</span>
            </div>
          )}

          {/* Floating Month / Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span
              className="px-3 py-1 text-[11px] font-bold tracking-wider uppercase rounded-full text-white shadow-md backdrop-blur-md border border-white/20"
              style={{ backgroundColor: accentColor }}
            >
              {event.month || "EVENT"}
            </span>
          </div>

          {/* Close Icon (X) button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Bottom Content Area */}
        <div className="p-6 flex flex-col gap-4 bg-white -mt-2 relative z-10 rounded-t-2xl">
          {/* Title & Date Metadata */}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight font-bespoke-sans leading-tight">
              {event.name}
            </h3>

            {event.date && (
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
                <svg className="w-4 h-4 shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{event.date}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-dm-sans">
            {event.description}
          </p>

          {/* Action / Status Footer */}
          <div className="pt-2 flex items-center justify-between border-t border-neutral-100 mt-1 gap-2">
            <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium shrink-0">
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isPassed ? "bg-red-400" : "bg-emerald-400"
                  }`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    isPassed ? "bg-red-500" : "bg-emerald-500"
                  }`}
                ></span>
              </span>
              <span>CSI Official Event</span>
            </div>

            {isPassed ? (
              <span className="shrink-0 px-4 py-2 bg-red-50 text-red-600 text-xs font-semibold rounded-full border border-red-200/80 inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                Registration Closed
              </span>
            ) : event.link ? (
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-5 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded-full shadow-md transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-1.5 cursor-pointer"
              >
                Register Now
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            ) : (
              <span className="shrink-0 px-4 py-2 bg-amber-50 text-amber-700 text-xs font-medium rounded-full border border-amber-200/80 inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                Coming Soon
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── MAIN CALENDAR CARD ─────────────────── */

export default function CalendarCard() {
  const [activeMonthIndex, setActiveMonthIndex] = useState(() => new Date().getMonth());
  const [selectedEventId, setSelectedEventId] = useState(null);

  const activeMonthCode = MONTHS[activeMonthIndex];

  const filteredEvents = useMemo(
    () => calendarEvents.filter((e) => e.month === activeMonthCode),
    [activeMonthCode]
  );

  const selectedEvent = useMemo(
    () => calendarEvents.find((e) => e.id === selectedEventId) || null,
    [selectedEventId]
  );

  const handlePrevMonth = useCallback(() => {
    setActiveMonthIndex((prev) => (prev === 0 ? MONTHS.length - 1 : prev - 1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setActiveMonthIndex((prev) => (prev === MONTHS.length - 1 ? 0 : prev + 1));
  }, []);

  const handleEventClick = useCallback((event) => {
    setSelectedEventId(event.id);
  }, []);

  const handleClosePopup = useCallback(() => {
    setSelectedEventId(null);
  }, []);

  return (
    <>
      <div className="w-full sm:w-[98%] md:w-[92%] lg:w-[88%] xl:w-[85%] mx-auto">
        {/* Card Shell matching EventCards dimensions, radius, and shadows */}
        <div className="flex flex-col md:flex-row items-stretch rounded-4xl sm:rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 min-h-[280px] sm:min-h-[320px] md:min-h-[360px] border border-white/10">
          <MonthPanel
            activeMonthIndex={activeMonthIndex}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />
          <EventList
            events={filteredEvents}
            onEventClick={handleEventClick}
          />
        </div>
      </div>

      {/* Detail popup card */}
      {selectedEvent && (
        <EventDetailPopup
          event={selectedEvent}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
}
