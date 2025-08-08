// app/portfolio/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaRegStar } from "react-icons/fa"; // <-- Add this import
import CustomProjectForm from "../../components/CustomProjectForm";

// Fetch all projects for the "More projects" section
async function getProjects(): Promise<Project[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, {
            cache: "no-store",
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.projects;
    } catch (err) {
        return [];
    }
}

interface Project {
    _id: string;
    title: string;
    type: string;
    description: string;
    images: { url: string; publicId: string }[];
    dateOfCompletion: string;
    duration?: string;
    technologies?: string[];
    link?: string;
}

async function getProject(id: string): Promise<Project | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) return null;

        const data = await res.json();
        return data.project;
    } catch (err) {
        return null;
    }
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
    const id = params.id; // <-- Fix: do not use await here
    const project = await getProject(id);
    if (!project) return notFound();

    // Fetch all projects and filter out the current one
    const allProjects = await getProjects();
    const moreProjects = allProjects.filter((p) => p._id !== id);

    return (
        <section className="px-4 py-12 max-w-5xl mx-auto">
            {/* Title & Type */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-5xl font-extrabold mb-2 text-green-700 tracking-tight" style={{ fontFamily: "Geist, Inter, Arial, Helvetica, sans-serif" }}>
                        {project.title}
                    </h1>
                    <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mt-2">
                        {project.type}
                    </span>
                </div>
            </div>

            {/* Description and Details Side by Side */}
            <div className="flex flex-col md:flex-row gap-12 items-start mb-16">
                {/* Description */}
                <div className="flex-1">
                    <p className="text-xl text-white leading-relaxed">{project.description}</p>
                </div>
                {/* Details Container */}
                <div
                    className="relative rounded-2xl p-8 md:w-[520px] w-full"
                    style={{
                        background: "linear-gradient(135deg, #16232f 0%, #14532d 100%)",
                        boxShadow: "0 8px 32px 0 rgba(34,197,94,0.10), 0 1.5px 8px 0 rgba(0,0,0,0.18)",
                        border: "1px solid #14532d",
                        minWidth: "320px",
                        maxWidth: "100%",
                    }}
                >
                    {/* Decorative accent bar */}
                    <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-green-400 to-green-600 rounded-l-2xl" />
                    <div className="relative z-10 flex flex-col gap-6">
                        <div>
                            <span className="block text-sm font-semibold text-green-200 mb-1">Date d’achèvement</span>
                            <span className="block text-green-100 bg-green-800 px-3 py-1 rounded">{project.dateOfCompletion}</span>
                        </div>
                        {project.duration && (
                            <div>
                                <span className="block text-sm font-semibold text-green-200 mb-1">Durée de réalisation</span>
                                <span className="block text-green-100 bg-green-800 px-3 py-1 rounded">{project.duration}</span>
                            </div>
                        )}
                        {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                            <div>
                                <span className="block text-sm font-semibold text-green-200 mb-1">Technologies utilisées</span>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {project.technologies.map((tech) => (
                                        <span key={tech} className="bg-green-900 text-green-200 px-2 py-1 rounded text-xs font-medium shadow">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {project.link && (
                            <a
                                href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white px-6 py-2 rounded-lg font-semibold shadow transition cursor-pointer text-center inline-block whitespace-nowrap"
                            >
                                Visiter le site
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Images Gallery - Masonry style */}
            <div className="columns-1 md:columns-2 gap-6 space-y-6 mb-24">
                {project.images.map((image, i) => (
                    <div key={i} className="w-full break-inside-avoid rounded-2xl overflow-hidden shadow-lg border border-gray-100 mb-6">
                        <Image
                            src={image.url}
                            alt={`Image ${i + 1}`}
                            width={800}
                            height={500}
                            className="object-cover w-full h-auto transition-transform duration-500 hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                ))}
            </div>

            {/* More Projects Section */}
            {moreProjects.length > 0 && (
                <div className="mt-24">
                    <h2 className="text-3xl font-bold text-green-700 mb-8 tracking-tight flex items-center gap-3 justify-start text-left">
                        <FaRegStar className="inline text-yellow-400 text-4xl" />
                        Plus de projets
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {moreProjects.slice(0, 6).map((p) => (
                            <div
                                key={p._id}
                                className="group bg-green-200 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100 relative"
                            >
                                <Link href={`/portfolio/${p._id}`}>
                                    <div className="relative h-64 w-full overflow-hidden cursor-pointer">
                                        <Image
                                            src={p.images[0]?.url || "/placeholder.jpg"}
                                            alt={p.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 group-hover:opacity-40 transition duration-300" />
                                        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-10 flex flex-col justify-end">
                                            <h3 className="text-2xl font-bold text-white mb-1 drop-shadow">{p.title}</h3>
                                            <p className="text-sm text-green-200 font-semibold">{p.type}</p>
                                        </div>
                                    </div>
                                </Link>
                                <div className="p-6">
                                    <p className="text-gray-700 text-base mb-4 line-clamp-3">{p.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {p.technologies?.map((tech) => (
                                            <span key={tech} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-xs text-gray-400">{p.dateOfCompletion}</span>
                                        {p.link && (
                                            <a
                                                href={p.link.startsWith('http') ? p.link : `https://${p.link}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-600 hover:underline text-sm font-semibold"
                                            >
                                                Voir le site
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <span className="absolute top-4 right-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow font-semibold">
                                    {p.type}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-12">
                        <Link href="/portfolio" className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-full font-bold shadow-lg transition text-lg">
                            Voir tous les projets
                        </Link>
                    </div>
                </div>
            )}

            {/* Custom Project Form at the bottom */}
            <div className="mt-36">
                <CustomProjectForm />
            </div>
        </section>
    );
}
