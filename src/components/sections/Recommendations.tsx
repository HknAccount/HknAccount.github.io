"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { MessageSquareQuote } from "lucide-react";

const recommendationsData = [
    {
        name: "Dr. Marie Laurent",
        title: "Senior Research Scientist at CEA-Nano-Innov",
        text: "Harikeshwaran is an exceptionally talented engineer. His work on abstracting low-level C memory operations and formal verification using Why3 was outstanding. He combines deep theoretical knowledge with practical software engineering skills seamlessly.",
    },
    {
        name: "Prof. Jean Dubois",
        title: "Director of Studies at ENAC",
        text: "During his time at ENAC, Harikeshwaran consistently demonstrated a high level of analytical reasoning and dedication. His project verifying linear algebra functions in Frama-C was handled with precision and a clear focus on safety-critical applications.",
    },
    {
        name: "Aarav Sharma",
        title: "Project Manager at TCS",
        text: "Harikeshwaran was a vital asset to our Agile Scrum team. He writes clean, well-tested Java code and understands the importance of system design and architecture. I highly recommend him for any software or systems engineering role.",
    }
];

export function Recommendations() {
    return (
        <Section
            id="recommendations"
            title="Recommendations"
            subtitle="What colleagues and mentors say about my work."
            className="bg-white"
        >
            <div className="grid gap-8 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
                {recommendationsData.map((rec, index) => (
                    <Card key={index} delay={index * 0.15} className="flex flex-col h-full relative group">
                        <div className="text-primary-200 mb-4 group-hover:text-primary-400 transition-colors duration-300">
                            <MessageSquareQuote className="w-10 h-10" />
                        </div>

                        <p className="text-gray-700 italic mb-6 flex-grow leading-relaxed">
                            "{rec.text}"
                        </p>

                        <div className="mt-auto pt-4 border-t border-gray-100">
                            <h4 className="font-bold text-gray-900">{rec.name}</h4>
                            <p className="text-sm font-medium text-primary-600">{rec.title}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </Section>
    );
}
