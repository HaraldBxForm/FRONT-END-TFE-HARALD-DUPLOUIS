'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function AdminArticlesList() {
  // ─────────────── STATES ───────────────
  const [articlesData, setArticlesData] = useState([])
  const [categories, setCategories] = useState([])
  const [sortOrder, setSortOrder] = useState("desc")
  const [loading, setLoading] = useState(true)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [searchTerm, setSearchTerm] = useState("") // Pour l'input, contrôle séparé
  const [selectedCategory, setSelectedCategory] = useState("")

  // ─────────────── FETCH CATEGORIES ───────────────
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:8010/api/category")
      if (!res.ok) throw new Error("Failed to fetch categories")
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error(error)
    }
  }

  // ─────────────── FETCH ARTICLES ───────────────
  const fetchArticles = async () => {
    try {
      let url = "http://localhost:8010/api/article"
      if (searchTerm) {
        url = `http://localhost:8010/api/article/title?title=${encodeURIComponent(searchTerm)}`
      } else if (selectedCategory) {
        url = `http://localhost:8010/api/article/category/${selectedCategory}`
      }

      const res = await fetch(url)
      if (!res.ok) throw new Error("Failed to fetch articles")
      const data = await res.json()
      setArticlesData(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // ─────────────── EFFECTS ───────────────
  useEffect(() => {
    fetchCategories()
    fetchArticles()
  }, [])

  // Se déclenche à chaque changement de recherche ou catégorie
  useEffect(() => {
    fetchArticles()
  }, [searchTerm, selectedCategory])

  // ─────────────── HANDLERS ───────────────
  const toggleSortOrder = () =>
    setSortOrder(prev => (prev === "desc" ? "asc" : "desc"))

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8010/api/article/${id}`, {
        method: "DELETE"
      })
      if (!res.ok) throw new Error("Error deleting the article")
      setArticlesData(prev => prev.filter(a => a.id !== id))
      setConfirmDelete(null)
    } catch (error) {
      console.error(error)
      alert("Unable to delete the article")
    }
  }

  // ─────────────── TRI DES ARTICLES ───────────────
  const sortedArticles = [...articlesData].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB
  })

  if (loading)
    return <p className="text-center pt-10 text-white">Loading articles...</p>

const formatDate = (iso) => {
  try {
    const d = new Date(iso)
    const day = String(d.getDate()).padStart(2, "0")
    const month = String(d.getMonth() + 1).padStart(2, "0")
    const year = d.getFullYear()
    const hours = String(d.getHours()).padStart(2, "0")
    const minutes = String(d.getMinutes()).padStart(2, "0")
    return `${day}/${month}/${year} ${hours}:${minutes}`
  } catch {
    return iso
  }
}

  return (
    <div className="relative w-full min-h-screen bg-gray-900">
      {/* Dark overlay */}
      <div className="fixed inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-[#121212] backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 flex flex-col w-full gap-6 container mx-auto pt-20">

        {/* ─────────────── FILTRES ─────────────── */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-0">
          {/* LEFT: Search input */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search an article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#4b4b4b] text-white placeholder:text-gray-200 px-4 py-2 rounded-xl w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>

          {/* RIGHT: Category + Sort button */}
          <div className="flex flex-row gap-2 sm:gap-4 flex-nowrap justify-end w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#4b4b4b] text-white px-4 py-2 rounded-xl w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-white/40 appearance-none custom-scroll"
            >
              <option value="">All categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.title}</option>
              ))}
            </select>

            <button
              onClick={toggleSortOrder}
              className="bg-[#4b4b4b] text-white font-semibold px-4 py-2 rounded-xl hover:bg-white/40 transition whitespace-nowrap w-full sm:w-auto"
            >
              {sortOrder === "desc" ? "Date ↑" : "Date ↓"}
            </button>
          </div>
        </div>

        {/* ─────────────── LISTE DES ARTICLES ─────────────── */}
        {sortedArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.3, ease: "easeOut" }}
            className="relative p-4 bg-[#1e1e1e] backdrop-blur-sm border border-white/20 rounded-xl flex justify-between items-center gap-4"
          >
            {article.image && (
              <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg border border-white/20">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover"/>
              </div>
            )}

            <div className="flex-1">
              <h3 className="text-gray-300 text-sm">{formatDate(article.date)}</h3>
              <h2 className="text-xl font-bold text-white my-1">{article.title}</h2>
              <p className="text-gray-300 text-sm">{article.preview}</p>
            </div>

            <button
              onClick={() => setConfirmDelete(article.id)}
              className="ml-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 border border-white/30 text-white text-lg font-bold hover:bg-red-500/60 hover:border-red-400 transition cursor-pointer"
            >
              ✕
            </button>
          </motion.div>
        ))}

        {/* Confirmation popup */}
        {confirmDelete && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-[#1e1e1e] backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-6 w-full max-w-md text-center text-white"
            >
              <h3 className="text-xl font-bold mb-4">Confirmation</h3>
              <p className="mb-6">Are you sure you want to delete this article?</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => handleDelete(confirmDelete)}
                  className="px-6 py-2 rounded-xl bg-red-500/70 hover:bg-red-600/80 border border-red-400/40 text-white font-semibold transition cursor-pointer"
                >
                  Delete
                </button>
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="px-6 py-2 rounded-xl bg-white/20 hover:bg-white/40 border border-white/30 text-white font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
