'use client'

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Team = () => {
  
  // local uploaded image (using the path from our conversation)
  const uploadedImage = "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";

  const coreTeam = [
    { name: "Hardik Gandi", role: "Chair Person", img: uploadedImage },
    { name: "Aisha Khan", role: "Operations Lead", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80" },
    { name: "Liam Chen", role: "Founder", img: uploadedImage },
    { name: "Rina Das", role: "Strategy", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80" },
    { name: "Omar Ali", role: "Finance", img: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=800&q=80" },
    { name: "Sofia Lopez", role: "Communications", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80" },
    { name: "Jon Park", role: "Advisory", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80" },
  ];

  const techTeam = [
    { name: "Meera Patel", role: "Frontend Engineer", img: uploadedImage },
    { name: "Carlos Ruiz", role: "Backend Engineer", img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=800&q=80" },
    { name: "Yuki Tan", role: "DevOps", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80" },
    { name: "Ishan Rao", role: "Mobile Engineer", img: "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?auto=format&fit=crop&w=800&q=80" },
    { name: "Zoe Kim", role: "QA Engineer", img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80" },
    { name: "Vikram Singh", role: "SRE", img: "https://images.unsplash.com/photo-1524503033411-c9566986fc8f?auto=format&fit=crop&w=800&q=80" },
    { name: "Hana Yamada", role: "Tech Lead", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80" },
  ];

  const designTeam = [
    { name: "Priya Sharma", role: "Design Lead", img: uploadedImage },
    { name: "Noah Miller", role: "UX Researcher", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80" },
    { name: "Maya Gomez", role: "Visual Designer", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80" },
    { name: "Ethan Brown", role: "Product Designer", img: uploadedImage },
    { name: "Lina Park", role: "Motion Designer", img: uploadedImage },
    { name: "Diego Silva", role: "Illustrator", img: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?auto=format&fit=crop&w=800&q=80" },
    { name: "Sara Nabil", role: "Design Ops", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80" },
  ];

  
  const sectionRefs = useRef([]);
  const titleRefs = useRef([]); 
  sectionRefs.current = [];
  titleRefs.current = [];

  const addToSectionRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) sectionRefs.current.push(el);
  };
  const addToTitleRefs = (el) => {
    if (el && !titleRefs.current.includes(el)) titleRefs.current.push(el);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

 
    if (titleRefs.current.length) {
      gsap.set(titleRefs.current, { opacity: 0, y: 10 });
      gsap.to(titleRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRefs.current[0],
          start: "top 90%",
        },
      });
    }

    sectionRefs.current.forEach((section) => {
      const cards = section.querySelectorAll(".team-card");
      const imgs = section.querySelectorAll("img"); // all images in this section

     
      gsap.set(cards, { opacity: 0, y: 20 });

      // set images initially to grayscale (and ensure scale = 1)
      gsap.set(imgs, { filter: "grayscale(100%)", scale: 1 });

     
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        },
      });

      
      cards.forEach((card) => {
        const img = card.querySelector("img");
        const onEnter = () => {
          // animate both filter and scale to give a smooth color reveal + zoom
          gsap.to(img, { filter: "grayscale(0%)", scale: 1.06, duration: 0.45, ease: "power2.out" });
        };
        const onLeave = () => {
          gsap.to(img, { filter: "grayscale(100%)", scale: 1, duration: 0.45, ease: "power2.out" });
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);

        // store handlers so we can remove them on cleanup
        card._onEnter = onEnter;
        card._onLeave = onLeave;
      });
    });

    // cleanup
    return () => {
      sectionRefs.current.forEach((section) => {
        const cards = section.querySelectorAll(".team-card");
        cards.forEach((card) => {
          if (card._onEnter) card.removeEventListener("mouseenter", card._onEnter);
          if (card._onLeave) card.removeEventListener("mouseleave", card._onLeave);
        });
      });
      gsap.killTweensOf("*");
      ScrollTrigger.getAll().forEach(t => t.kill && t.kill());
    };
  }, []);

  // Reusable Section component (title + hr + horizontal-wrapping 7-column grid)
  const Section = ({ title, members }) => (
    <section ref={addToSectionRefs} className="mb-12">
      <div className="flex flex-col">
        <h3 ref={addToTitleRefs} className="text-2xl font-bold ">{title}</h3>
        <hr className="border-gray-300 mb-6 w-full" />
      </div>

      <div className="overflow-hidden -mx-2 px-3">
     
        <div className="min-w-max grid grid-cols-7 gap-6">
          {members.map((m, idx) => (
            <div
              key={m.name + idx}
              className="team-card  overflow-hidden bg-transparent shadow-sm hover:shadow-md transition-shadow"
              style={{ minWidth: 180 }}
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                  src={m.img}
                  alt={m.name}
                  // keep CSS fallback so images are grayscale before GSAP runs
                  style={{ filter: "grayscale(100%)" }}
                  className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <div className="bg-white p-2">
                <div className="text-lg font-semibold">{m.name}</div>
                <div className="text-sm text-gray-500 mt-1">{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-12">
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Our Team</h1>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">Meet the people building the product — across teams, roles and disciplines.</p>
      </header>

      <main>
        <div id="core">
          <Section title="Core Team" members={coreTeam} />
        </div>

        <div id="tech">
          <Section title="Tech Team" members={techTeam} />
        </div>

        <div id="design">
          <Section title="Design Team" members={designTeam} />
        </div>
      </main>
    </div>
  );
};

export default Team;
