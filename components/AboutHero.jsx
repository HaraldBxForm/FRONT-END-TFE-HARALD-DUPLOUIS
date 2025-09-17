'use client';

import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Image de fond */}
      <img
        src="/images/humpback-whales-photographed-from-with-aerial-drone-off-coast-kapalua-hawaii.jpg"
        alt="Ocean waves"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Contenu centré */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1.5 }}
        className="relative z-10 text-center text-white px-4 max-w-6xl "
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Our Mission: Protecting the Oceans, Preserving Life
        </h1>
        <p className="text-lg md:text-xl mb-6 text-white/80">
          OceanSavers is dedicated to safeguarding marine ecosystems through conservation, education, and community engagement. 
          Join us in our journey to restore coral reefs, protect marine species, and inspire global ocean stewardship.
        </p>

      </motion.div>
    </section>
  );
}
