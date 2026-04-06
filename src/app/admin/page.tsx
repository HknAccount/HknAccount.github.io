"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Check, X, LogOut, Eye, Linkedin, Edit2, Save, Mail } from "lucide-react";
import { ref, onValue, update } from "firebase/database";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { database, auth } from "@/lib/firebase";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setAuthLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuthenticated || !database) return;

    const testimonialsRef = ref(database, "testimonials");
    const unsubscribe = onValue(testimonialsRef, (snapshot) => {
      const data: any[] = [];
      snapshot.forEach((childSnapshot) => {
        data.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      data.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      setTestimonials(data);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!auth) {
      setError("Firebase Authentication not initialized");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
    } catch (error: any) {
      setError(`Login failed. Please check credentials. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleApprove = async (testimonialId: string) => {
    if (!database) return;
    setLoading(true);
    try {
      const testimonialRef = ref(database, `testimonials/${testimonialId}`);
      await update(testimonialRef, { approved: true });
    } catch (error) {
      alert("Failed to approve testimonial");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (testimonialId: string) => {
    if (!database) return;
    setLoading(true);
    try {
      const testimonialRef = ref(database, `testimonials/${testimonialId}`);
      await update(testimonialRef, { approved: false });
    } catch (error) {
      alert("Failed to reject testimonial");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (testimonial: any) => {
    setEditingId(testimonial.id);
    setEditForm({
      name: testimonial.name || "",
      role: testimonial.role || "",
      linkedIn: testimonial.linkedIn || "",
      text: testimonial.text || "",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSaveEdit = async (testimonialId: string) => {
    if (!database) return;
    setLoading(true);
    try {
      const testimonialRef = ref(database, `testimonials/${testimonialId}`);
      await update(testimonialRef, editForm);
      setEditingId(null);
      setEditForm({});
    } catch (error) {
      alert("Failed to update testimonial");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    if (!timestamp) return "Unknown date";
    return new Date(timestamp).toLocaleString();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-blue-500/20 rounded-full">
              <Lock className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white text-center mb-2">Admin Panel</h1>
          <p className="text-sm text-gray-400 text-center mb-6">Sign in with your Firebase administration account</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <Mail className="w-4 h-4 mr-2" />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <Lock className="w-4 h-4 mr-2" />
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
                disabled={loading}
              />
            </div>
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold rounded-lg flex items-center justify-center"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Testimonial Management</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-1">Total</p>
            <p className="text-3xl font-bold text-white">{testimonials.length}</p>
          </div>
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-6">
            <p className="text-green-400 text-sm mb-1">Approved</p>
            <p className="text-3xl font-bold text-green-400">
              {testimonials.filter((t: any) => t.approved === true).length}
            </p>
          </div>
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-6">
            <p className="text-yellow-400 text-sm mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-400">
              {testimonials.filter((t: any) => t.approved !== true).length}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {testimonials.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <Eye className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No testimonials yet</p>
            </div>
          ) : (
            testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-gray-800 rounded-lg p-6 border-l-4 ${
                  testimonial.approved === true ? "border-green-500" : "border-yellow-500"
                }`}
              >
                {editingId === testimonial.id ? (
                  <div className="space-y-4">
                     <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                      <input
                        type="text"
                        value={editForm.role}
                        onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
                      <input
                        type="url"
                        value={editForm.linkedIn}
                        onChange={(e) => setEditForm({ ...editForm, linkedIn: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Testimonial</label>
                      <textarea
                        value={editForm.text}
                        onChange={(e) => setEditForm({ ...editForm, text: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white resize-none"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleSaveEdit(testimonial.id)}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                      >
                        <Save className="w-4 h-4" /> Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
                      >
                        <X className="w-4 h-4" /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{testimonial.name}</h3>
                          {testimonial.linkedIn && (
                            <a
                              href={testimonial.linkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <Linkedin className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm mb-2">{testimonial.role}</p>
                        <p className="text-xs text-gray-500">{formatDate(testimonial.timestamp)}</p>
                      </div>
                      <div>
                        {testimonial.approved === true ? (
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
                            Approved
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-medium rounded-full">
                            Pending
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4 mb-4">
                      <p className="text-gray-300 text-sm">"{testimonial.text}"</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(testimonial)}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                      >
                        <Edit2 className="w-4 h-4" /> Edit
                      </button>
                      {testimonial.approved !== true && (
                        <button
                          onClick={() => handleApprove(testimonial.id)}
                          disabled={loading}
                          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                        >
                          <Check className="w-4 h-4" /> Approve
                        </button>
                      )}
                      {testimonial.approved === true && (
                        <button
                          onClick={() => handleReject(testimonial.id)}
                          disabled={loading}
                          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                        >
                          <X className="w-4 h-4" /> Reject
                        </button>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
