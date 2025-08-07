'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import MotionSection from './MotionSection';

export default function Hero() {
    const handleScrollToForm = () => {
        const formSection = document.getElementById('custom-project-form');
        if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <MotionSection className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-8 py-24 bg-gradient-to-br from-[var(--background)] to-[var(--card-bg)] text-[var(--foreground)] rounded-3xl shadow-2xl">
            <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl font-extrabold max-w-4xl mb-8 tracking-tight"
            >
                Donnez vie à vos idées avec Maison Web
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-4 text-xl md:text-2xl max-w-2xl text-gray-300"
            >
                Création de sites web, design, développement, montage vidéo… Nous
                transformons votre vision en solutions digitales percutantes.
            </motion.p>
            <motion.button
                onClick={handleScrollToForm}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-10 px-10 py-4 text-xl font-semibold bg-[var(--accent)] hover:bg-green-700 text-white rounded-full shadow-lg transition-all"
            >
                Demandez votre projet sur mesure
            </motion.button>
        </MotionSection>
    );
}
