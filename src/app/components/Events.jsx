"use client";

import React from "react";

const Events = () => {

  return (
    <section className="w-full min-h-screen py-16 px-8 md:px-16 bg-transparent">

      {/* Heading */}
      <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center text-white">
        Events, <span className="text-red-500">Events Done by Us..</span>
      </h2>

      {/* EVENTS LIST */}
      <div className="flex flex-col gap-24 w-full">

        {/* EVENT 1 */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-white"
        >
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-2">Event Title</h3>
            <p className="text-xl font-semibold mb-3">Event Description:</p>
            <p className="leading-relaxed opacity-80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <img
            src="https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg"
            alt="event"
            className="rounded-2xl w-[300px] justify-self-center md:justify-self-end"
          />
        </div>

        {/* EVENT 2 */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-white"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvL8KnEdIemiK4bUhR6HwHXf6Eo3BXXHsqHg&s"
            alt="event"
            className="rounded-2xl w-[300px] justify-self-center md:justify-self-start"
          />

          <div className="text-right">
            <h3 className="text-3xl md:text-4xl font-bold mb-2">Event Title</h3>
            <p className="text-xl font-semibold mb-3">Event Description:</p>
            <p className="leading-relaxed opacity-80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Events;
