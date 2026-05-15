"use client";

import { useState, useCallback, useEffect } from "react";

const projectsData = [
    {
        id: "01",
        title: "AI Pipelines & MLOps Orchestration",
        icon: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        tag: "Machine Learning",
        status: "Completed",
        createdBy: "Tech Team — CSI TSDC",
        techStack: ["Python", "FastAPI", "MLflow", "Docker", "Kubernetes"],
        github: "https://github.com/CSI-TSDC",
        liveDemo: null,
        description:
            "A production-grade AI orchestration platform that streamlines the entire ML lifecycle — from data ingestion and model training to deployment and monitoring. The system integrates MLflow for experiment tracking, FastAPI for serving predictions, and Kubernetes for auto-scaling. Built to handle multi-model pipelines with zero-downtime deployments and real-time observability dashboards.",
        images: [
            "/assets/Home/projects/ai-1.webp",
            "/assets/Home/projects/ai-2.webp",
            "/assets/Home/projects/ai-3.webp",
        ],
        fallbackColor: "#1e3a8a",
    },
    {
        id: "02",
        title: "Web3 Infrastructure & On-Chain Forensics",
        icon: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
        ),
        tag: "Blockchain",
        status: "Completed",
        createdBy: "Blockchain Club — CSI TSDC",
        techStack: ["Solidity", "Ethers.js", "Next.js", "The Graph", "IPFS"],
        github: "https://github.com/CSI-TSDC",
        liveDemo: "https://example.com",
        description:
            "An on-chain forensics tool that traces malicious transactions across EVM-compatible chains. Features a visual transaction graph explorer, wallet risk scoring engine, and smart-contract vulnerability scanner. Integrated with The Graph Protocol for sub-second blockchain data queries and IPFS for tamper-proof evidence storage.",
        images: [
            "/assets/Home/projects/web3-1.webp",
            "/assets/Home/projects/web3-2.webp",
        ],
        fallbackColor: "#1e3a8a",
    },
    {
        id: "03",
        title: "Cloud-Native & DevOps Intelligence",
        icon: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
        ),
        tag: "DevOps",
        status: "Completed",
        createdBy: "DevOps Team — CSI TSDC",
        techStack: ["Go", "Terraform", "Prometheus", "Grafana", "AWS"],
        github: "https://github.com/CSI-TSDC",
        liveDemo: null,
        description:
            "A self-healing cloud infrastructure controller that uses Prometheus metrics and custom ML models to predict and prevent outages. Automatically scales services, rolls back failed deployments, and generates incident reports. Built on top of AWS EKS with Terraform-managed infrastructure-as-code and Grafana dashboards for real-time visibility.",
        images: [
            "/assets/Home/projects/cloud-1.webp",
            "/assets/Home/projects/cloud-2.webp",
            "/assets/Home/projects/cloud-3.webp",
        ],
        fallbackColor: "#1e3a8a",
    },
    {
        id: "04",
        title: "Cybersecurity & Threat Intelligence",
        icon: (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        tag: "Security",
        status: "Completed",
        createdBy: "Security Team — CSI TSDC",
        techStack: ["Python", "Rust", "Zeek", "Elasticsearch", "React"],
        github: "https://github.com/CSI-TSDC",
        liveDemo: "https://example.com",
        description:
            "A real-time threat intelligence platform that aggregates IOCs (Indicators of Compromise) from over 30 public feeds, correlates them with live network traffic using Zeek, and surfaces actionable alerts. Features an interactive attack map, CVE lookup, and automated threat hunting playbooks that reduced incident response time by 60%.",
        images: [
            "/assets/Home/projects/cyber-1.webp",
            "/assets/Home/projects/cyber-2.webp",
        ],
        fallbackColor: "#1e3a8a",
    },
];

function ProjectImagePlaceholder({ color, label, className = "" }) {
    return (
        <div
            className={`w-full h-full flex flex-col items-center justify-center gap-3 ${className}`}
            style={{ background: `linear-gradient(135deg, ${color}cc 0%, ${color} 100%)` }}
        >
            <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-white/40 text-xs font-mono tracking-widest">{label}</p>
        </div>
    );
}

