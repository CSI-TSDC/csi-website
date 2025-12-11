"use client";
import { FiGithub } from "react-icons/fi";

export default function ProjectCard({ project }) {
  const tags = project.tags?.slice(0, 2) || [];

  return (
    <div className="relative group h-full
          w-full">
      {/* Card — this element itself transforms on hover */}
      <article
        className="
          relative
          bg-white text-black
          overflow-hidden
          transform-gpu
          origin-top
          group-hover:-translate-y-6 group-hover:rotate-1 group-hover:scale-105
          group-hover:bg-purple-600 group-hover:text-white
          group-hover:z-10
          group-hover:shadow-2xl
          h-full
          w-full
          px-4
          pt-5
        "
        aria-label={project.title}
      >
        {/* Image (slightly smaller now) */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full aspect-[3/3.2] object-cover group-hover:scale-105 group-hover:brightness-90"
        />

        {/* Body */}
        <div className="px-5 py-5">
          <h3 className="text-lg font-semibold group-hover:text-white">
            {project.title}
          </h3>

          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 bg-gray-100 group-hover:bg-white/20 group-hover:text-white"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-sm leading-relaxed mt-3 group-hover:text-white/95">
            {project.description}
          </p>

          <div className="mt-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex items-center gap-2 text-sm font-medium px-3 py-2
                bg-black text-white
                transition-colors duration-200
                hover:bg-gray-800
              "
            >
              <FiGithub size={16} />
              View on GitHub
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}