"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Briefcase, MessageSquare, Send, CheckCircle, XCircle } from "lucide-react";
import { submitContactMessage } from "@/lib/firebase";

export function Contact() {
  const [formData, setFormData] = useState({
    email: "",
    role: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Reset status on typing again if it was error or success
    if (status !== "idle" && status !== "loading") setStatus("idle");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await submitContactMessage(formData);
      setStatus("success");
      setFormData({ email: "", role: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400 mb-4">
            Want to Hire Me?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Fill out the form below and I'll send you a tailored resume for your role.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Mail className="w-4 h-4" />
                Your Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                placeholder="your.email@company.com"
                disabled={status === "loading"}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Briefcase className="w-4 h-4" />
                Role / Position
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                placeholder="e.g., Senior Systems Engineer"
                disabled={status === "loading"}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MessageSquare className="w-4 h-4" />
                Job Description / Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 focus:outline-none resize-none"
                placeholder="Brief description of the role, company, or any specific requirements..."
                disabled={status === "loading"}
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="w-full flex items-center justify-center gap-2 py-4 bg-primary-600 hover:bg-primary-700 disabled:opacity-70 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors shadow-lg shadow-primary-500/25"
            >
              {status === "loading" ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Sending...
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Message Sent
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Request
                </>
              )}
            </button>
            
            {status === "error" && (
                <p className="text-center text-sm font-medium text-red-500 flex items-center justify-center gap-2 mt-4 bg-red-50 py-2 rounded-lg">
                  <XCircle className="w-4 h-4" /> Failed to send message. Please try again.
                </p>
            )}
            {status !== "error" && (
                <p className="text-center text-sm text-gray-500 mt-4">
                  Messages are sent directly to my database and I will be notified.
                </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
