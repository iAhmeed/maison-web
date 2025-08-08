'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Service {
    _id: string;
    title: string;
}

export default function CustomProjectForm() {
    const [services, setServices] = useState<Service[]>([]);
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        budget: '',
        serviceId: '',
        summary: '',
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch('/api/services');
                const data = await res.json();
                setServices(data.services);
            } catch (err) {
                console.error('Erreur lors du chargement des services:', err);
            }
        };
        fetchServices();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const res = await fetch('/api/custom-projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setStatus('sent');
                setForm({
                    name: '',
                    email: '',
                    phone: '',
                    budget: '',
                    serviceId: '',
                    summary: '',
                });
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <section className="py-20 px-6" id="custom-project-form">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="max-w-3xl mx-auto rounded-2xl shadow-2xl border border-[var(--card-border)] p-8 backdrop-blur bg-opacity-90"
                style={{
                    background: "linear-gradient(135deg, #16232f 0%, #14532d 100%)",
                }}
            >
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold text-center mb-8 text-[var(--accent)]"
                >
                    Demandez un projet sur mesure
                </motion.h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col w-full">
                            <label htmlFor="name" className="mb-1 font-medium">
                                Votre nom <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                placeholder="Votre nom"
                                value={form.name}
                                onChange={handleChange}
                                className="border border-[var(--card-border)] rounded-md px-4 py-2 w-full bg-[var(--background)] text-[var(--foreground)] placeholder-gray-400 focus:ring-2 focus:ring-[var(--accent)] transition"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="email" className="mb-1 font-medium">
                                Votre email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                placeholder="Votre email"
                                value={form.email}
                                onChange={handleChange}
                                pattern="^[\w\.-]+@[\w\.-]+\.\w{2,}$"
                                title="Veuillez entrer une adresse email valide"
                                className="border border-[var(--card-border)] rounded-md px-4 py-2 w-full bg-[var(--background)] text-[var(--foreground)] placeholder-gray-400 focus:ring-2 focus:ring-[var(--accent)] transition"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="phone" className="mb-1 font-medium">
                                Votre numéro de téléphone <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                placeholder="+33 6 66 77 88 99"
                                value={form.phone}
                                onChange={handleChange}
                                pattern="^\+?[0-9\s\-().]{7,}$"
                                title="Veuillez entrer un numéro de téléphone valide au format international (ex: +33 6 05 04 67 13)"
                                className="border border-[var(--card-border)] rounded-md px-4 py-2 w-full bg-[var(--background)] text-[var(--foreground)] placeholder-gray-400 focus:ring-2 focus:ring-[var(--accent)] transition"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="budget" className="mb-1 font-medium">
                                Budget estimé <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="budget"
                                name="budget"
                                required
                                value={form.budget}
                                onChange={handleChange}
                                className="border border-[var(--card-border)] rounded-md px-4 py-2 w-full bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--accent)] transition"
                            >
                                <option value="">Sélectionnez un budget</option>
                                <option value="Moins de 5K €">Moins de 5 000 €</option>
                                <option value="5k-10k €">De 5 000 à 10 000 €</option>
                                <option value="Plus de 10K €">Plus de 10 000 €</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="serviceId" className="mb-1 font-medium">
                            Service souhaité <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="serviceId"
                            name="serviceId"
                            required
                            value={form.serviceId}
                            onChange={handleChange}
                            className="border border-[var(--card-border)] rounded-md px-4 py-2 w-full bg-[var(--background)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--accent)] transition"
                        >
                            <option value="">Sélectionnez un service</option>
                            {services.map(service => (
                                <option key={service._id} value={service._id}>
                                    {service.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="summary" className="mb-1 font-medium">
                            Décrivez votre projet
                        </label>
                        <textarea
                            id="summary"
                            name="summary"
                            rows={5}
                            placeholder="Décrivez votre projet..."
                            value={form.summary}
                            onChange={handleChange}
                            className="border border-[var(--card-border)] rounded-md px-4 py-2 w-full bg-[var(--background)] text-[var(--foreground)] placeholder-gray-400 focus:ring-2 focus:ring-[var(--accent)] transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="bg-[var(--accent)] text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition w-full shadow-lg cursor-pointer disabled:cursor-not-allowed"
                    >
                        {status === 'sending'
                            ? 'Envoi en cours...'
                            : status === 'sent'
                                ? 'Demande envoyée !'
                                : 'Envoyer la demande'}
                    </button>

                    {status === 'error' && (
                        <p className="text-red-500 text-sm text-center">
                            Une erreur s’est produite. Veuillez réessayer plus tard.
                        </p>
                    )}
                </form>
            </motion.div>
        </section>
    );
}
