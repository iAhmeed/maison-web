'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import MotionSection from './MotionSection';
import {
    FiCode,
    FiPenTool,
    FiSmartphone,
    FiCamera,
    FiCpu,
    FiLayers,
    FiMonitor,
    FiTarget,
    FiAperture,
    FiGrid,
} from 'react-icons/fi';

interface Service {
    _id: string;
    title: string;
    description: string;
    images: { url: string; publicId: string }[];
}

const iconPool = [
    FiCode,
    FiPenTool,
    FiSmartphone,
    FiCamera,
    FiCpu,
    FiLayers,
    FiMonitor,
    FiTarget,
    FiAperture,
    FiGrid,
];

// Fix 1: Specify type for iconMap
const getRandomIconMap = (services: Service[]) => {
    const map: Record<string, React.ComponentType> = {};
    services.forEach((service) => {
        const randomIndex = Math.floor(Math.random() * iconPool.length);
        map[service._id] = iconPool[randomIndex];
    });
    return map;
};

export default function Services() {
    const [services, setServices] = useState<Service[]>([]);
    const [iconMap, setIconMap] = useState<Record<string, React.ComponentType>>({});
    const [hovered, setHovered] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [flippedCardIndex, setFlippedCardIndex] = useState<number | null>(null);
    const [imgIndices, setImgIndices] = useState<number[]>([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch('/api/services');
                const data = await res.json();
                setServices(data.services);
                setIconMap(getRandomIconMap(data.services));
                setImgIndices(Array(data.services.length).fill(0)); // initialize indices
            } catch (err) {
                console.error('Erreur lors du chargement des services:', err);
            }
        };

        fetchServices();
    }, []);

    // Auto-switch images for all cards
    useEffect(() => {
        const timers: NodeJS.Timeout[] = [];
        services.forEach((service, idx) => {
            if (flippedCardIndex !== idx && service.images.length > 1) {
                timers[idx] = setInterval(() => {
                    setImgIndices(prev => {
                        const next = [...prev];
                        next[idx] = (next[idx] + 1) % service.images.length;
                        return next;
                    });
                }, 2500);
            }
        });
        return () => timers.forEach(timer => timer && clearInterval(timer));
    }, [services, flippedCardIndex]);

    return (
        <MotionSection
            id="services"
            className="relative py-32 bg-transparent text-white overflow-hidden px-6"
        >
            <div className="max-w-6xl mx-auto text-center mb-20">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-[var(--accent)]"
                >
                    L’Atelier Digital
                </motion.h2>
                <p className="text-gray-400 mt-4 text-lg">
                    Explorez nos domaines de création et de développement
                </p>
            </div>

            <div
                className="relative h-[450px] flex items-center justify-center"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => {
                    setHovered(false);
                    setActiveIndex(null);
                }}
                style={{ perspective: '2000px' }}
            >
                {services.map((service, index) => {
                    const offset = index - Math.floor(services.length / 2);
                    const baseOffset = 70;
                    const maxSpread = 1200;
                    const hoverOffset = Math.min(250, Math.floor(maxSpread / services.length));
                    const x = offset * (hovered ? hoverOffset : baseOffset);
                    const rotate = hovered ? offset * 5 : 0;
                    const isActive = index === activeIndex;
                    const isFlipped = flippedCardIndex === index;

                    const Icon = iconMap[service._id] ?? FiGrid;
                    const images = service.images ?? [];
                    const imgIdx = imgIndices[index] ?? 0;

                    return (
                        <motion.div
                            key={service._id}
                            onMouseEnter={() => setActiveIndex(index)}
                            onClick={() => setFlippedCardIndex(isFlipped ? null : index)}
                            className="absolute w-[260px] h-[360px] cursor-pointer"
                            style={{ transformStyle: 'preserve-3d' }}
                            initial={false}
                            animate={{
                                x,
                                rotateZ: rotate,
                                scale: isActive ? 1.05 : 1,
                                zIndex: isActive ? 20 : 10 + index,
                            }}
                            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                        >
                            <div
                                className={`relative w-full h-full duration-1000 ease-in-out transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                            >
                                {/* Front Face */}
                                <div className={`absolute w-full h-full rounded-xl overflow-hidden shadow-xl border border-gray-700 bg-black text-white backface-hidden transition-all duration-1000 ease-in-out ${isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                                    <div className="absolute w-full h-full">
                                        {images.map((img, i) => (
                                            <Image
                                                key={img.publicId}
                                                src={img.url}
                                                alt={service.title}
                                                fill
                                                className={`object-cover transition-opacity duration-700 ${imgIdx === i ? 'opacity-100' : 'opacity-0'}`}
                                                style={{ position: 'absolute', inset: 0 }}
                                            />
                                        ))}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
                                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 z-20 text-white">
                                        <div className="text-5xl text-[var(--accent)] mb-2">
                                            <Icon />
                                        </div>
                                        <h3 className="text-xl font-semibold text-center">
                                            {service.title}
                                        </h3>
                                    </div>
                                    {/* Image indicators */}
                                    {images.length > 1 && (
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                                            {images.map((_, i) => (
                                                <span
                                                    key={i}
                                                    className={`w-2 h-2 rounded-full ${imgIdx === i ? 'bg-[var(--accent)]' : 'bg-gray-400/40'} transition-all`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Back Face (Only description) */}
                                <div className={`absolute w-full h-full rounded-xl bg-[#111] text-white p-6 shadow-xl border border-gray-700 rotate-y-180 backface-hidden flex items-center justify-center text-sm text-center transition-all duration-1000 ease-in-out ${isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                                    {service.description}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </MotionSection>
    );
}
