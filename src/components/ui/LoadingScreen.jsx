"use client";
import Image from "next/image";

export default function LoadingScreen({ progress = 0 }) {

  return (
    <div className="fixed inset-0 z-[9999] bg-csi-white flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <Image
        src={"/assets/Logos/csi_logo.webp"}
        width={200}
        height={200}
        alt="CSI Logo"
        className="w-24 h-auto object-contain mb-10"
        >

        </Image>
        <h2 className="text-2xl md:text-3xl font-bold text-csi-black mb-2">
          Loading
        </h2>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full max-w-md px-8">
        <div className="w-full h-2 bg-csi-black/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-csi-blue transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-center mt-4">
          <span className="text-sm text-csi-black/60">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}

