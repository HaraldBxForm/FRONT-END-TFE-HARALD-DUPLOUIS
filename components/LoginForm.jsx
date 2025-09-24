"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/auth/AuthContext.jsx";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  // Redirection si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8010/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // Met à jour le contexte et stocke le token
      login(data.token, data.user);
      setLoading(false);

      console.log("Login successful, token:", data.token);
      // La redirection sera gérée automatiquement par useEffect

    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  // Si on est en train de rediriger, on peut afficher null ou loader
  if (isAuthenticated) return null;

  return (
    <div className="relative w-full min-h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
      <div className="fixed inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-[#121212] backdrop-blur-sm"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-auto bg-[#1e1e1e] backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        {error && (
          <p className="bg-red-500/70 text-white px-4 py-2 rounded-md text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-lg border border-white/30 bg-[#2a2a2a] placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/80 text-base"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-lg border border-white/30 bg-[#2a2a2a] placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/80 text-base"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 mt-2 bg-[#2a6aa6] border border-white/20 rounded-lg font-semibold text-white text-base hover:bg-[#164477] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
