"use client";

const projects = [
  {
    id: 1,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/012/981/791/small/old-parchment-paper-sheet-vintage-aged-or-texture-background-png.png",
    tag: "Speculative design",
    title: "Futuredraw",
    description:
      "A knowledge navigator interface that allows users to seamlessly navigate information.",
    skills: "Gesture tracking, Prototyping, Speculative",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1000&auto=format&fit=crop",
    tag: "Product design",
    title: "Campus Companion",
    description:
      "A lightweight app to help students discover events, resources, and opportunities around campus without the clutter.",
    skills: "UX Research, UI Design, Systems Thinking",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1000&auto=format&fit=crop",
    tag: "Interaction design",
    title: "Code Studio",
    description:
      "An interactive dashboard that makes collaborating on workshops and hackathons intuitive for new members.",
    skills: "Interaction, Prototyping, Motion",
  },
];

function ProjectCard({ project }) {
  return (
    <article className="relative rounded-3xl overflow-visible pb-10">

     
      <div className="relative w-full flex justify-center">
        <img
          src={project.image}
          alt={project.title}
          className="w-[90%] rounded-md relative z-20 -mb-12 mt-6 border border-neutral-200"
        />
      </div>

      
      <div className="bg-[#FAFAFA] rounded-md border border-neutral-200 px-8 pt-14 pb-6 relative z-10 mx-0">

       
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-neutral-200 text-neutral-700 text-xs mb-3">
          {project.tag}
        </span>

      
        <h3 className="text-lg md:text-xl font-semibold text-neutral-900 mb-2">
          {project.title}
        </h3>

        
        <p className="text-[14px] text-neutral-600 leading-relaxed mb-3">
          {project.description}
        </p>

     
        <p className="text-sm font-medium text-neutral-800">
          {project.skills}
        </p>
      </div>
    </article>
  );
}

export default function page() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] py-10 md:pt-10">
      <section className="max-w-6xl mx-auto px-6 space-y-8">

       
        <header className="space-y-2 justify-center flex flex-col text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold text-neutral-900">
            Projects done by us..
          </h1>
        </header>

       
        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

      </section>
    </main>
  );
}
