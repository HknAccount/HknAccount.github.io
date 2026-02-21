"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ExternalLink, Github } from "lucide-react";

const projectsData = [
    {
        title: "E-Commerce Platform",
        description: "A full-scale e-commerce application featuring product management, shopping cart, and secure Stripe checkout integration.",
        tech: ["Next.js", "Tailwind CSS", "Stripe", "Prisma"],
        github: "https://github.com",
        demo: "https://example.com"
    },
    {
        title: "Java HelloWorld",
        description: "A foundational Java console application demonstrating basic project structure, compilation, and execution inside a modern stack environment. Included to verify functionality.",
        tech: ["Java", "Maven", "JUnit"],
        github: "https://github.com/java-hw",
        demo: "https://example.com/java-hw"
    },
    {
        title: "Real-time Chat App",
        description: "A fast, responsive chat application using WebSockets for real-time messaging, complete with user authentication and chat rooms.",
        tech: ["React", "Express.js", "Socket.io", "MongoDB"],
        github: "https://github.com",
        demo: "https://example.com"
    },
    {
        title: "Portfolio Website V1",
        description: "The initial version of my personal portfolio built using vanilla React and custom CSS, focusing on semantic HTML.",
        tech: ["React", "CSS3", "Framer Motion", "Vite"],
        github: "https://github.com",
        demo: "https://example.com"
    }
];

export function Projects() {
    return (
        <Section
            id="projects"
            title="Featured Projects"
            subtitle="Some of my recent work and side projects."
            className="bg-white"
        >
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                {projectsData.map((project, index) => (
                    <Card key={index} delay={index * 0.15} className="flex flex-col h-full group relative overflow-hidden">
                        {/* Subtle top border highlight on hover */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />

                        <div className="flex-1 mt-2">
                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-4">
                                {project.title}
                            </h3>
                            <p className="text-gray-600 mb-6 line-clamp-3">
                                {project.description}
                            </p>

                            {/* Tech Stack Badges */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tech.map((t, idx) => (
                                    <span key={idx} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-md border border-gray-200">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 pt-4 border-t border-gray-100 mt-auto">
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
                            >
                                <Github className="w-4 h-4 mr-2" />
                                Code
                            </a>
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                            >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Live Demo
                            </a>
                        </div>
                    </Card>
                ))}
            </div>
        </Section>
    );
}
