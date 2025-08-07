'use client';

import { useEffect, useState } from 'react';

export default function useActiveSection(sectionIds: string[]) {
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            let current = null;
            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        current = id;
                        break;
                    }
                }
            }
            setActive(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionIds]);

    return active;
}
