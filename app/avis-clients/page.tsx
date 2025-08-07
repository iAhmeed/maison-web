'use client';

import { useState, useRef } from 'react';
import { FaUser, FaCommentDots, FaStar, FaPaperPlane, FaRegSmileBeam, FaRegStickyNote } from 'react-icons/fa';
import ReCAPTCHA from 'react-google-recaptcha';

export default function FeedbackPage() {
    const [clientName, setClientName] = useState('');
    const [feedbackText, setFeedbackText] = useState('');
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [hovered, setHovered] = useState<number | null>(null);
    const [captcha, setCaptcha] = useState<string | null>(null);

    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSubmitted(false);

        if (!clientName || !feedbackText || !rating) {
            setError("Tous les champs sont obligatoires.");
            return;
        }

        if (!captcha) {
            setError("Veuillez valider le reCAPTCHA.");
            return;
        }

        try {
            const res = await fetch('/api/feedbacks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ clientName, feedbackText, rating, captcha }),
            });

            if (!res.ok) {
                throw new Error('Une erreur est survenue.');
            }

            setClientName('');
            setFeedbackText('');
            setRating(0);
            setSubmitted(true);
            setCaptcha(null);
            if (recaptchaRef.current) recaptchaRef.current.reset();
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <>
            <div className="w-full flex flex-col items-center mt-12 mb-6">
                <h2 className="text-3xl md:text-4xl font-extrabold text-green-600 mb-2 text-center" style={{ fontFamily: 'Geist, Inter, Arial, Helvetica, sans-serif' }}>
                    Votre avis compte pour nous !
                </h2>
                <p className="text-lg md:text-xl text-white text-center max-w-2xl">
                    Si vous aimez <span className="font-semibold text-green-600">Maison Web</span>, nous vous serions <span className="font-semibold text-green-600">très reconnaissants</span> de laisser votre avis ci-dessous&nbsp;!
                </p>
            </div>
            <div
                className="max-w-2xl mx-auto p-6 rounded-xl shadow-md text-gray-900"
                style={{
                    background: 'linear-gradient(135deg, #fffbe6 0%, #e0ffe7 50%, #ffe0e0 100%)',
                }}
            >
                <h1 className="text-2xl font-bold mb-2 text-center text-green-700 flex items-center justify-center gap-2">
                    <FaRegStickyNote color="#16a34a" />
                    Donnez votre avis
                </h1>

                {submitted && (
                    <div className="mb-4 p-3 bg-green-100 text-green-800 rounded flex items-center gap-2">
                        <FaRegSmileBeam color="#16a34a" />
                        Merci pour votre retour ! Il sera affiché une fois approuvé.
                    </div>
                )}

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-800 rounded flex items-center gap-2">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium mb-1 flex items-center gap-1">
                            <FaUser color="#0ea5e9" />
                            Votre nom complet ou pseudo
                        </label>
                        <input
                            type="text"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                            placeholder="Ex : Alice Dupont"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-1 flex items-center gap-1">
                            <FaCommentDots color="#f59e42" />
                            Votre avis
                        </label>
                        <textarea
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            rows={4}
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                            placeholder="Partagez votre expérience avec Maison Web..."
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-1 flex items-center gap-1">
                            <FaStar color="#facc15" />
                            Note
                        </label>
                        <div className="flex gap-2 items-center justify-center">
                            {[1, 2, 3, 4, 5].map((val) => (
                                <button
                                    key={val}
                                    type="button"
                                    className={`text-3xl transition-all duration-200 transform
                                        ${((hovered ?? rating) >= val)
                                            ? 'scale-125 drop-shadow-lg'
                                            : ''}
                                        ${hovered === val ? 'animate-bounce' : ''}
                                        hover:scale-150`}
                                    onClick={() => setRating(val)}
                                    onMouseEnter={() => setHovered(val)}
                                    onMouseLeave={() => setHovered(null)}
                                    aria-label={`Note ${val} étoiles`}
                                    style={{ cursor: 'pointer', background: 'none', border: 'none', outline: 'none' }}
                                >
                                    <FaStar color={((hovered ?? rating) >= val) ? "#facc15" : "#d1d5db"} />
                                </button>
                            ))}
                            <span className="ml-2 text-sm text-gray-500">{rating} / 5</span>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
                            onChange={token => setCaptcha(token)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full flex items-center justify-center gap-2 font-semibold"
                    >
                        <FaPaperPlane color="#ffffff" />
                        Soumettre mon avis
                    </button>
                </form>
            </div>
        </>
    );
}
