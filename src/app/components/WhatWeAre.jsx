import React from "react";
import DecayCard from './ui/DecayCard';

const WhatWeAre = () => {
  return (
    <section id="what-we-are" className="w-full min-h-screen pt-16 md:pt-20 bg-white rounded-2xl p-10 font-youth-bold">
      {/* Heading */}
      <h2 className=" text-center text-4xl md:text-6xl font-bold  mb-12 pb-10">
        What We Are,{" "}
        <span className="text-red-500">Let's Know About Us..</span>
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
        <div className="max-w-xl text-black leading-relaxed text-sm md:text-base">
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
            ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
            explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
            odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt.
          </p>

          <p className="mt-4">
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim
            ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
            laboriosam, nisi ut aliquid ex ea commodi consequatur?
          </p>

          <p className="mt-4">
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
            quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatWeAre;

