import Image from "next/image";

export default function TeamCard({ name, title, hasSignature = false, image }) {
  return (
    <div className="relative flex flex-col w-[200px] md:w-[250px] h-[350px] md:h-[425px]">
      <div className="relative rounded-[32px_8px] bg-white w-full h-full overflow-hidden">
        {image && (
          <Image 
            src={image} 
            alt={name || "Team member"} 
            fill
            className="object-cover"
          />
        )}
        {hasSignature && (
          <div className="absolute bottom-4 right-4 w-12 h-8 opacity-30 z-10">
            <svg viewBox="0 0 100 60" className="w-full h-full">
              <path
                d="M10 50 Q30 20, 50 40 T90 30"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-black"
              />
              <path
                d="M15 45 Q35 15, 55 35 T95 25"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                className="text-black"
              />
            </svg>
          </div>
        )}
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

