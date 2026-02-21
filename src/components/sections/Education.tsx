"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

const educationData = [
    {
        degree: "Master of Science in Computer Science",
        institution: "Stanford University",
        date: "2019 - 2021",
        location: "Stanford, CA",
        description: "Specialized in Artificial Intelligence and Human-Computer Interaction. Graduated with Honors."
    },
    {
        degree: "Bachelor of Science in Software Engineering",
        institution: "University of California, Berkeley",
        date: "2015 - 2019",
        location: "Berkeley, CA",
        description: "Core coursework in Data Structures, Algorithms, Web Development, and Database Systems."
    }
];

export function Education() {
    return (
        <Section
            id="education"
            title="Education"
            subtitle="My academic background and qualifications."
            className="bg-gray-50/50"
        >
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                {educationData.map((item, index) => (
                    <Card key={index} delay={index * 0.1} className="relative overflow-hidden group">
                        {/* Soft decorative accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110 duration-500" />

                        <div className="flex items-start space-x-4">
                            <div className="bg-primary-100 p-3 rounded-2xl text-primary-600">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                                    {item.degree}
                                </h3>
                                <p className="text-lg font-medium text-gray-700 mt-1">{item.institution}</p>

                                <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500 mb-4">
                                    <span className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1.5" />
                                        {item.date}
                                    </span>
                                    <span className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-1.5" />
                                        {item.location}
                                    </span>
                                </div>

                                <p className="text-gray-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </Section>
    );
}
