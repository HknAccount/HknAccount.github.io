"use client";

import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Award, CheckCircle } from "lucide-react";

const certificationsData = [
    {
        title: "Microsoft Azure Fundamentals (AZ-900)",
        issuer: "Microsoft",
        date: "Obtained",
        link: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/"
    },
    {
        title: "Microsoft Azure AI Fundamentals (AI-900)",
        issuer: "Microsoft",
        date: "Obtained",
        link: "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/"
    },
    {
        title: "HackerRank SQL (Basic)",
        issuer: "HackerRank",
        date: "Obtained",
        link: "https://www.hackerrank.com/"
    },
    {
        title: "HackerRank Java (Basic)",
        issuer: "HackerRank",
        date: "Obtained",
        link: "https://www.hackerrank.com/"
    },
    {
        title: "HackerRank Python (Basic)",
        issuer: "HackerRank",
        date: "Obtained",
        link: "https://www.hackerrank.com/"
    }
];

export function Certifications() {
    return (
        <Section
            id="certifications"
            title="Certifications"
            subtitle="Professional credentials and specialized training."
            className="bg-gray-50/50"
        >
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                {certificationsData.map((cert, index) => (
                    <Card key={index} delay={index * 0.15} className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-100 transition-all duration-300">
                            <Award className="w-8 h-8 text-primary-600" />
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug">
                            {cert.title}
                        </h3>

                        <p className="text-primary-600 font-medium text-sm mb-4">
                            {cert.issuer} &bull; {cert.date}
                        </p>

                        <a
                            href={cert.link}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-auto flex items-center text-sm font-semibold text-gray-500 hover:text-primary-600 transition-colors"
                        >
                            <CheckCircle className="w-4 h-4 mr-1.5" />
                            Verify Credential
                        </a>
                    </Card>
                ))}
            </div>
        </Section>
    );
}