function ProjectModal({ project, onClose }) {
    const [activeImg, setActiveImg] = useState(0);

    // Lock body scroll while modal is open (lock both html + body for all browsers)
    useEffect(() => {
        const scrollY = window.scrollY;
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";
        return () => {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            window.scrollTo(0, scrollY);
        };
    }, []);

    // Close on Escape key
    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 md:p-10"
            style={{ backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", background: "rgba(10,18,40,0.72)" }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div
                className="relative w-full max-w-5xl max-h-[90vh] bg-white/[0.07] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
                style={{ backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* LEFT: Images */}
                <div className="flex flex-col w-full md:w-[48%] shrink-0 p-4 sm:p-6 gap-3">
                    <div className="relative w-full rounded-2xl overflow-hidden bg-[#1e3a8a]" style={{ aspectRatio: "4/3" }}>
                        <ProjectImagePlaceholder
                            color={project.fallbackColor}
                            label={`IMAGE ${activeImg + 1} / ${project.images.length}`}
                            className="absolute inset-0"
                        />
                    </div>
                    <div className="flex gap-2.5 overflow-x-auto py-1.5 px-1" style={{ scrollbarWidth: "none" }}>
                        {project.images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveImg(i)}
                                className={`shrink-0 rounded-xl overflow-hidden transition-all duration-200 ${activeImg === i ? "opacity-100" : "opacity-50 hover:opacity-75"}`}
                                style={{
                                    width: 72, height: 54,
                                    outline: activeImg === i ? "2px solid rgba(255,255,255,0.8)" : "2px solid transparent",
                                    outlineOffset: "2px",
                                }}
                            >
                                <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${project.fallbackColor}99 0%, ${project.fallbackColor} 100%)` }}>
                                    <span className="text-white/60 font-mono text-[10px]">{i + 1}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Details — flex column, description scrolls */}
                <div className="flex flex-col w-full md:w-[52%] p-4 sm:p-6 pt-3 min-h-0 overflow-hidden">
                    <div className="shrink-0 mb-4">
                        <p className="text-white/40 text-xs font-mono tracking-widest mb-2">{project.id} // PROJECT</p>
                        <h2 className="text-white font-black text-2xl sm:text-3xl leading-tight mb-5">{project.title}</h2>
                        <div className="grid grid-cols-1 gap-3 mb-5">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-white/40 text-[10px] font-mono tracking-widest uppercase">Created by</span>
                                <span className="text-white/90 text-sm font-semibold">{project.createdBy}</span>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <span className="text-white/40 text-[10px] font-mono tracking-widest uppercase">Tech Stack</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.techStack.map((tech) => (
                                        <span key={tech} className="px-2.5 py-0.5 rounded-full bg-white/8 border border-white/15 text-white/80 text-xs font-mono">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 flex-wrap mb-5">
                            <a href={project.github} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-white text-black hover:bg-white/90 text-sm font-bold px-5 py-2.5 rounded-full shadow-lg hover:scale-105 transition-all duration-200">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                </svg>
                                GitHub
                            </a>
                            {project.liveDemo && (
                                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 border border-white/30 text-white text-sm font-bold px-5 py-2.5 rounded-full hover:scale-105 transition-all duration-200">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    Live Demo
                                </a>
                            )}
                        </div>
                        <div className="border-t border-white/10" />
                    </div>
                    <div className="flex-1 overflow-y-auto pr-1 min-h-0" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.15) transparent" }}>
                        <p className="text-white/60 text-sm md:text-[15px] leading-relaxed pt-4">{project.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─────────── PROJECT CARD ─────────── */
function ProjectCard({ project, onClick }) {
    return (
        <button
            onClick={onClick}
            className="group text-left w-full focus:outline-none cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02]"
        >
            {/* Folder tab */}
            <div className="bg-[#2546b5] h-9 px-5 inline-flex items-center rounded-t-2xl">
                <span className="text-[10px] font-mono font-bold tracking-widest text-white/80">{project.id} // PROJECT</span>
            </div>
            {/* Card */}
            <div className="bg-[#1e40af] group-hover:bg-[#1b3da8] group-hover:shadow-2xl group-hover:shadow-blue-900/40 transition-all duration-300 ease-out rounded-3xl rounded-tl-none shadow-xl p-6 flex flex-col gap-5 min-h-[220px]">
                <div className="flex items-start justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/15 transition-colors duration-300">
                        {project.icon}
                    </div>
                    <span className="text-white/40 text-[10px] font-mono tracking-widest uppercase mt-1 ml-4 text-right group-hover:text-white/60 transition-colors duration-300">
                        {project.tag}
                    </span>
                </div>
                <h3 className="text-white font-black text-xl leading-snug tracking-tight flex-1">{project.title}</h3>
                <div className="flex items-center justify-between">
                    <span className="text-white/50 text-[10px] font-mono tracking-widest uppercase group-hover:text-white/70 transition-colors duration-300">Click to open</span>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                        <svg className="w-4 h-4 text-black group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </button>
    );
}

/* ─────────── PAGE ─────────── */
export default function ProjectsPage() {
    const [activeProject, setActiveProject] = useState(null);

    return (
        <>
            <main className="min-h-screen bg-csi-white text-csi-black">
                {/* Hero */}
                <section className="px-6 md:px-[5vw] pt-20 sm:pt-24 md:pt-32 pb-10 md:pb-16">

                    <h1 className="text-[32px] sm:text-[48px] md:text-[5vw] font-bespoke-sans-bold leading-none tracking-tight mb-4">
                        <span className="text-csi-blue">Our</span> Projects
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-dm-sans-medium">
                        A showcase of what the CSI — TSDC community builds. From AI pipelines to
                        blockchain tools, these are real projects shipped by real students.
                    </p>
                </section>

                {/* Grid */}
                <section className="px-6 md:px-[5vw] pb-24">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {projectsData.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={() => setActiveProject(project)}
                            />
                        ))}
                    </div>
                </section>
            </main>

            {/* Modal */}
            {activeProject && (
                <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
            )}
        </>
    );
}
