import React from "react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full h-[95vh] object-fit bg-cover bg-center flex flex-col"
      style={{
        backgroundImage:
          "url('https://wallpapercat.com/w/full/5/0/6/183908-2000x1333-desktop-hd-bts-background-photo.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white pt-20 md:pt-24 px-6 font-youth-bold flex-1">
        <h1 className="text-5xl md:text-6xl font-bold leading-snug">
          Together We{" "}
          <span className="bg-red-500 px-3 py-1 rounded-xl text-white shadow-lg inline-block -rotate-3">
            Code
          </span>
          ,{" "}
          <span className="bg-blue-500 px-3 py-1 rounded-xl text-white shadow-lg inline-block -rotate-3">
            Create
          </span>
          , and{" "}
          <span className="bg-orange-500 px-3 py-1 rounded-xl text-white shadow-lg inline-block -rotate-3">
            Conquer
          </span>
        </h1>

        <p className="max-w-2xl mt-6 text-gray-200 text-sm md:text-base leading-relaxed font-youth-bold">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          since the 1500s. It has survived not only five centuries, but the
          leap into electronic typesetting, remaining essentially unchanged.
        </p>

        <button className="mt-8 bg-[linear-gradient(to_right,#FF512F_0%,#F09819_51%,#FF512F_100%)] 
  transition text-white px-6 py-3 rounded-xl text-lg shadow-md font-youth-bold">
          Let's Explore
        </button>
      </div>
    </section>
  );
};

export default Hero;

