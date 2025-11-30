import React from "react";

const STATISTICS = [
  { label: 'Members', value: 50 },
  { label: 'Volunteers', value: 52 },
  { label: 'Events', value: 5 },
  { label: 'Projects', value: 7 },
];

const StatBox = ({ label, value }) => (
  <div className="aspect-square rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 p-6 flex flex-col items-center justify-center">
    <div className="text-5xl font-bold text-gray-800 mb-2">
      {value}
    </div>
    <div className="text-base font-semibold text-gray-600 uppercase tracking-wide">
      {label}
    </div>
  </div>
);

const WhatWeAre = () => {
  return (
    <section id="what-we-are" className="w-full h-max py-16 md:py-20 px-16 flex flex-row justify-between font-satoshi items-stretch">
      <div className="flex flex-col w-1/2 px-7 justify-between">
        <div className="w-full h-[600px] mb-12">
          <img 
            src="/assets/images/def.jpg" 
            className="w-full h-full object-cover rounded-2xl" 
            alt="Deserted Land" 
          />
        </div>
        <div className="space-y-3">
           <div className="text-6xl font-bold text-[#EF4444]">
            <span>What we do</span>
           </div>
           <div className="text-2xl font-normal opacity-70">
            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</span>
           </div>
        </div>
      </div>
      <div className="flex flex-col w-1/2 px-7 justify-between">
        <div className="space-y-3">
          <h2 className="text-6xl font-bold">
            <span>What we are</span>
          </h2>
          <p className="text-2xl font-normal opacity-70">
            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</span>
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4">
          {STATISTICS.map((stat) => (
            <StatBox key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeAre;

