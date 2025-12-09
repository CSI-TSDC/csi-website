"use client";

import Folder from "./ui/Folder";

const caseStudies = [
  {
    number: "01",
    title: "Project 1",
    tags: ["Product Discovery", "AI"],
    subtitle: "Fragrance Finder",
    description:
      "Product Discovery and exploration through conversation with AI. Design systems, Rapid Prototyping, Conversation UI",
    image:
      "https://images.unsplash.com/photo-1763493411066-48cc93cc82db?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    githubUrl: "https://github.com",
  },
  {
    number: "02",
    title: "another case study",
    tags: ["Research", "UX"],
    subtitle: "User Experience Study",
    description:
      "Product Discovery and exploration through conversation with AI. Design systems, Rapid Prototyping, Conversation UI",
    image:
      "https://images.unsplash.com/photo-1763493411066-48cc93cc82db?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    githubUrl: "https://github.com",
  },
  {
    number: "03",
    title: "another case study",
    tags: ["Research", "UX"],
    subtitle: "User Experience Study",
    description:
      "Product Discovery and exploration through conversation with AI. Design systems, Rapid Prototyping, Conversation UI",
    image:
      "https://images.unsplash.com/photo-1763493411066-48cc93cc82db?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    githubUrl: "https://github.com",
  },
];

export default function CaseStudies() {
  return (
    <section className="w-full px-16 py-12 md:py-16">
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-12">
          Projects,{" "}
          <span className="text-red-500">See What We Build..</span>
        </h2>

      <div className="flex flex-wrap justify-center gap-8 mb-16">
        {caseStudies.map((study, idx) => (
          <Folder key={idx} project={study} />
        ))}
      </div>

      <div className="flex justify-center" href="/projects">
      <a href="/projects">
        <button className="inline-flex items-center gap-4 px-6 py-4 bg-blue-900 text-white rounded-full font-semibold shadow-lg hover:bg-blue-800 transition-colors duration-200 text-lg">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <span>View More</span>
        </button>
      </a>
      </div>
    </section>
  );
}
