'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import NewsLetterForm from "./NewsLetterForm.jsx";

export default function HomeArticle() {
  const [latestArticle, setLatestArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestArticle = async () => {
      try {
        const response = await fetch("http://localhost:8010/api/article");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

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

  // Prendre les 100 premiers caractères du champ "text"
  const excerpt = latestArticle.text.slice(0, 500) + (latestArticle.text.length > 500 ? "…" : "");

  return (
    <section
      className="relative w-full flex flex-col md:flex-row overflow-hidden"
      style={{
        backgroundImage: "url('/images/medias-remixes-esthetiques-de-fond-de-nature-etoilee-de-l-ocean.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay sombre avec flou */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Texte */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 w-full md:flex-1 flex items-center justify-center text-white py-12 md:py-0 order-1"
      >
        <div className="px-6 md:px-12 lg:px-20 max-w-2xl text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{latestArticle.title}</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-2 line-clamp-7 ">
            {excerpt}
          </p>
          <Link href={`/news/${latestArticle.id}`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-6 py-3 rounded-full 
                         backdrop-blur-md bg-white/10 
                         border border-white/20 
                         text-white text-lg font-medium 
                         cursor-pointer
                         transition-all duration-300 hover:border-white/40"
            >
              Read More 
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Image de l'article */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="relative z-10 w-full md:flex-1 h-64 md:h-screen order-2"
      >
        <img
          src={latestArticle.image}
          alt={latestArticle.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Newsletter Form */}
      <NewsLetterForm />
    </section>
  );
}
