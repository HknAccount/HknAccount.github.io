"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { submitTestimonial } from "@/lib/firebase";

export function TestimonialForm({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    linkedIn: "",
    text: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await submitTestimonial(formData);
      localStorage.setItem("hasWrittenTestimonial", "true");
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({ name: "", role: "", linkedIn: "", text: "" });
      }, 3000);
    } catch (err) {
      setError("Failed to submit testimonial. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8">
            <h2 className="text-2xl font-bold mb-2">Write a Recommendation</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
              Your words mean a lot! Recommendations will be reviewed before appearing on the site.
            </p>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your recommendation has been submitted and is pending approval.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Role / Company *
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Senior Engineer at Tech Co"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn Profile (Optional)
                  </label>
                  <input
                    type="url"
                    name="linkedIn"
                    value={formData.linkedIn}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="https://linkedin.com/in/johndoe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recommendation *
                  </label>
                  <textarea
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    placeholder="Write your recommendation here..."
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Recommendation"}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
