// app/portfolio/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CustomProjectForm from "../components/CustomProjectForm";
import { motion, AnimatePresence } from "framer-motion"; // <-- Add framer-motion

interface Project {
    _id: string;
    title: string;
    type: string;
    description: string;
    images: { url: string; publicId: string }[];
    dateOfCompletion: string;
    duration?: string;
    technologies?: string[];
    link?: string;
}

export default function PortfolioPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [displayCount, setDisplayCount] = useState(0);
    const [showTitle, setShowTitle] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            const res = await fetch("/api/projects");
            const data = await res.json();
            setProjects(data.projects);
        };
        fetchProjects();
    }, []);

    // Cool increment animation for project count
    useEffect(() => {
        if (projects.length === 0) return;
        setDisplayCount(0);
        setShowTitle(false);
        let current = 0;
        const increment = () => {
            if (current < projects.length) {
                current++;
                setDisplayCount(current);
                setTimeout(increment, 30);
            } else {
                setTimeout(() => setShowTitle(true), 200); // Show title after a short delay
            }
        };
        increment();
    }, [projects.length]);

    return (
        <section className="px-4 py-16 max-w-7xl mx-auto">
            <h1 className="text-5xl font-extrabold mb-6 text-center text-green-600 tracking-tight" style={{ fontFamily: "Geist, Inter, Arial, Helvetica, sans-serif" }}>
                <span className="inline-block transition-all duration-300">{displayCount}</span>
                <AnimatePresence>
                    {showTitle && (
                        <motion.span
                            key="projets-title"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="inline-block ml-3"
                        >
                            {projects.length == 1 ? "Projet" : "Projets"}
                        </motion.span>
                    )}
                </AnimatePresence>
            </h1>
            <p className="text-lg text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                Découvrez nos réalisations web, e-commerce, branding et plus encore. Chaque projet est conçu sur mesure pour répondre aux besoins de nos clients.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {projects.map((project) => (
                    <div
                        key={project._id}
                        className="group bg-green-200 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100 relative"
                    >
                        <Link href={`/portfolio/${project._id}`}>
                            <div className="relative h-64 w-full overflow-hidden cursor-pointer">
                                <Image
                                    src={project.images[0]?.url || "/placeholder.jpg"}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 group-hover:opacity-40 transition duration-300" />
                                <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-10 flex flex-col justify-end">
                                    <h2 className="text-2xl font-bold text-white mb-1 drop-shadow">{project.title}</h2>
                                    <p className="text-sm text-green-200 font-semibold">{project.type}</p>
                                </div>
                            </div>
                        </Link>
                        <div className="p-6">
                            <p className="text-gray-700 text-base mb-4 line-clamp-3">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies?.map((tech) => (
                                    <span key={tech} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-xs text-gray-400">{project.dateOfCompletion}</span>
                                {project.link && (
                                    <a
                                        href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-600 hover:underline text-sm font-semibold"
                                    >
                                        Voir le site
                                    </a>
                                )}
                            </div>
                        </div>
                        <span className="absolute top-4 right-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow font-semibold">
                            {project.type}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-36">
                <CustomProjectForm />
            </div>
        </section>
    );
}
