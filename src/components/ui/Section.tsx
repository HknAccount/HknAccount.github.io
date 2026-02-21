"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
    id: string;
    title: string;
    subtitle?: string;
    children: ReactNode;
    className?: string;
}

export function Section({ id, title, subtitle, children, className }: SectionProps) {
    return (
        <section
            id={id}
            className={cn("py-20 md:py-28 flex flex-col items-center", className)}
        >
            <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-4 inline-block relative border-b-4 border-primary-500 pb-2">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                            {subtitle}
                        </p>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-5%" }}
                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                >
                    {children}
                </motion.div>
            </div>
        </section>
    );
}
