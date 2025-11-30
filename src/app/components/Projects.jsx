"use client";

import ProjectCard from "./ui/ProjectCard";

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
];

export default function CaseStudies() {
  return (
    <section className="w-full px-16 py-12 md:py-16">
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-12">
          Projects,{" "}
          <span className="text-red-500">See What We Build..</span>
        </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {caseStudies.map((study, idx) => (
          <ProjectCard key={idx} project={study} />
        ))}
      </div>
    </section>
  );
}
