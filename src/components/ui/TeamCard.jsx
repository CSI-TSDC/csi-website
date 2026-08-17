"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function TeamCard({ name, title, hasSignature = false, image, signature, dataTechCard = false }) {
  const [imgSrc, setImgSrc] = useState(image || '/assets/Teams/img2.jpg');
  const [isHovered, setIsHovered] = useState(false);
  const attemptRef = useRef(0);
  const fallbackImage = '/assets/Teams/img2.jpg';

  const handleImageError = () => {
    if (imgSrc === fallbackImage) {
      // Already on fallback, stop trying
      return;
    }

    // Try different file extensions
    if (image && image !== fallbackImage) {
      const pathParts = image.split('/');
      const filename = pathParts[pathParts.length - 1];
      const basePath = pathParts.slice(0, -1).join('/');
      const baseName = filename.replace(/\.(webp|jpg|jpeg|png|JPG|JPEG|PNG)$/i, '');

      // Common extensions to try (in order of likelihood)
      const extensions = ['.JPG', '.PNG', '.jpg', '.png', '.jpeg', '.JPEG', '.webp'];

      if (attemptRef.current < extensions.length) {
        const newPath = `${basePath}/${baseName}${extensions[attemptRef.current]}`;
        attemptRef.current += 1;
        setImgSrc(newPath);
      } else {
        setImgSrc(fallbackImage);
      }
    } else {
      setImgSrc(fallbackImage);
    }
  };

  return (
    <div
      className="relative flex flex-col w-[220px] md:w-[280px] h-[380px] md:h-[460px] group cursor-pointer"
      data-tech-card={dataTechCard ? 'true' : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-12px) scale(1.03)' : 'translateY(0) scale(1)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }}
    >
      {/* Card container with hover effects */}
      <div
        className="relative rounded-[32px_8px] bg-csi-white w-full h-full overflow-hidden"
        style={{
          boxShadow: isHovered
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 30px rgba(59, 130, 246, 0.15)'
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {/* Image with zoom effect */}
        <div
          className="absolute inset-0"
          style={{
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <Image
            src={imgSrc}
            alt={name || "Team member"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 220px, 280px"
            loading={imgSrc.includes('cloudinary.com') ? "lazy" : "eager"}
            onError={handleImageError}
          />
        </div>

        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isHovered
              ? 'linear-gradient(180deg, transparent 40%, rgba(0, 0, 0, 0.6) 100%)'
              : 'linear-gradient(180deg, transparent 60%, rgba(0, 0, 0, 0.2) 100%)',
            opacity: isHovered ? 1 : 0.5,
            transition: 'all 0.4s ease',
          }}
        />


      </div>

      {/* Text content with hover animation */}
      {name && (
        <div
          className="mt-3 w-full text-center"
          style={{
            transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'transform 0.3s ease',
          }}
        >
          <h3
            className="text-lg md:text-xl font-dm-sans-semibold"
            style={{
              color: isHovered ? '#1e40af' : 'inherit',
              transition: 'color 0.3s ease',
            }}
          >
            {name}
          </h3>
          {title && (
            <p
              className="text-sm md:text-base font-dm-sans-medium"
              style={{
                color: isHovered ? '#3b82f6' : '#4b5563',
                transition: 'color 0.3s ease',
              }}
            >
              {title}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

