'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, Facebook, Instagram } from 'lucide-react';
import { FaRegCalendarAlt, FaLightbulb } from "react-icons/fa";
import MotionSection from './MotionSection';

export default function AboutSection() {
    return (
        <MotionSection className="py-24 px-8 bg-[var(--card-bg)] text-[var(--foreground)] rounded-3xl shadow-2xl border border-[var(--card-border)] max-w-5xl mx-auto" id="about">
            <motion.h2
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="text-4xl md:text-5xl font-extrabold text-center mb-14 tracking-tight"
            >
                L'Essence de Maison Web
            </motion.h2>
            <div className="space-y-10 text-lg leading-relaxed">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.7, ease: 'easeOut' }}
                    className="bg-[var(--background)] bg-opacity-80 rounded-xl p-6 border border-[var(--card-border)] shadow hover:shadow-lg transition"
                >
                    <h3 className="text-2xl font-semibold mb-3 text-[var(--accent)] flex items-center gap-2">
                        <FaRegCalendarAlt className="inline-block w-6 h-6 text-red-400" />
                        Créée en 2025
                    </h3>
                    <p>
                        Maison Web accompagne les entrepreneurs et entreprises dans leur transformation digitale avec des solutions sur mesure, modernes et efficaces.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
                    className="bg-[var(--background)] bg-opacity-80 rounded-xl p-6 border border-[var(--card-border)] shadow hover:shadow-lg transition"
                >
                    <h3 className="text-2xl font-semibold mb-3 text-[var(--accent)] flex items-center gap-2">
                        <FaLightbulb className="inline-block w-6 h-6 text-yellow-400" />
                        Une histoire, une passion
                    </h3>
                    <p>
                        Maison Web est née d’un constat simple : trop d’entreprises, de commerçants et d’indépendants n’ont pas encore de présence digitale à la hauteur de leur savoir-faire.
                        Alors que le web est devenu incontournable, beaucoup n’ont ni le temps ni les ressources pour s’y lancer efficacement.

                        C’est dans ce contexte que Maison Web a vu le jour, avec une idée claire :
                        rendre le web accessible, simple et esthétique pour tous ceux qui ont des choses à montrer, à vendre, ou à partager.

                        Au départ, c’était juste un ordinateur, une vision, et une volonté farouche d’aider les “petits” à avoir des outils dignes des plus grands.
                        Aujourd’hui, Maison Web accompagne des marques, des artisans, des restaurateurs, des services locaux dans la création de leur identité digitale : sites vitrines, e-commerce, refontes, contenus, etc.

                        Notre mission est restée la même :
                        Créer des sites qui ressemblent à ceux qui les portent.
                        Des sites utiles. Rapides. Modernes. Qui donnent envie.
                        Et surtout, qui bossent pour vous, pendant que vous, vous bossez sur votre activité.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
                    className="bg-[var(--background)] bg-opacity-80 rounded-xl p-6 border border-[var(--card-border)] shadow"
                >
                    {/* Maison Web top center */}
                    <div className="flex justify-center mb-6">
                        <h3 className="text-2xl font-semibold text-[var(--accent)]">
                            Maison Web
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                        {/* Contact infos left */}
                        <ul className="space-y-3 md:col-span-1">
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-blue-600" />
                                <a
                                    href="mailto:contact@maisonweb.fr"
                                    className="font-mono hover:underline transition"
                                >
                                    contact@maisonweb.fr
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-[var(--accent)]" />
                                <span className="font-mono">+33 6 05 40 91 37</span>
                            </li>
                        </ul>
                        {/* Empty column for spacing on desktop */}
                        <div className="hidden md:block" />
                        {/* Socials right center */}
                        <div className="flex flex-col items-center md:items-end gap-2 md:col-span-1">
                            <div className="flex gap-4 mt-1">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
                                    <Facebook className="w-7 h-7 text-blue-500" />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
                                    <Instagram className="w-7 h-7 text-pink-500" />
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </MotionSection>
    );
}
