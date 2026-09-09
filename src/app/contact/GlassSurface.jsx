"use client";

import React, { useId } from 'react';

const GlassSurface = ({
  children,
  width,
  height,
  borderRadius = 24,
  className = '',
  displace = 15,
  distortionScale = -150,
  redOffset = 5,
  greenOffset = 15,
  blueOffset = 25,
  brightness = 60,
  opacity = 0.35,
  mixBlendMode = 'normal',
  dark = false,
  style = {},
  ...props
}) => {
  const filterId = useId().replace(/:/g, '');

  const bgColor = dark
    ? `rgba(15, 23, 42, ${opacity})`
    : `rgba(255, 255, 255, ${opacity})`;

  const containerStyle = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
    height: height ? (typeof height === 'number' ? `${height}px` : height) : 'auto',
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: `blur(20px) saturate(${100 + brightness}%) contrast(105%)`,
    WebkitBackdropFilter: `blur(20px) saturate(${100 + brightness}%) contrast(105%)`,
    backgroundColor: bgColor,
    mixBlendMode: mixBlendMode !== 'normal' ? mixBlendMode : undefined,
    border: dark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(255, 255, 255, 0.6)',
    boxShadow: `
      0 20px 40px -10px rgba(0, 0, 0, 0.25),
      inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.7),
      inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.15)
    `,
    ...style
  };

  return (
    <div
      className={`glass-surface-container ${className}`}
      style={containerStyle}
      {...props}
    >
      {/* SVG Displacement Filter for Liquid Distortion */}
      <svg
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
        aria-hidden="true"
      >
        <defs>
          <filter id={`glass-displace-${filterId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={`${Math.abs(distortionScale) / 10000 || 0.015}`}
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={displace}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
          </filter>
        </defs>
      </svg>

      {/* Glossy Liquid Surface Specular Reflection */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          background: dark
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(0, 0, 0, 0.15) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.15) 45%, rgba(255, 255, 255, 0.3) 100%)',
          boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.25)'
        }}
      />

      {/* Chromatic Prism Edge Refraction */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-50"
        style={{
          boxShadow: `
            inset ${redOffset}px 0 ${Math.abs(redOffset) + 2}px rgba(239, 68, 68, 0.25),
            inset 0 ${greenOffset}px ${Math.abs(greenOffset) + 2}px rgba(34, 197, 94, 0.25),
            inset -${blueOffset}px 0 ${Math.abs(blueOffset) + 2}px rgba(59, 130, 246, 0.3)
          `
        }}
      />

      {/* Card Content */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default GlassSurface;

