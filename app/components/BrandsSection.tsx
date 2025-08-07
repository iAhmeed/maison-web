'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import MotionSection from './MotionSection';

interface Brand {
    _id: string;
    name: string;
    image: {
        url: string;
        publicId: string;
    };
}

export default function BrandsSection() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await fetch('/api/brands');
                const data = await res.json();
                setBrands(data.brands);
            } catch (err) {
                console.error('Erreur lors du chargement des marques:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchBrands();
    }, []);

    // Auto-scroll effect for the logos (horizontal marquee)
    useEffect(() => {
        if (!scrollRef.current || brands.length === 0) return;
        // If there are less than 8 brands, don't scroll (no need to duplicate)
        if (brands.length < 8) {
            scrollRef.current.scrollLeft = 0;
            return;
        }
        let frame: number;
        let pos = 0;
        const speed = 0.7; // px per frame

        function animate() {
            if (!scrollRef.current) return;
            pos += speed;
            if (pos >= scrollRef.current.scrollWidth / 2) pos = 0;
            scrollRef.current.scrollLeft = pos;
            frame = requestAnimationFrame(animate);
        }
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [brands]);

    if (loading) {
        return (
            <section className="py-16 text-center text-gray-400 font-medium tracking-wide">
                Chargement des marques partenaires...
            </section>
        );
    }

    // Duplicate brands for seamless rolling effect
    const rollingBrands = [...brands, ...brands, ...brands, ...brands];

    return (
        <MotionSection className="py-20 px-6 bg-transparent text-[var(--foreground)]" id="brands">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 text-xl md:text-4xl font-semibold tracking-tight"
                    style={{
                        color: 'var(--accent)',
                        letterSpacing: '-0.01em',
                        lineHeight: '1.2',
                    }}
                >
                    Ils nous font confiance
                </motion.h2>
                <div
                    ref={scrollRef}
                    className="relative w-full overflow-x-scroll whitespace-nowrap scrollbar-hide"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    <style>{`
                        .scrollbar-hide::-webkit-scrollbar { display: none; }
                    `}</style>
                    <div
                        className={`inline-flex items-center gap-10 py-2 px-2 ${brands.length < 8 ? 'justify-center w-full' : ''}`}
                        style={brands.length < 8 ? { width: '100%' } : {}}
                    >
                        {(brands.length < 8 ? brands : rollingBrands).map((brand, idx) => (
                            <div
                                key={brand._id + '-' + idx}
                                className="flex items-center justify-center"
                                style={{
                                    width: '96px',
                                    height: '96px',
                                    minWidth: '96px',
                                    minHeight: '96px',
                                    maxWidth: '96px',
                                    maxHeight: '96px',
                                    filter: 'grayscale(1)',
                                    opacity: 0.8,
                                    transition: 'filter 0.3s, opacity 0.3s',
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLDivElement).style.filter = 'none';
                                    (e.currentTarget as HTMLDivElement).style.opacity = '1';
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLDivElement).style.filter = 'grayscale(1)';
                                    (e.currentTarget as HTMLDivElement).style.opacity = '0.8';
                                }}
                            >
                                <Image
                                    src={brand.image.url}
                                    alt={brand.name}
                                    width={96}
                                    height={96}
                                    className="object-contain"
                                    draggable={false}
                                    style={{
                                        width: '96px',
                                        height: '96px',
                                        objectFit: 'contain',
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MotionSection>
    );
}
