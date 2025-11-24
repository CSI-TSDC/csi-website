import React from "react";
import DecayCard from './ui/DecayCard';

const WhatWeAre = () => {
  return (
    <section id="what-we-are" className="w-full h-max py-16 md:py-20 bg-white rounded-2xl p-10 font-youth-bold">
      {/* Heading */}
      <h2 className=" text-center text-4xl md:text-6xl font-bold  mb-12 pb-10">
        What We Are,{" "}
        <span className="text-red-500">Let&apos;s Know About Us..</span>
      </h2>

     {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-20">
        {/* Image Stack Section */}
        <div className="relative w-[260px] md:w-[320px] h-[360px]">
          <DecayCard width={260} height={360} image="https://img.freepik.com/premium-photo/abstract-pink-background-simple-square-backdrop-with-copy-space_7954-36998.jpg?semt=ais_hybrid&w=740&q=80">
          <h2>CSI <br/> TSDC</h2>
          </DecayCard>
        </div>

        {/* Text Block */}
        <div className="max-w-xl text-black leading-relaxed text-base md:text-lg">
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
            ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
            explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
            odit aut fugit.
          </p>

          <p className="mt-4">
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatWeAre;

