'use client'

import React from "react";

const Team = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="w-full border-b-[8px] md:border-b-[12px] border-black bg-[#00BFFF] h-[60vh] pt-16 md:pt-20">
        
      </div>
      <div className="w-full px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-16 font-satoshi font-bold">
        <div className="flex flex-col md:flex-row tracking-tight justify-center items-center text-[14vw]/[13vw] md:text-[10vw]/[8vw]">
          <div className="md:mr-8 [&>*]:float-left">
            <span>
              <span>M</span>
            </span>
            <span>
              <span>E</span>
            </span>
            <span>
              <span>E</span>
            </span>
            <span>
              <span>T</span>
            </span>
          </div>
          
          {/* The Team - Together on mobile, separate on desktop */}
          <div className="flex flex-row">
            <div className="mr-8 [&>*]:float-left">
              <span>
                <span>T</span>
              </span>
              <span>
                <span>H</span>
              </span>
              <span>
                <span>E</span>
              </span>
            </div>
            <div className="[&>*]:float-left">
              <span>
                <span>T</span>
              </span>
              <span>
                <span>E</span>
              </span>
              <span>
                <span>A</span>
              </span>
              <span>
                <span>M</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
