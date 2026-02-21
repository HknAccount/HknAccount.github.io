"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Briefcase, Calendar } from "lucide-react";

const experienceData = [
    {
        role: "Senior Full Stack Engineer",
        company: "TechNexus Inc.",
        date: "Jan 2022 - Present",
        description: "Led a team of 4 engineers in migrating from a legacy monolith to a microservices architecture using Next.js and Node.js. Improved application performance by 40% and reduced server costs by 20%."
    },
    {
        role: "Software Developer",
        company: "Creative Digital Solutions",
        date: "Mar 2019 - Dec 2021",
        description: "Developed and maintained multiple client-facing React applications. Implemented responsive designs using Tailwind CSS and structured complex state management with Redux."
    },
    {
        role: "Junior Web Developer",
        company: "StartUp Launchpad",
        date: "Jun 2018 - Feb 2019",
        description: "Assisted in building custom WordPress themes and initial React prototypes. Collaborated closely with designers to ensure pixel-perfect implementations."
    }
];

export function Experience() {
    return (
        <Section
            id="experience"
            title="Work Experience"
            subtitle="My professional journey and career highlights."
            className="bg-gray-50/50"
        >
            <div className="relative border-l-2 border-primary-200 ml-3 md:ml-0 md:pl-0 space-y-12 max-w-4xl mx-auto">
                {experienceData.map((item, index) => (
                    <div key={index} className="relative md:pl-8">
                        {/* Timeline dot */}
                        <div className="absolute -left-[9px] md:left-[-9px] top-1.5 w-4 h-4 rounded-full bg-primary-500 ring-4 ring-primary-50" />

                        <Card delay={index * 0.15} className="ml-6 md:ml-0 group border-l-4 border-l-transparent hover:border-l-primary-500 transition-all duration-300">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold border-b-0 text-gray-900 flex items-center">
                                        <Briefcase className="w-5 h-5 mr-2 text-primary-500" />
                                        {item.role}
                                    </h3>
                                    <p className="text-lg font-medium text-primary-600 mt-1">{item.company}</p>
                                </div>
                                <div className="flex items-center text-sm font-medium text-gray-500 mt-2 md:mt-0 bg-gray-100 px-3 py-1 rounded-full w-fit">
                                    <Calendar className="w-4 h-4 mr-1.5" />
                                    {item.date}
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                {item.description}
                            </p>
                        </Card>
                    </div>
                ))}
            </div>
        </Section>
    );
}
