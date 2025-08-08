// app/portfolio/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Portfolio | Maison Web",
    description: "Découvrez nos projets récents et notre savoir-faire.",
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
