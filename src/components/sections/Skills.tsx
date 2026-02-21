"use client";

import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";

const skillsData = [
    { category: "Frontend", items: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion", "HTML5", "CSS3"] },
    { category: "Backend", items: ["Node.js", "Express", "Python", "Java", "Spring Boot", "GraphQL", "REST APIs"] },
    { category: "Database & Tools", items: ["PostgreSQL", "MongoDB", "Redis", "Git", "Docker", "AWS", "Vercel"] },
];

export function Skills() {
    return (
        <Section
            id="skills"
            title="Skills & Technologies"
            subtitle="A comprehensive list of tools and technologies I use to build robust applications."
            className="bg-white"
        >
            <div className="grid gap-10 md:grid-cols-3">
                {skillsData.map((skillGroup, groupIndex) => (
                    <div key={groupIndex} className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-900 border-b border-primary-100 pb-2">
                            {skillGroup.category}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {skillGroup.items.map((skill, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: "-5%" }}
                                    transition={{ duration: 0.4, delay: groupIndex * 0.1 + index * 0.05 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium border border-primary-100 shadow-sm hover:shadow-md hover:bg-primary-100 transition-colors cursor-default"
                                >
                                    {skill}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
