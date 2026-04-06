"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import { subscribeToTestimonials } from "@/lib/firebase";

export function TestimonialCarousel() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = subscribeToTestimonials((t) => {
      setTestimonials(t);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000); // 8 seconds per testimonial
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <div className="relative w-full overflow-hidden bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
      <Quote className="absolute top-4 right-4 w-12 h-12 text-gray-200 dark:text-gray-700 opacity-50" />
      
      <div className="min-h-[160px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-700 dark:text-gray-300 italic mb-4 line-clamp-4 leading-relaxed">
              "{current.text}"
            </p>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {current.name}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{current.role}</span>
                {current.linkedIn && (
                  <>
                    <span>•</span>
                    <a
                      href={current.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-500 hover:underline"
                    >
                      LinkedIn
                    </a>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "bg-primary-500 w-6"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
