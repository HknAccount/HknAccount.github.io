"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function TypewriterText({
  texts,
  loop = true,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: {
  texts: string[];
  loop?: boolean;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    let timeout: NodeJS.Timeout;

    const tick = () => {
      const fullText = texts[currentTextIndex];

      if (isDeleting) {
        setCurrentText((prev) => prev.substring(0, prev.length - 1));
      } else {
        setCurrentText((prev) => fullText.substring(0, prev.length + 1));
      }

      let delta = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && currentText === fullText) {
        if (!loop && currentTextIndex === texts.length - 1) {
          return; // Stop completely
        }
        delta = pauseDuration;
        setIsDeleting(true);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        delta = typingSpeed;
      }

      timeout = setTimeout(tick, delta);
    };

    timeout = setTimeout(tick, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts, loop, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className="inline-block">
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block ml-1 bg-current w-[2px] h-[1em] mb-[-0.1em] align-baseline"
      />
    </span>
  );
}
