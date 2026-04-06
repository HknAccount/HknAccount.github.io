"use client";

import { motion } from "framer-motion";

export function CategorySection({ sectionKey, title, description, items }: { sectionKey: string; title: string, description: string, items: any[] }) {
  return (
    <section id={sectionKey} className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{item.date}</p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
                >
                  View Details &rarr;
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
