'use client';

import { useEffect, useState } from 'react';
import useActiveSection from '../hooks/useActiveSection'; // adjust path if needed
import Link from 'next/link';
import Image from 'next/image';

const sections = [
    { label: 'Services', id: 'services' },
    { label: 'Avis clients', id: 'feedback' },
    { label: 'Historique', id: 'about' },
];

export default function Navbar() {
    const activeSection = useActiveSection(sections.map(s => s.label));
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'bg-[var(--card-bg)]/90 shadow-lg backdrop-blur-md'
                : 'bg-transparent'
                }`}
        >
            <div
                className={`flex items-center justify-center mx-auto w-full px-6 transition-all duration-500 ${scrolled
                    ? 'max-w-2xl rounded-2xl py-2 mt-4'
                    : 'max-w-7xl py-4'
                    }`}
                style={{ whiteSpace: 'nowrap' }}
            >
                <Link
                    href="/"
                    className={`flex items-center gap-2 font-extrabold text-2xl tracking-tight transition-all duration-500 whitespace-nowrap ${scrolled ? 'text-[var(--accent)]' : 'text-[var(--foreground)]'
                        } mx-8`}
                    style={{
                        fontFamily: 'Geist, Inter, Arial, Helvetica, sans-serif',
                        letterSpacing: '0.02em',
                    }}
                >
                    <Image
                        src="/maisonweb.svg"
                        alt="Maison Web Logo"
                        width={32}
                        height={32}
                        className="inline-block"
                        priority
                    />
                    Maison Web
                </Link>

                <ul className="flex gap-10 justify-center items-center whitespace-nowrap mx-8">
                    {sections.map((section) => (
                        <li key={section.id}>
                            <a
                                href={`#${section.id}`}
                                className={`transition px-3 py-1 rounded-full whitespace-nowrap ${activeSection === section.label
                                    ? 'bg-[var(--accent)]/20 text-[var(--accent)] font-semibold'
                                    : 'text-gray-300 hover:text-[var(--accent)]'
                                    }`}
                            >
                                {section.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <Link
                    href="/avis-clients"
                    className={`px-5 py-2 rounded-full font-semibold shadow transition-all duration-300 whitespace-nowrap mx-8 ${scrolled
                        ? 'bg-[var(--accent)] text-white hover:bg-green-700'
                        : 'bg-[var(--accent)]/80 text-white hover:bg-[var(--accent)]'
                        }`}
                >
                    Nous évaluer
                </Link>
            </div>
        </nav>
    );
}
