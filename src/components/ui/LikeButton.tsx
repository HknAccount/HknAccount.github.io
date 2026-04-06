"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Edit3 } from "lucide-react";
import {
  incrementRecommendations,
  subscribeToRecommendations,
  subscribeToTestimonials,
  hasUserRecommended,
} from "@/lib/firebase";
import { getOrCreateFingerprint } from "@/lib/fingerprint";
import { TestimonialForm } from "./TestimonialForm";

export function LikeButton() {
  const [likeCount, setLikeCount] = useState(0);
  const [testimonialCount, setTestimonialCount] = useState(0);
  const [hasRecommended, setHasRecommended] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [hasWritten, setHasWritten] = useState(false);

  useEffect(() => {
    const userRecommended = localStorage.getItem("hasRecommended");
    if (userRecommended === "true") {
      setHasRecommended(true);
    }
    const wroteTestimonial = localStorage.getItem("hasWrittenTestimonial");
    if (wroteTestimonial === "true") {
      setHasWritten(true);
    }

    const unsubscribeLikes = subscribeToRecommendations((count) => {
      setLikeCount(count);
    });

    const unsubscribeTestimonials = subscribeToTestimonials((testimonials) => {
      setTestimonialCount(testimonials.length);
    });

    return () => {
      unsubscribeLikes();
      unsubscribeTestimonials();
    };
  }, []);

  const handleLike = async () => {
    if (hasRecommended) {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
      return;
    }
    if (isLoading) return;

    setIsLoading(true);

    try {
      const fingerprint = getOrCreateFingerprint();
      const alreadyRecommendedInFirebase = await hasUserRecommended(fingerprint);

      if (alreadyRecommendedInFirebase) {
        setHasRecommended(true);
        localStorage.setItem("hasRecommended", "true");
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
        return;
      }

      const newCount = await incrementRecommendations(fingerprint);
      setLikeCount(newCount);
      setHasRecommended(true);
      localStorage.setItem("hasRecommended", "true");

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"],
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#3b82f6", "#8b5cf6"],
        });
      }, 200);

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#ec4899", "#f59e0b"],
        });
      }, 400);
    } catch (error: any) {
      if (error.message === "USER_ALREADY_RECOMMENDED") {
        setHasRecommended(true);
        localStorage.setItem("hasRecommended", "true");
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40 flex flex-col gap-3 md:gap-4">
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsFormOpen(true)}
        className="group relative p-3 md:p-4 rounded-full shadow-2xl transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-500/50 text-white"
      >
        <Edit3 className="w-5 h-5 md:w-8 md:h-8" />
        {!hasWritten && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-2 md:mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-md shadow-md whitespace-nowrap font-medium text-xs hidden md:block"
          >
            Write Recommendation
          </motion.div>
        )}
        {testimonialCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-white text-purple-500 rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-xs md:text-sm font-bold border-2 border-purple-500 shadow-lg"
          >
            {testimonialCount}
          </motion.div>
        )}
        {hasWritten && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block">
            <div className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow-xl whitespace-nowrap">
              <p className="font-medium">Already Written! 💖</p>
            </div>
          </div>
        )}
      </motion.button>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative"
      >
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              className="absolute bottom-full right-0 mb-4 bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-lg shadow-2xl whitespace-nowrap"
            >
              <p className="font-semibold text-sm">You already loved my profile! 💖</p>
              <p className="text-xs mt-1">Heartful thanks with love ❤️</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          disabled={isLoading}
          className={`group relative p-3 md:p-4 rounded-full shadow-2xl transition-all duration-300 ${
            hasRecommended
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-500 to-red-500 hover:shadow-pink-500/50"
          } ${isLoading ? "opacity-50 cursor-wait" : ""} text-white`}
        >
          {!hasRecommended && !isLoading && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-2 md:mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-md shadow-md whitespace-nowrap font-medium text-xs hidden md:block"
            >
              Love My Profile
            </motion.div>
          )}
          <motion.div
            animate={hasRecommended || isLoading ? {} : { scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Heart className={`w-5 h-5 md:w-8 md:h-8 ${hasRecommended ? "fill-white" : ""}`} />
          </motion.div>
          {likeCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-white text-pink-500 rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-xs md:text-sm font-bold border-2 border-pink-500 shadow-lg"
            >
              {likeCount}
            </motion.div>
          )}
        </motion.button>
      </motion.div>

      <TestimonialForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
}
