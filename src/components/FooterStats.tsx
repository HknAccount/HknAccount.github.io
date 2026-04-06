"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Users } from "lucide-react";

export function FooterStats() {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [views, setViews] = useState(0);

    useEffect(() => {
        // -- View Counter Logic --
        const checkViews = async () => {
            try {
                const hasVisited = localStorage.getItem("has_visited_global_v1");
                if (!hasVisited) {
                    const res = await fetch("https://api.counterapi.dev/v1/harikesh-portfolio/global-views/up");
                    const data = await res.json();
                    setViews(data.count);
                    localStorage.setItem("has_visited_global_v1", "true");
                } else {
                    const res = await fetch("https://api.counterapi.dev/v1/harikesh-portfolio/global-views");
                    const data = await res.json();
                    setViews(data.count);
                }
            } catch (err) {
                console.error("Failed to fetch views", err);
            }
        };

        // -- Like Counter Logic --
        const fetchLikes = async () => {
            try {
                const res = await fetch("https://api.counterapi.dev/v1/harikesh-portfolio/global-likes");
                const data = await res.json();
                setLikes(data.count);
            } catch (err) {
                console.error("Failed to fetch likes", err);
            }
        };

        checkViews();
        fetchLikes();
        
        setIsLiked(localStorage.getItem("portfolio_user_liked_global_v1") === "true");
    }, []);

    const handleLike = async () => {
        const currentlyLiked = isLiked;
        setIsLiked(!currentlyLiked); // Optimistic UI update
        
        try {
            if (currentlyLiked) {
                setLikes(prev => Math.max(0, prev - 1));
                localStorage.setItem("portfolio_user_liked_global_v1", "false");
                await fetch("https://api.counterapi.dev/v1/harikesh-portfolio/global-likes/down");
            } else {
                setLikes(prev => prev + 1);
                localStorage.setItem("portfolio_user_liked_global_v1", "true");
                await fetch("https://api.counterapi.dev/v1/harikesh-portfolio/global-likes/up");
            }
        } catch (err) {
            console.error("Failed to update likes", err);
            // Revert optimistic update on failure
            setIsLiked(currentlyLiked);
            setLikes(prev => currentlyLiked ? prev + 1 : Math.max(0, prev - 1));
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 my-8">

            {/* Unique Views Counter */}
            <div className="flex items-center space-x-2 text-gray-500 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                <Users className="w-5 h-5" />
                <span className="font-medium">{views.toLocaleString()}</span>
                <span className="text-sm">Unique Views</span>
            </div>

            {/* Like Button */}
            <button
                onClick={handleLike}
                className="flex items-center space-x-2 bg-white px-5 py-2 rounded-full border border-gray-100 shadow-sm hover:shadow-md transition-all group"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isLiked ? "liked" : "unliked"}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                    >
                        <Heart
                            className={`w-5 h-5 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-gray-400 group-hover:text-red-400"}`}
                        />
                    </motion.div>
                </AnimatePresence>
                <span className={`font-medium ${isLiked ? "text-red-600" : "text-gray-600"}`}>
                    {likes.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">Likes</span>

                {/* Floating hearts animation on active click context might be added here for extra flair */}
            </button>

        </div>
    );
}
