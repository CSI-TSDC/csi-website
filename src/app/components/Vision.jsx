'use client'
  
import React from "react";
import { motion } from "framer-motion";


const Vision = () => {
  return (
    <div
      id="what-we-are"
      className="absolute w-full min-h-screen pt-12 md:pt-20 bg-white rounded-2xl p-10 font-youth-bold"
    >

      <h2 className="text-center text-4xl md:text-6xl font-bold mb-12 pb-10">
        Vision, <span className="text-red-500">Our Aim is to..</span>
      </h2>


      <motion.div
        className="relative flex justify-center items-center"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >

        <motion.h2
          className="absolute text-2xl md:text-8xl font-bold text-center cursor-pointer select-none "
          variants={{
            rest: { opacity: 1 },
            hover: {
              opacity: 0,
              transition: { duration: 0.6 }
            },
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut"
          }}
        >
          For The Students,<br />By The Students
        </motion.h2>


        <motion.video
          className="rounded-2xl"
          style={{ width: "80vw" }}
          autoPlay
          muted
          loop
          src="/assets/test.mp4"
          variants={{
            rest: {
              opacity: 0,

              height: "60%",
            },
            hover: {
              opacity: 1,

              height: "100%",
              transition: {
                duration: 0.6,
                ease: "easeInOut"
              },
            },
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};

export default Vision;
