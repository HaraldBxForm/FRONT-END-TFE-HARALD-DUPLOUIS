'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import NewsLetterForm from "./NewsLetterForm.jsx";

export default function HomeArticle() {
  const [latestArticle, setLatestArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch depuis l'API
  useEffect(() => {
    const fetchLatestArticle = async () => {
      try {
        const response = await fetch("http://localhost:8010/api/article");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        // Trier par date décroissante et prendre le premier
        const latest = data.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        setLatestArticle(latest);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'article :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestArticle();
  }, []);

  if (loading) return <p className="text-center pt-10 text-white">Chargement...</p>;
  if (!latestArticle) return <p className="text-center pt-10 text-white">Aucun article disponible.</p>;

  return (
    <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Image de fond */}
      <img
        src={latestArticle.image}
        alt={latestArticle.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Contenu centré */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="relative z-10 text-center text-white px-4 max-w-3xl"
      >
        <Link href={`/news/${latestArticle.id}`} className="block">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
            {latestArticle.title}
          </h1>
        </Link>

        {/* Bouton glass effect */}
        <Link href={`/news/${latestArticle.id}`}>
          <motion.button
            whileHover={{ scale: 1.01, }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-6 py-2 rounded-full 
                       backdrop-blur-md bg-white/10 
                       border border-white/20 
                       text-white text-lg md:text-xl font-medium 
                        cursor-pointer
                       transition-all duration-300 hover:border-white/40"
          >
            Latest Article
          </motion.button>
        </Link>
      </motion.div>

      <NewsLetterForm />
    </section>
  );
}
