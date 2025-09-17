"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HelpButton() {
  return (
    <Link href="/about" scroll={true}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-4 right-4 w-8 h-8 flex items-center justify-center
                   rounded-full bg-white/20 backdrop-blur-md border border-white/30
                   shadow-md cursor-pointer text-white font-bold text-sm
                   hover:bg-white/30 hover:scale-105 transition z-100"
      >
        ?
      </motion.div>
    </Link>
  );
}
