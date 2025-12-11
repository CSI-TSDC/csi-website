"use client";

import ProjectCard from "../components/ui/ProjectCard";

const projects = [
  {
    title: "Futuredraw",
    tags: ["Speculative", "Gesture"],
    githubUrl: "https://github.com",
    description:
      "A knowledge navigator interface that lets users explore information through intuitive gesture-based interactions.",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Campus Companion",
    tags: ["Product", "UX"],
    githubUrl: "https://github.com",
    description: "Helps students discover events and resources around campus.",
    image:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Code Studio",
    tags: ["Interaction", "Motion"],
    githubUrl: "https://github.com",
    description:
      "A dashboard for collaborating on workshops and hackathons with smooth interactions.",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "EventHub",
    tags: ["Full Stack", "React"],
    githubUrl: "https://github.com",
    description: "Platform for managing and tracking tech events and workshops.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Design System Pro",
    tags: ["Design System", "Docs"],
    githubUrl: "https://github.com",
    description: "Reusable component library with clear documentation.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "AI Assistant",
    tags: ["AI/ML", "NLP"],
    githubUrl: "https://github.com",
    description: "Intelligent assistant built with advanced NLP and ML.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white pt-20 pb-12">
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Projects <span className="text-red-500">See What We Build</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of select projects.
          </p>
        </header>

        {/* Grid with vertical dividers between columns */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p, i) => (
            <div
              key={i}
              className={`
                my-6
                ${i % 4 !== 0 ? "g:border-x lg:border-black" : ""}
                ${i % 2 !== 0 ? "sm:border-x sm:border-black" : ""}
              `}
            >
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}