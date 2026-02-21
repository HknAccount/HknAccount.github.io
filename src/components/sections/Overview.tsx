"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

export function Overview() {
    return (
        <section id="overview" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center">
            {/* Background Decorative blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-50 rounded-full blur-[100px] -z-10 opacity-70" />

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

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900">
                            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Harikeshwaran</span>
                            <br />
                            <span className="text-4xl sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">PALANI</span>
                        </h1>

                        <h2 className="text-2xl sm:text-3xl font-medium text-gray-600">
                            Software & Systems Engineer.
                        </h2>

                        <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
                            Specializing in formal verification, system design, and software engineering. Experienced in mapping out robust architectural solutions and implementing reliable systems across multiple domains.
                        </p>

                        <div className="flex items-center justify-center lg:justify-start space-x-4 pt-4">
                            <a href="#projects" className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-primary-500/25 flex items-center group">
                                View My Work
                                <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
                            </a>
                            <div className="flex items-center space-x-4 ml-4">
                                <a href="https://github.com/harikeshwaran" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                                    <span className="sr-only">GitHub</span>
                                    <Github className="w-5 h-5" />
                                </a>
                                <a href="https://linkedin.com/in/harikeshwaran-palani" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#0A66C2] transition-colors bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                                    <span className="sr-only">LinkedIn</span>
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="mailto:harikeshwaran.palani@example.com" className="text-gray-400 hover:text-primary-500 transition-colors bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                                    <span className="sr-only">Email</span>
                                    <Mail className="w-5 h-5" />
                                </a>
                            </div>
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
                            <div className="absolute inset-1 bg-white rounded-3xl overflow-hidden flex items-center justify-center">
                                {/* Profile Avatar Placeholder */}
                                <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center text-gray-400">
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
