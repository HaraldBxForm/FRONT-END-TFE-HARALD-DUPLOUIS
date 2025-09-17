'use client'

import { useState } from "react"
import articlesData from "../data/articles.json"
import ArticleCard from "./ArticleCard.jsx"
import { motion } from "framer-motion"

export default function ArticlesList() {
  const [sortOrder, setSortOrder] = useState("desc") // "desc" = du plus récent au plus ancien

  // Fonction pour inverser l'ordre
  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === "desc" ? "asc" : "desc"))
  }

  // Articles triés selon l'ordre
  const sortedArticles = [...articlesData].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB
  })

  return (
    <div className="flex flex-col w-full gap-6 container mx-auto pt-20">
      {/* Bouton pour changer l'ordre */}
      <div className="flex justify-end mb-0">
        <button
          onClick={toggleSortOrder}
          className="bg-white/30 text-white font-semibold py-2 px-4 rounded-xl hover:bg-white/40 transition cursor-pointer"
        >
          {sortOrder === "desc" ? "Date ↑" : "Date ↓"}
        </button>
      </div>

      {/* Liste d'articles */}
      {sortedArticles.map((article, index) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05, duration: 0.3, ease: "easeOut" }}
        >
          <ArticleCard article={article} />
        </motion.div>
      ))}
    </div>
  )
}
