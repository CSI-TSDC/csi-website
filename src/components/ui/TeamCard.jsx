"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function TeamCard({ name, title, hasSignature = false, image, signature }) {
  const [imgSrc, setImgSrc] = useState(image || '/assets/Teams/img2.jpg');
  const attemptRef = useRef(0);
  const fallbackImage = '/assets/Teams/img2.jpg';

  console.log(`[TeamCard] ${name} - Image path:`, imgSrc);

  const handleImageError = () => {
    console.warn(`[TeamCard] Image failed to load for ${name}:`, imgSrc);
    
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
        console.log(`[TeamCard] ${name} - Trying extension ${extensions[attemptRef.current]}:`, newPath);
        attemptRef.current += 1;
        setImgSrc(newPath);
      } else {
        console.warn(`[TeamCard] ${name} - All extensions exhausted, using fallback`);
        setImgSrc(fallbackImage);
      }
    } else {
      setImgSrc(fallbackImage);
    }
  };

  return (
    <div className="relative flex flex-col w-[220px] md:w-[280px] h-[380px] md:h-[460px]">
      <div className="relative rounded-[32px_8px] bg-white w-full h-full overflow-hidden">
        <Image 
          src={imgSrc} 
          alt={name || "Team member"} 
          fill
          className="object-cover"
          onError={handleImageError}
        />
      </div>
      {name && (
        <div className="mt-3 w-full text-center">
          <h3 className="text-lg md:text-xl font-bold font-satoshi">{name}</h3>
          {title && (
            <p className="text-sm md:text-base text-gray-600 font-satoshi">{title}</p>
          )}
        </div>
      )}
    </div>
  );
}

