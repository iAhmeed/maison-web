'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, animate } from 'framer-motion';
import Image from 'next/image';
import MotionSection from './MotionSection';
import { useRouter } from 'next/navigation';

interface Project {
    _id: string;
    title: string;
    type: string;
    description: string;
    dateOfCompletion: string;
    duration?: string;
    technologies?: string[];
    link?: string;
    images: { url: string; publicId: string }[];
    displayOnHome?: boolean;
}

export default function Portfolio() {
    const [projects, setProjects] = useState<Project[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const [matrixCols] = useState(4);

    // Motion values for smooth panning
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring configuration for smoothness
    const springConfig = { damping: 30, stiffness: 100 };
    const translateX = useSpring(mouseX, springConfig);
    const translateY = useSpring(mouseY, springConfig);

    // Track which card is hovered and its image index
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [imgIndices, setImgIndices] = useState<number[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('/api/projects');
                const data = await res.json();
                const visibleProjects = data.projects.filter((p: Project) => p.displayOnHome);
                setProjects(visibleProjects);
                setImgIndices(Array(visibleProjects.length).fill(0));

            } catch (err) {
                console.error('Erreur lors du chargement des projets:', err);
            }
        };
        fetchProjects();
    }, []);

    // Image carousel effect for hovered card
    useEffect(() => {
        if (hoveredCard === null) return;
        const idx = projects.findIndex(p => p._id === hoveredCard);
        if (idx === -1 || projects[idx].images.length < 2) return;

        const timer = setInterval(() => {
            setImgIndices(prev => {
                const next = [...prev];
                next[idx] = (next[idx] + 1) % projects[idx].images.length;
                return next;
            });
        }, 1200); // minimized switch time

        return () => clearInterval(timer);
    }, [hoveredCard, projects]);

    // Initial centering
    useEffect(() => {
        if (projects.length > 0) {
            const timer = setTimeout(() => {
                handleMouseLeave();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [projects]);

    // Mouse move handler for panning
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const container = containerRef.current;
        const inner = innerRef.current;
        if (!container || !inner) return;

        const { left, top, width: containerWidth, height: containerHeight } = container.getBoundingClientRect();

        // Account for the scale[1.15]
        const scale = 1.15;
        const contentWidth = inner.offsetWidth * scale;
        const contentHeight = inner.offsetHeight * scale;

        const maxMoveX = contentWidth - containerWidth;
        const maxMoveY = contentHeight - containerHeight;

        if (maxMoveX <= 0 && maxMoveY <= 0) return;

        const xPercent = (e.clientX - left) / containerWidth;
        const yPercent = (e.clientY - top) / containerHeight;

        // Target positions (negative to move content)
        mouseX.set(-xPercent * maxMoveX);
        mouseY.set(-yPercent * maxMoveY);
    };

    // Center the matrix when not hovering
    const handleMouseLeave = () => {
        const container = containerRef.current;
        const inner = innerRef.current;
        if (!container || !inner) return;

        const scale = 1.15;
        const contentWidth = inner.offsetWidth * scale;
        const contentHeight = inner.offsetHeight * scale;

        const targetX = -(contentWidth - container.offsetWidth) / 2;
        const targetY = -(contentHeight - container.offsetHeight) / 2;

        animate(mouseX, targetX, { duration: 0.8, ease: "easeOut" });
        animate(mouseY, targetY, { duration: 0.8, ease: "easeOut" });
        setHoveredCard(null);
    };

    return (
        <MotionSection
            className="py-20 bg-transparent text-[var(--foreground)] px-6"
            id="portfolio"
        >
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold text-center mb-12 text-[var(--accent)]"
                >
                    Vitrine de talents
                </motion.h2>

                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="relative overflow-hidden group"
                    style={{
                        height: '500px',
                        width: '100%',
                        cursor: 'default',
                        background: 'linear-gradient(135deg, #181c24 0%, #232a3a 100%)',
                        boxShadow: '0 8px 32px 0 rgba(34,197,94,0.10), 0 1.5px 8px 0 rgba(0,0,0,0.18)',
                    }}
                >
                    <motion.div
                        ref={innerRef}
                        className="grid gap-6 w-max"
                        style={{
                            gridTemplateColumns: `repeat(${matrixCols}, minmax(300px, 1fr))`,
                            x: translateX,
                            y: translateY,
                            scale: 1.15,
                        }}
                    >
                        {projects.map((project, idx) => (
                            <div
                                key={project._id}
                                className="w-[300px] h-[380px] bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl shadow-xl p-4 flex-shrink-0 hover:shadow-2xl transition backdrop-blur bg-opacity-80"
                                style={{ cursor: 'pointer' }}
                                onMouseEnter={() => setHoveredCard(project._id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                onClick={() => router.push(`/portfolio/${project._id}`)} // <-- Add this line
                            >
                                <div className="relative w-full h-40 mb-4 overflow-hidden rounded-xl">
                                    {project.images?.map((img, i) => (
                                        <Image
                                            key={img.publicId}
                                            src={img.url}
                                            alt={project.title}
                                            fill
                                            className={`object-cover rounded-xl transition-opacity duration-700 ${imgIndices[idx] === i ? 'opacity-100' : 'opacity-0'}`}
                                            style={{ position: 'absolute', inset: 0 }}
                                        />
                                    ))}
                                </div>
                                <h3 className="text-xl font-semibold mb-1 text-[var(--accent)]">{project.title}</h3>
                                <p className="text-sm text-gray-400 italic mb-2">{project.type}</p>
                                <p className="text-gray-300 text-sm line-clamp-3 mb-3">
                                    {project.description}
                                </p>
                                {project.link && (
                                    <a
                                        href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[var(--accent)] hover:underline text-sm font-medium"
                                        onClick={e => e.stopPropagation()} // Prevent card click
                                    >
                                        Voir le projet →
                                    </a>
                                )}
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Move the button here, under the projects container */}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => router.push('/portfolio')}
                        className="bg-[var(--accent)] hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition cursor-pointer"
                    >
                        Voir tous les projets
                    </button>
                </div>
            </div>
        </MotionSection>
    );
}
