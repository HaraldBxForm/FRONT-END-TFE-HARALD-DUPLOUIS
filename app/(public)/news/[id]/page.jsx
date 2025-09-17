'use client'

// app/(public)/news/[id]/page.jsx
import articles from "@/data/articles.json";
import Link from "next/link";
import { motion } from "framer-motion";
import { notFound, useParams } from "next/navigation.js";

export default function ArticlePage() {
  const { id } = useParams();
  const article = articles.find((a) => a.id.toString() === id.toString());

  (!article) && notFound()

  // Formater la date en anglais
  const date = new Date(article.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="w-full min-h-screen flex flex-col relative bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/medias-remixes-esthetiques-de-fond-de-nature-etoilee-de-l-ocean.jpg')",
      }}
    >
      {/* Overlay flou */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md"></div>

      {/* Contenu principal */}
      <div className="relative z-10 w-full flex flex-col">
        {/* Header image + titre */}
        <div className="relative w-full h-[50vh] overflow-hidden flex items-end justify-center">
          <img
            src={article.image}
            alt={article.title}
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <h1 className="relative text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg text-center p-4">
            {article.title}
          </h1>
        </div>

        {/* Texte complet */}
        <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="px-4 py-12 max-w-4xl mx-auto text-gray-100">
          <h2 className="text-2xl py-2 font-bold">{article.preview}</h2>
          <p className="mb-6 leading-relaxed text-white/80 text-justify">{article.text}</p>

          {/* Footer avec bouton et infos */}
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
            <Link
              href="/news"
              className="bg-white/10 backdrop-blur-md text-white font-medium py-2 px-6 rounded-full hover:bg-white/20 transition"
            >
              Back to News
            </Link>
            <div className="text-right text-white/70 text-sm">
              <p>{article.author}</p>
              <p>{formattedDate}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
