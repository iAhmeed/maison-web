'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    delay?: number;
    id?: string;
    className?: string;
    background?: string; // Tailwind class like: bg-gradient-to-b from-white to-gray-100
}

export default function MotionSection({ children, delay = 0.15, id, className, background }: Props) {
    return (
        <div className={background}>
            <motion.section
                id={id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay }}
                className={className}
            >
                {children}
            </motion.section>
        </div>
    );
}
