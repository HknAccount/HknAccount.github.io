"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

const educationData = [
    {
        degree: "MSc International Air Transport System Engineering and Design",
        institution: "École Nationale de l'Aviation Civile (ENAC) - No. 1 Civil Aviation School in Toulouse",
        date: "Sep 2023 - Oct 2025",
        location: "Toulouse, France",
        description: "Specialized in advanced air transport system engineering, design methodologies, and system architecture."
    },
    {
        degree: "Bachelor's degree in Aerospace Engineering",
        institution: "Amrita Vishwa Vidyapeetham",
        date: "Jul 2017 - Jun 2021",
        location: "Coimbatore, India",
        description: "Core coursework in aerodynamics, structural mechanics, flight dynamics, and aerospace systems."
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
