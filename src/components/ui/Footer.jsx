'use client'

import Image from 'next/image'
import { Linkedin, Instagram, Github } from 'lucide-react';

const Footer = () => {
  const handleSendMail = () => {
    const mailtoLink = `mailto:csi@tsdcmumbai.in?subject=Become a Collaborator or Sponsor`
    window.location.href = mailtoLink
  }
  return (
    <>
      <footer id="footer" className="relative w-full border-t h-max font-dm-sans-medium py-12 md:py-16 px-8 md:px-16 mt-24 min-h-[75vh] flex flex-wrap justify-between text-csi-white font-satoshi font-normal z-98 rounded-t-3xl md:rounded-t-[5rem] bg-csi-blue">
        <div className="flex flex-col space-y-6 md:space-y-8 mb-10">
          <div className="relative font-medium font-space-grotesk-medium text-3xl w-max">
            <span className="block float-left">Find us at</span>
          </div>
          <div className="relative opacity-70">
            <span className="float-left">Thakur Shyamnarayan Degree College,</span>
            <span className="float-left clear-both">90ft Road, Thakur Complex,</span>
            <span className="float-left clear-both">Kandivali (E), Mumbai - 400067</span>
          </div>
          <div className="relative flex mt-2">
            <span className="block h-[50px] w-auto mr-4">
              <Image className="w-full h-full" src="/assets/Logos/csi_logo.webp" alt="CSI Logo" width={50} height={50} />
            </span>
            <span className="block h-[50px] w-auto">
              <Image className="w-full h-full" src="/assets/Logos/tsdc_logo.webp" alt="TSDC Logo" width={50} height={50} />
            </span>
          </div>
        </div>
        <div className="flex flex-row flex-wrap text-xl font-light font-satoshi gap-8 sm:gap-16 md:gap-32 gap-y-8">
          <div className="flex flex-col">
            <div className="mb-6 md:mb-8 text-lg leading-snug font-dm-sans-medium">
              Quick Links
            </div>
            <div className="flex flex-col space-y-2 md:space-y-3 text-lg leading-snug font-dm-sans-medium">
            <a href="#">
                <span>C.S.I</span>
              </a>
              <a href="#">
                <span>T.S.D.C</span>
              </a>
              <a href="#">
                <span>Hackvision</span>
              </a>
              <a href="#">
                <span>Gallery</span>
              </a>
              <a href="#">
                <span>Events</span>
              </a>
              <a href="#">
                <span>Teams</span>
              </a>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-6 md:mb-8 text-lg leading-snug font-dm-sans-medium">
              <span>About</span>
            </div>
            <div className="flex flex-col space-y-2 md:space-y-3 text-lg leading-snug font-dm-sans-medium">
              <a href="#">
                <span>About CSI</span>
              </a>
              <a href="#">
                <span>About TSDC</span>
              </a>
              <span>
                <span>Join Us</span>
              </span>
              <a href="#">
                <span>csi@tsdcmumbai.in</span>
              </a>
              <a href="#">
                <span>+91 12345 67890</span>
              </a>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-6 md:mb-8 text-lg leading-snug font-dm-sans-medium">
              <span>Stay Connected</span>
            </div>
            <div className="flex flex-col text-lg leading-snug font-dm-sans-medium mb-6 md:mb-8 space-y-1">
              <span className="block">Get updates on events, projects,</span>
              <span className="block clear-both">and everything conducted by our</span>
              <span className="block clear-both">committee.</span>
            </div>
            <div className="flex flex-row space-x-4">
              <Instagram className="text-white w-6 h-6 sm:w-7 sm:h-7" />
              <Github className="text-white w-6 h-6 sm:w-7 sm:h-7" />
              <Linkedin className="text-white w-6 h-6 sm:w-7 sm:h-7" />

            </div>
          </div>
        </div>
      </footer>
      <div className="relative bg-csi-blue text-csi-white w-full h-max py-4 md:py-8 px-8 md:px-16 flex justify-between z-99 font-satoshi">
        <div>
          <span>Handcrafted by the Tech Team</span>
        </div>
        <div>
          <span>©️ 2025 CSI</span>
        </div>
      </div>
    </>
    
  );
};

export default Footer;
