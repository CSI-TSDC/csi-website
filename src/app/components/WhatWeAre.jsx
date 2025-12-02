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
    <section id="what-we-are" className="w-full h-max py-24 md:py-32 ">
      <div className="w-full h-max flex flex-row justify-center font-satoshi items-stretch mx-auto max-w-5xl">
        <div className="flex flex-col w-1/2 px-8 justify-between space-y-6">
          <div className="w-full h-[500px]">
            <img 
              src="/assets/images/def.jpg" 
              className="w-full h-full object-cover rounded-2xl" 
              alt="Deserted Land" 
            />
          </div>
          <div className="space-y-6">
            <div className="text-4xl font-bold text-[#EF4444]">
              <span>What we do</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {[
                { number: 1, text: 'Connect with other teenage coders' },
                { number: 2, text: 'Host Tech Fest & Coding Events' },
                { number: 3, text: 'Participate in coding competitions' },
                { number: 4, text: 'Make friends, hang out, and enjoy a chill community vibe' },
              ].map((item) => (
                <div key={item.number} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#EF4444] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{item.number}</span>
                  </div>
                  <span className="text-lg font-semibold text-gray-800">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-1/2 px-8 justify-between space-y-6">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">
              <span>Who we are</span>
            </h2>
            <p className="text-lg font-normal opacity-80">
              <span>We&apos;re a student-led tech community that brings builders, creatives, and curious minds together. We learn, collaborate, host events, and create a welcoming space where everyone can grow — no matter their skill level.</span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {STATISTICS.map((stat) => (
              <StatBox key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeAre;
