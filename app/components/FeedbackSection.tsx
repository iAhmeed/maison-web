'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Star } from 'lucide-react';
import MotionSection from './MotionSection';


interface Feedback {
    _id: string;
    clientName: string;
    feedbackText: string;
    rating: number;
    approved: boolean;
}

export default function FeedbackSection() {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const res = await fetch('/api/feedbacks');
                const data = await res.json();
                const approvedOnly = data.feedbacks.filter((f: Feedback) => f.approved);
                setFeedbacks(approvedOnly);
            } catch (err) {
                console.error('Erreur lors du chargement des avis:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    if (loading) {
        return (
            <section className="py-16 text-center text-gray-400">
                Chargement des avis clients...
            </section>
        );
    }

    // Number of cards to show before "Show all"
    const cardsPerRow = 3;
    const rowsToShow = 2;
    const maxVisible = showAll ? feedbacks.length : cardsPerRow * rowsToShow;
    const visibleFeedbacks = feedbacks.slice(0, maxVisible);

    return (
        <MotionSection className="py-20 px-6" id="feedback">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold text-center mb-12 text-[var(--accent)]"
                >
                    Ils nous aiment
                </motion.h2>

                {feedbacks.length === 0 ? (
                    <p className="text-center text-gray-500">Aucun avis approuvé pour le moment.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        <AnimatePresence mode="sync">
                            {visibleFeedbacks.map((fb, index) => {

                                const minHeight = `${Math.min(220, Math.max(64, fb.feedbackText.length * 1.2))}px`;

                                return (
                                    <motion.div
                                        key={fb._id}
                                        layout
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 30 }}
                                        transition={{ duration: 0.5, delay: index * 0.07 }}
                                        className="bg-[var(--card-bg)] rounded-xl shadow-xl border border-[var(--card-border)] backdrop-blur transition p-6 hover:shadow-2xl bg-opacity-80"
                                        style={{
                                            minHeight,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <div>
                                            <div className="flex items-center gap-2 mt-3 text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={18}
                                                        fill={i < fb.rating ? 'currentColor' : 'none'}
                                                        stroke="currentColor"
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-gray-300 text-sm mb-4 mt-4">"{fb.feedbackText}"</p>
                                        </div>
                                        <p className="font-semibold text-sm text-right text-[var(--accent)] mb-2">
                                            – {fb.clientName}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
                {!showAll && feedbacks.length > maxVisible && (
                    <div className="flex justify-center mt-8">
                        <button
                            className="px-6 py-2 rounded-full bg-[var(--accent)] text-white font-semibold shadow hover:bg-[var(--accent-dark)] transition cursor-pointer"
                            onClick={() => setShowAll(true)}
                            style={{ cursor: 'pointer' }}
                        >
                            Voir plus
                        </button>
                    </div>
                )}
                {showAll && feedbacks.length > cardsPerRow * rowsToShow && (
                    <div className="flex justify-center mt-8">
                        <button
                            className="px-6 py-2 rounded-full bg-[var(--accent)] text-white font-semibold shadow hover:bg-[var(--accent-dark)] transition cursor-pointer"
                            onClick={() => setShowAll(false)}
                            style={{ cursor: 'pointer' }}
                        >
                            Voir moins
                        </button>
                    </div>
                )}
            </div>
        </MotionSection>
    );
}
