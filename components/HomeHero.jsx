'use client';

import Link from "next/link";
import { motion } from "motion/react";
export default function HomeHero() {
  return (
    <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Vidéo de fond */}
      <video
        src="/videos/home-hero-video.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Contenu centré */}
      <motion.div initial={{opacity :0, y :20}} animate={{opacity : 1,y : 0}} transition={{duration : 3}} className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold">Protecting the Oceans, Preserving Life.</h1>
        <Link href="/about" className="text-xl md:text-2xl my-3 inline-block">Explore the work of OceanSavers</Link>
      </motion.div>
    </section>
  );
}
