'use client'

import React from "react";

const Footer = () => {
  return (
    <div id="Contact" className="">
      <div className="min-h-screen flex items-center justify-center pt-4">
        {/* Card: rounded top corners only, square bottom */}
        <div
          className="w-full max-w-screen-full bg-orange-600 shadow-lg relative overflow-hidden mt-[7vh] mb-0 rounded-t-2xl"
          style={{ minHeight: '45vw', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
        >

          {/* Top-left content */}
          <div className="p-8 grid grid-cols-3">
            <div className="col-span-1 text-white">
              <h3 className="font-bold text-xl underline mb-3">Links</h3>
              <ul className="text-sm space-y-1">
                <li>
                  <a href="#home" className="block hover:underline focus:outline-none focus:ring-2 focus:ring-white/40" aria-label="Home">Home</a>
                </li>
                <li>
                  <a href="#what-we-are" className="block hover:underline focus:outline-none focus:ring-2 focus:ring-white/40" aria-label="What we are">What we are</a>
                </li>
                <li>
                  <a href="#vision" className="block hover:underline focus:outline-none focus:ring-2 focus:ring-white/40" aria-label="Vision">vision</a>
                </li>
                <li>
                  <a href="#projects" className="block hover:underline focus:outline-none focus:ring-2 focus:ring-white/40" aria-label="Projects">Projects</a>
                </li>
                <li>
                  <a href="#statistics" className="block hover:underline focus:outline-none focus:ring-2 focus:ring-white/40" aria-label="Statistics">statistics</a>
                </li>
                <li>
                  <a href="#events" className="block hover:underline focus:outline-none focus:ring-2 focus:ring-white/40" aria-label="Events">Events</a>
                </li>
                <li>
                  <a href="#team" className="block hover:underline focus:outline-none focus:ring-2 focus:ring-white/40" aria-label="Team">Team</a>
                </li>
              </ul>
            </div>

            <div className="col-span-1 text-white">
              <h3 className="font-bold text-xl underline mb-3">Connect with us</h3>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline focus:outline-none focus:ring-2 focus:ring-white/40" aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M7 7h10v10H7z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline focus:outline-none focus:ring-2 focus:ring-white/40" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16v16H4z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Linked in
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline focus:outline-none focus:ring-2 focus:ring-white/40" aria-label="Twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 12h18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="mailto:info@example.com" className="flex items-center gap-2 hover:underline focus:outline-none focus:ring-2 focus:ring-white/40" aria-label="Email">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 8l9 6 9-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Email
                  </a>
                </li>
              </ul>
            </div>

            {/* Map card (top-right) - made larger and square with rounded corners */}
            <div className="col-span-1 flex justify-end">
              <div className="w-56 text-right flex flex-col items-end">
                <div className="w-full rounded-md overflow-hidden h-full">
                  <img
                    src={'https://lh3.googleusercontent.com/6CmwcnKKrLzewlPTd57eQshuCkZDfB04iUXvM0JZRTMIIBqw74AKcezQeSDuaY8omKO0I1JJ3F19sdr8dqMjxOEj-Fz8SFi0i1qGhvfP=w609'}
                    alt="map"
                    className="w-full h-full object-cover"
                    style={{ borderRadius: 12 }}
                  />
                </div>

                {/* copyright just below the map inside the white box */}
                <p className="text-[1vw] text-gray-600 mt-3 self-end">©2025 By Thakur Shyamnarayn Degree Collage</p>
              </div>
            </div>
          </div>

          {/* Huge footer text pinned to the very bottom */}
          <div className="absolute left-0 right-0 bottom-0 px-8 pb-6 pointer-events-none">
            <h1
              className="text-white font-extrabold tracking-tight leading-none"
              style={{ fontSize: '20vw', lineHeight: 0.75, zIndex: 0 }}
            >
              CSIxTSDC
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
