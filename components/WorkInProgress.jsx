'use client';

import { motion } from "framer-motion";

export default function WorkInProgress() {
  return (
    <div className="relative w-full min-h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
      {/* Fond sombre */}
      <div className="fixed inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-[#121212] backdrop-blur-sm"></div>
      </div>

      {/* Card WIP */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-auto bg-[#1e1e1e] backdrop-blur-sm border border-white/20 rounded-2xl p-8 flex flex-col items-center justify-center text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-4">🚧 Work in Progress 🚧</h2>
        <p className="text-center text-white/70">
          This page is under construction.
        </p>
      </motion.div>
    </div>
  );
}
