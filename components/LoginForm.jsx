'use client';

import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
      {/* Fond sombre */}
      <div className="fixed inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-[#121212] backdrop-blur-sm"></div>
      </div>

      {/* Card de login */}
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
            className="w-full px-4 py-2 mt-2 bg-[#2a6aa6] border border-white/20 rounded-lg font-semibold text-white text-base hover:bg-[#164477] transition"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
}
