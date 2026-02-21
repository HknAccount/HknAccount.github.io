"use client";

import { useState, useEffect } from "react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { MessageSquareQuote, Plus, Send } from "lucide-react";

interface Recommendation {
    name: string;
    organization: string;
    text: string;
    date: string;
}

export function Recommendations() {
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", organization: "", text: "" });

    // Load from local storage on mount
    useEffect(() => {
        const stored = localStorage.getItem("portfolio_recommendations");
        if (stored) {
            setRecommendations(JSON.parse(stored));
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.organization || !formData.text) return;

        const newRec: Recommendation = {
            ...formData,
            date: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
        };

        const updated = [newRec, ...recommendations];
        setRecommendations(updated);
        localStorage.setItem("portfolio_recommendations", JSON.stringify(updated));
        setFormData({ name: "", organization: "", text: "" });
        setIsFormOpen(false);
    };

    return (
        <Section
            id="recommendations"
            title="Recommendations"
            subtitle="Feedback and thoughts from colleagues and peers."
            className="bg-white"
        >
            <div className="max-w-6xl mx-auto flex flex-col items-center mb-10">
                {!isFormOpen ? (
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full font-medium transition-colors shadow-md group"
                    >
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                        <span>Write a Recommendation</span>
                    </button>
                ) : (
                    <Card className="w-full max-w-2xl p-6 border-t-4 border-t-primary-500 shadow-xl">
                        <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                            <MessageSquareQuote className="mr-2 text-primary-500" />
                            Leave a Recommendation
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.organization}
                                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
                                        placeholder="Tech Company / University"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Recommendation</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.text}
                                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all resize-none"
                                    placeholder="Harikeshwaran is an excellent engineer..."
                                />
                            </div>
                            <div className="flex justify-end space-x-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors font-medium flex items-center"
                                >
                                    <Send className="w-4 h-4 mr-2" />
                                    Submit
                                </button>
                            </div>
                        </form>
                    </Card>
                )}
            </div>

            {recommendations.length > 0 ? (
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                    {recommendations.map((rec, index) => (
                        <Card key={index} delay={index * 0.1} className="flex flex-col h-full relative group shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-primary-200 mb-4 group-hover:text-primary-400 transition-colors duration-300">
                                <MessageSquareQuote className="w-8 h-8" />
                            </div>

                            <p className="text-gray-700 italic mb-6 flex-grow leading-relaxed text-sm">
                                "{rec.text}"
                            </p>

                            <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-end">
                                <div>
                                    <h4 className="font-bold text-gray-900 leading-tight">{rec.name}</h4>
                                    <p className="text-xs font-medium text-primary-600 mt-1">{rec.organization}</p>
                                </div>
                                <span className="text-xs text-gray-400 font-medium">{rec.date}</span>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-400 py-12 max-w-md mx-auto">
                    <MessageSquareQuote className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p className="font-medium text-lg">No recommendations yet.</p>
                    <p className="text-sm mt-2">Click the button above to be the first to leave a recommendation!</p>
                </div>
            )}
        </Section>
    );
}
