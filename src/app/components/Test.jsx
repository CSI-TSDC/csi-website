'use client'

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Test = () => {

  return (
    <div
      id="what-we-are"
      className="w-full min-h-screen pt-12 md:pt-20 p-10 font-youth-bold"
    >

      <h2 className="text-center text-4xl md:text-6xl font-bold mb-12 pb-5">
        Test, <span className="text-red-500">To test animation</span>
      </h2>
    </div>
  );
};

export default Test;
