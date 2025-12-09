"use client";

import ProjectCard from "../components/ui/ProjectCard";

const projects = [
  {
    number: "01",
    title: "Futuredraw",
    tags: ["Speculative Design", "Gesture Tracking", "Prototyping"],
    subtitle: "Knowledge Navigator",
    description:
      "A knowledge navigator interface that allows users to seamlessly navigate information through intuitive gesture-based interactions. Built with speculative design principles and advanced prototyping techniques.",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1000&auto=format&fit=crop",
    githubUrl: "https://github.com",
  },
  {
    number: "02",
    title: "Campus Companion",
    tags: ["Product Design", "UX Research", "UI Design"],
    subtitle: "Student Discovery Platform",
    description:
      "A lightweight app to help students discover events, resources, and opportunities around campus without the clutter. Designed with systems thinking and user-centered research methodologies.",
    image:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1000&auto=format&fit=crop",
    githubUrl: "https://github.com",
  },
  {
    number: "03",
    title: "Code Studio",
    tags: ["Interaction Design", "Prototyping", "Motion"],
    subtitle: "Collaboration Dashboard",
    description:
      "An interactive dashboard that makes collaborating on workshops and hackathons intuitive for new members. Features smooth motion design and thoughtful interaction patterns.",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1000&auto=format&fit=crop",
    githubUrl: "https://github.com",
  },
  {
    number: "04",
    title: "EventHub",
    tags: ["Full Stack", "React", "Node.js"],
    subtitle: "Event Management System",
    description:
      "A comprehensive event management platform for organizing and tracking tech events, workshops, and hackathons. Built with modern web technologies and scalable architecture.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop",
    githubUrl: "https://github.com",
  },
  {
    number: "05",
    title: "Design System Pro",
    tags: ["Design Systems", "React", "Documentation"],
    subtitle: "Component Library",
    description:
      "A comprehensive design system and component library for building consistent user interfaces. Includes detailed documentation, design tokens, and reusable React components.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
    githubUrl: "https://github.com",
  },
  {
    number: "06",
    title: "AI Assistant",
    tags: ["AI/ML", "Natural Language", "Chatbot"],
    subtitle: "Intelligent Helper",
    description:
      "An AI-powered assistant that helps users navigate complex information and perform tasks efficiently. Built with advanced natural language processing and machine learning capabilities.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
    githubUrl: "https://github.com",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white pt-20 md:pt-24 pb-12 md:pb-16">
      <section className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header */}
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Projects,{" "}
            <span className="text-red-500">See What We Build..</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our collection of innovative projects, from design systems to AI-powered applications.
          </p>
        </header>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
