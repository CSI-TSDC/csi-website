"use client";

import React from "react";

export const ShinyButton = ({
  children,
  className = "",
  onClick,
  href,
  ...props
}) => {
  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2 font-semibold text-white tracking-wide">
      {children}
    </span>
  );

  const baseClasses = `
    relative group overflow-hidden inline-flex items-center justify-center
    px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-full text-white font-semibold text-xs sm:text-base md:text-lg
    bg-gradient-to-r from-csi-blue-500 via-csi-blue-600 to-csi-blue-700
    shadow-[0_0_20px_rgba(2,81,193,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.6)]
    transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 active:scale-95
    border border-white/30 hover:border-sky-300/80 cursor-pointer
    ${className}
  `;

  return (
    <span className="relative inline-block group">
      {/* Outer Ambient Glow Effect */}
      <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 opacity-50 blur-md group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {href ? (
        <a href={href} onClick={onClick} className={baseClasses} {...props}>
          {/* Continuous Shiny Light Beam Animation */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shiny-sweep_3s_infinite_ease-in-out] group-hover:duration-750 pointer-events-none" />

          {/* Radial Top Light Specular Glow */}
          <span className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_75%)] pointer-events-none" />

          {/* Content */}
          {content}
        </a>
      ) : (
        <button onClick={onClick} className={baseClasses} {...props}>
          {/* Continuous Shiny Light Beam Animation */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shiny-sweep_3s_infinite_ease-in-out] group-hover:duration-750 pointer-events-none" />

          {/* Radial Top Light Specular Glow */}
          <span className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_75%)] pointer-events-none" />

          {/* Content */}
          {content}
        </button>
      )}

      {/* Inline style tag for keyframes if not defined in tailwind config */}
      <style jsx>{`
        @keyframes shiny-sweep {
          0% {
            transform: translateX(-120%);
          }
          40%, 100% {
            transform: translateX(120%);
          }
        }
      `}</style>
    </span>
  );
};

export default ShinyButton;
