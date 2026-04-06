"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ExternalLink, Github, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

interface ProjectItem {
    title: string;
    description: string;
    tech: string[];
    github: string;
    demo: string;
}

// Extracted ProjectCard component for tracking individual likes state
const ProjectCardComponent = ({ project, index }: { project: ProjectItem, index: number }) => {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    
    // Create a safe key name for the API & localStorage
    const projectKey = project.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const localKey = `portfolio_liked_${projectKey}`;

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const res = await fetch(`https://api.counterapi.dev/v1/harikesh-portfolio/project-${projectKey}`);
                const data = await res.json();
                setLikes(data.count || 0);
            } catch (err) {
                console.error("Failed to fetch project likes", err);
            }
        };
        fetchLikes();
        setIsLiked(localStorage.getItem(localKey) === "true");
    }, [projectKey, localKey]);

    const handleLike = async () => {
        const currentlyLiked = isLiked;
        setIsLiked(!currentlyLiked);
        
        try {
            if (currentlyLiked) {
                setLikes(prev => Math.max(0, prev - 1));
                localStorage.setItem(localKey, "false");
                await fetch(`https://api.counterapi.dev/v1/harikesh-portfolio/project-${projectKey}/down`);
            } else {
                setLikes(prev => prev + 1);
                localStorage.setItem(localKey, "true");
                await fetch(`https://api.counterapi.dev/v1/harikesh-portfolio/project-${projectKey}/up`);
            }
        } catch (err) {
            console.error("Failed to update project likes", err);
            setIsLiked(currentlyLiked);
            setLikes(prev => currentlyLiked ? prev + 1 : Math.max(0, prev - 1));
        }
    };

    return (
        <Card delay={index * 0.15} className="flex flex-col h-full group relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            <div className="flex-1 mt-2">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-4">
                    {project.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3">
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t: string, idx: number) => (
                        <span key={idx} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-md border border-gray-200">
                            {t}
                        </span>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                <div className="flex items-center space-x-4">
                    <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                        <Github className="w-4 h-4 mr-2" /> Code
                    </a>
                    <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
                        <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                    </a>
                </div>
                
                {/* Project Like Button */}
                <button
                    onClick={handleLike}
                    className="flex items-center space-x-1.5 text-sm font-medium transition-colors group/like"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isLiked ? "liked" : "unliked"}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            transition={{ duration: 0.15 }}
                        >
                            <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-400 group-hover/like:text-red-400"}`} />
                        </motion.div>
                    </AnimatePresence>
                    <span className={isLiked ? "text-red-600" : "text-gray-500"}>{likes.toLocaleString()}</span>
                </button>
            </div>
        </Card>
    );
};

// Helper component for project cards to avoid code duplication
const ProjectGrid = ({ projects }: { projects: ProjectItem[] }) => (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mb-12">
        {projects.map((project, index) => (
            <ProjectCardComponent key={index} project={project} index={index} />
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
                <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-primary-100 pb-2 inline-block mb-8">Academic Group Projects</h3>
                <ProjectGrid projects={professionalProjects} />

                <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-primary-100 pb-2 inline-block mb-8">Personal Group Projects</h3>
                <ProjectGrid projects={personalProjects} />
            </div>
        </Section>
    );
}
