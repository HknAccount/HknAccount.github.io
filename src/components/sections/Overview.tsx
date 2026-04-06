"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Users, Heart, Edit3 } from "lucide-react";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import {
  subscribeToRecommendations,
  subscribeToVisitors,
  subscribeToTestimonials,
  incrementVisitors,
  incrementRecommendations,
} from "@/lib/firebase";
import { getOrCreateFingerprint } from "@/lib/fingerprint";
import confetti from "canvas-confetti";

export function Overview() {
    const [recommendationCount, setRecommendationCount] = useState(0);
    const [visitorCount, setVisitorCount] = useState(0);
    const [testimonialCount, setTestimonialCount] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const resViews = await fetch("https://api.counterapi.dev/v1/harikesh-portfolio/global-views");
                const dataViews = await resViews.json();
                setVisitorCount(dataViews.count);

                const resLikes = await fetch("https://api.counterapi.dev/v1/harikesh-portfolio/global-likes");
                const dataLikes = await resLikes.json();
                setRecommendationCount(dataLikes.count);
            } catch (err) {
                console.error("Failed to fetch stats", err);
            }
        };
        fetchStats();
    }, []);

    const handleLike = async () => {
        try {
            setRecommendationCount(prev => prev + 1);
            await fetch("https://api.counterapi.dev/v1/harikesh-portfolio/global-likes/up");
            
            // Trigger confetti
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ef4444', '#ec4899', '#8b5cf6']
            });
        } catch (error) {
            console.error("Error updating likes", error);
        }
    };

    return (
        <section id="overview" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center">
            {/* Background Decorative blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-50 rounded-full blur-[100px] -z-10 opacity-70" />

            {/* Floating Testimonial Carousel - Hidden on small screens, shown left bottom */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="hidden xl:block absolute left-8 top-1/2 -translate-y-1/2 w-80 max-h-[60vh] overflow-y-auto"
            >
                <TestimonialCarousel />
            </motion.div>

            <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col space-y-6 text-center lg:text-left"
                    >
                        <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full w-fit mx-auto lg:mx-0 border border-primary-100">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
                            </span>
                            <span className="text-sm font-medium">Available for new opportunities</span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Harikeshwaran</span>
                            <br />
                            <span className="text-4xl sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">PALANI</span>
                        </h1>

                        <h2 className="text-2xl sm:text-3xl font-medium text-gray-600 dark:text-gray-300 min-h-[3rem]">
                            <TypewriterText 
                                texts={[
                                    "Software & Systems Engineer.",
                                    "Specializing in Formal Verification.",
                                ]} 
                                typingSpeed={50}
                                deletingSpeed={30}
                            />
                        </h2>

                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
                            Specializing in formal verification, system design, and software engineering. Experienced in mapping out robust architectural solutions and implementing reliable systems across multiple domains.
                        </p>

                        {/* Firebase Stat Badges */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 py-2">
                            <div className="group relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-lg cursor-help text-sm font-medium">
                                <Users className="w-4 h-4" />
                                <span>{visitorCount.toLocaleString()} Visitors</span>
                            </div>
                            <button 
                                onClick={handleLike}
                                className="group relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full shadow-lg cursor-pointer transform hover:scale-105 hover:shadow-xl hover:shadow-pink-500/20 active:scale-95 transition-all text-sm font-medium"
                            >
                                <Heart className="w-4 h-4 fill-white group-hover:animate-ping absolute inset-0 m-auto opacity-0 group-hover:opacity-30" />
                                <Heart className="w-4 h-4 fill-white relative z-10" />
                                <span className="relative z-10">{recommendationCount} Loves</span>
                            </button>
                            <div className="group relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg cursor-help text-sm font-medium">
                                <Edit3 className="w-4 h-4" />
                                <span>{testimonialCount} Recommendations</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-center lg:justify-start space-x-4 pt-2">
                            <a href="#projects" className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-primary-500/25 flex items-center group">
                                View My Work
                                <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
                            </a>
                            <div className="flex items-center space-x-4 ml-4">
                                <a href="https://github.com/harikeshwaran" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                                    <span className="sr-only">GitHub</span>
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href="https://linkedin.com/in/harikeshwaran-palani" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#0A66C2] transition-colors bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                                    <span className="sr-only">LinkedIn</span>
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="mailto:harikeshwaran.palani@gmail.com" className="text-gray-400 hover:text-primary-500 transition-colors bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                                    <span className="sr-only">Email</span>
                                    <Mail className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        {/* Mobile Testimonial Carousel */}
                        <div className="xl:hidden mt-8 max-w-md mx-auto w-full pb-4">
                            <TestimonialCarousel />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="flex justify-center lg:justify-end"
                    >
                        <div className="relative w-72 h-72 md:w-96 md:h-96">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 to-primary-300 rounded-3xl rotate-6 opacity-20 blur-xl" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 to-primary-300 rounded-3xl -rotate-3 transition-transform hover:rotate-0 duration-500" />
                            <div className="absolute inset-1 bg-white dark:bg-gray-800 rounded-3xl overflow-hidden flex items-center justify-center">
                                {/* Profile Avatar Placeholder */}
                                <div className="w-full h-full bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center text-gray-400">
                                    <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    <span className="mt-4 text-sm font-medium">Profile Image Placeholder</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
