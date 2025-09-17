'use client';

import Link from "next/link";
import { motion } from "motion/react";
import articles from "@/data/articles.json"; // <-- ton fichier JSON
import News from "@/app/(public)/news/page.jsx";
import NewsLetterForm from "./NewsLetterForm.jsx";

//! LIER PAR UN FETCH DE LA DB ARTICLES

export default function HomeArticle() {
  // On trie les articles par date décroissante et on prend le premier
  const latestArticle = [...articles].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )[0];

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
        transition={{ duration: 3 }}
        className="relative z-10 text-center text-white px-4 max-w-3xl"
      >
        <Link href={`/news/${latestArticle.id}`} className="text-4xl md:text-6xl font-bold">
            <h1 className="text-4xl md:text-6xl font-bold">
              {latestArticle.title}
            </h1>
        </Link>
        <Link href={`/news/${latestArticle.id}`}>
            <p className="mt-4 text-lg md:text-xl text-gray-200">
              {latestArticle.preview}
            </p>
        </Link> 
      </motion.div>
      <NewsLetterForm />
    </section>
  );
}
