import React from "react";

const projects = [
  {
    title: "Futuredraw",
    tag: "Speculative design",
    desc: "A knowledge navigator interface that allows users to seamlessly navigate information – in this case, in a pottery studio.",
    skills: "Gesture tracking, Prototyping, Speculative",
    img: "/images/futuredraw.png",
  },
  {
    title: "Refund Rumble",
    tag: "Dark Patterns",
    desc: "Simulation of an intentionally bad UX as a parody for designers to foster empathy towards edge cases accessibility struggles.",
    skills: "User testing, Game design",
    img: "/images/refund.png",
  },
  {
    title: "Diawave",
    tag: "Healthcare",
    desc: "Diabetes care for type-1 diabetics with wearable sensors and a mobile application for real-time health insights.",
    skills: "System design, Rapid Prototyping",
    img: "/images/diawave.png",
  },
  {
    title: "Home Security Ecosystem",
    tag: "Home Security",
    tag2: "Coming Soon",
    desc: "Safer living through enhanced package management, tailgating alerts, and emergency response features.",
    skills: "Research, System design, User experience",
    img: "/images/home-security.png",
    wide: true,
  },
];

const ProjectGrid = () => {
  return (
    <div className="w-full min-h-screen bg-[#faf9f6] p-8 md:p-16">
      <div className="grid md:grid-cols-3 gap-10">
        {projects.slice(0, 3).map((p, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition"
          >
            <img
              src={p.img}
              alt={p.title}
              className="rounded-lg w-full h-56 object-cover mb-4"
            />
            <span className="text-xs bg-gray-200 px-3 py-1 rounded-full">
              {p.tag}
            </span>
            <h2 className="text-xl font-semibold mt-3">{p.title}</h2>
            <p className="text-gray-600 mt-2">{p.desc}</p>
            <p className="text-gray-900 font-medium mt-3">{p.skills}</p>
          </div>
        ))}

        {/* Wide card */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition">
            <img
              src={projects[3].img}
              alt={projects[3].title}
              className="rounded-lg w-full h-72 object-cover mb-4"
            />

            <div className="flex gap-3 mb-2">
              <span className="text-xs bg-gray-200 px-3 py-1 rounded-full">
                {projects[3].tag}
              </span>
              <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full">
                {projects[3].tag2}
              </span>
            </div>

            <h2 className="text-xl font-semibold">{projects[3].title}</h2>
            <p className="text-gray-600 mt-2">{projects[3].desc}</p>
            <p className="text-gray-900 font-medium mt-3">{projects[3].skills}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectGrid;
