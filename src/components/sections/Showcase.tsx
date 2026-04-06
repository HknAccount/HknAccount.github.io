"use client";

import { motion } from "framer-motion";

export function Showcase() {
  const showcaseItems = [
    {
      title: "Featured Project: AI Agent Platform",
      description: "A comprehensive platform for building and deploying autonomous AI agents. Built with Next.js, Firebase, and OpenAI.",
      image: "https://via.placeholder.com/600x400?text=AI+Agent+Platform",
      tags: ["Next.js", "Firebase", "AI"],
      link: "#"
    },
    {
      title: "UI Framework",
      description: "A custom UI framework designed for high-performance React applications.",
      image: "https://via.placeholder.com/600x400?text=UI+Framework",
      tags: ["React", "CSS", "Design"],
      link: "#"
    }
  ];

  return (
    <section id="showcase" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 mb-4">
            Showcase
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Some of my best side projects and featured work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl group border border-gray-100 dark:border-gray-800"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <div className="flex gap-2 mb-4">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{item.description}</p>
                <a 
                  href={item.link} 
                  className="inline-flex items-center justify-center px-6 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-white transition-colors"
                >
                  View Project
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
