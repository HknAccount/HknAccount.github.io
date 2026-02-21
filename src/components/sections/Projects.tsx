"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ExternalLink, Github } from "lucide-react";

// Placeholder data - replace with your actual projects!
const professionalProjects = [
    {
        title: "Aircraft Performance Optimization Model",
        description: "Professional project optimizing fuel burn and flight physics for A320-class aircraft. Implemented surrogate models for performance prediction.",
        tech: ["Python", "SciPy", "Machine Learning"],
        github: "https://github.com/harikeshwaran",
        demo: "#"
    },
    {
        title: "Microservices Banking Backend",
        description: "Enterprise SafeBank System architecture featuring API gateway, discovery server, and complete containerization under Agile methodology.",
        tech: ["Java", "Spring Boot", "Docker", "Kubernetes"],
        github: "https://github.com/harikeshwaran",
        demo: "#"
    }
];

const personalProjects = [
    {
        title: "Mini Ada Front-End Compiler",
        description: "A functionality-correct front-end compiler for an Ada 2012 subset using a custom Recursive Descent Parser in OCaml.",
        tech: ["OCaml", "Lexical Analysis", "AST Generation"],
        github: "https://github.com/harikeshwaran",
        demo: "#"
    },
    {
        title: "Study Group Connector",
        description: "A full-stack web application connecting students for collaborative study sessions with real-time chat.",
        tech: ["React", "Node.js", "PostgreSQL", "Socket.io"],
        github: "https://github.com/harikeshwaran",
        demo: "#"
    }
];

// Helper component for project cards to avoid code duplication
const ProjectGrid = ({ projects }: { projects: typeof professionalProjects }) => (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-12">
        {projects.map((project, index) => (
            <Card key={index} delay={index * 0.15} className="flex flex-col h-full group relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                <div className="flex-1 mt-2">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-4">
                        {project.title}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech.map((t, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-md border border-gray-200">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex items-center space-x-4 pt-4 border-t border-gray-100 mt-auto">
                    <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                        <Github className="w-4 h-4 mr-2" /> Code
                    </a>
                    <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
                        <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                    </a>
                </div>
            </Card>
        ))}
    </div>
);

export function Projects() {
    return (
        <Section
            id="projects"
            title="Projects Portfolio"
            subtitle="A showcase of my recent academic, personal, and professional work."
            className="bg-white"
        >
            <div className="max-w-6xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-primary-100 pb-2 inline-block mb-8">Professional Projects</h3>
                <ProjectGrid projects={professionalProjects} />

                <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-primary-100 pb-2 inline-block mb-8">Personal Projects</h3>
                <ProjectGrid projects={personalProjects} />
            </div>
        </Section>
    );
}
