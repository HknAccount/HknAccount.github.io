"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Briefcase, Calendar } from "lucide-react";

const experienceData = [
    {
        role: "End of Studies Internship",
        company: "CEA-Nano-Innov Palaiseau, France",
        date: "Mar 2025 - Sep 2025",
        description: "Designed a Why3/WhyML module to abstract low-level C memory operations, applying a bottom-up formal verification approach. Modeled and formally verified complex data structures (e.g., memcached-style tail-queued linked lists) using invariants and contracts, with correctness proven via Z3, CVC5, and Alt-Ergo."
    },
    {
        role: "Summer Intern",
        company: "ENAC Toulouse, France",
        date: "Jun 2024 - Aug 2024",
        description: "Verified basic linear algebra functions in C using Frama-C with the WP (Weakest Precondition) plugin. Applied static analysis to prove functional correctness and detect potential runtime errors."
    },
    {
        role: "Assistant Systems Engineer",
        company: "TATA CONSULTANCY SERVICES Chennai, India",
        date: "Nov 2021 - May 2023",
        description: "System Engineer in Agile Scrum team – contributed to system design (HLD/LLD), developed Java source code, implemented software components, wrote unit tests using JUnit for verification and validation, ensuring code quality and correctness."
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
