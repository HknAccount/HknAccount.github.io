"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Users } from "lucide-react";

export function FooterStats() {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [views, setViews] = useState(0);

    useEffect(() => {
        // Simulate fetching views and likes from a backend
        // For this demonstration, we use localStorage to persist fake counters

        // -- View Counter Logic --
        const storedViews = localStorage.getItem("portfolio_views_v2");
        const hasVisited = sessionStorage.getItem("has_visited_portfolio_v2");

        let currentViews = storedViews ? parseInt(storedViews, 10) : 0; // Starts at 0

        if (!hasVisited) {
            currentViews += 1;
            localStorage.setItem("portfolio_views_v2", currentViews.toString());
            sessionStorage.setItem("has_visited_portfolio_v2", "true");
        }
        setViews(currentViews);

        // -- Like Counter Logic --
        const storedLikes = localStorage.getItem("portfolio_likes_count_v2");
        const userLiked = localStorage.getItem("portfolio_user_liked_v2") === "true";

        setLikes(storedLikes ? parseInt(storedLikes, 10) : 0);
        setIsLiked(userLiked);
    }, []);

    const handleLike = () => {
        let newLikes = likes;
        if (isLiked) {
            newLikes -= 1;
            setIsLiked(false);
            localStorage.setItem("portfolio_user_liked_v2", "false");
        } else {
            newLikes += 1;
            setIsLiked(true);
            localStorage.setItem("portfolio_user_liked_v2", "true");
        }
        setLikes(newLikes);
        localStorage.setItem("portfolio_likes_count_v2", newLikes.toString());
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
