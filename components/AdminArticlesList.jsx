'use client'

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion";
import { useAuth } from "../app/auth/AuthContext.jsx";

// ✅ Composant modal générique (sans header imposé)
function Modal({ children, onClose, size = "max-w-md" }) {
  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`relative bg-[#1e1e1e] backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-6 w-full ${size} text-white overflow-y-auto max-h-[80vh] mx-4 cursor-default custom-scroll`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </div>
  )
}

// ✅ Bouton d’action
function ActionButton({ icon, onClick, title, hover }) {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 flex items-center justify-center rounded-full bg-white/20 border border-white/30 text-white text-lg font-bold transition cursor-pointer ${hover}`}
      title={title}
    >
      {icon}
    </button>
  )
}

// ✅ Fonction utilitaire pour formater les dates
const formatDate = (iso) => {
  try {
    const d = new Date(iso)
    return d.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return iso
  }
}

export default function AdminArticlesList() {
  const [articlesData, setArticlesData] = useState([])
  const [categories, setCategories] = useState([])
  const [sortOrder, setSortOrder] = useState("desc")
  const [loading, setLoading] = useState(true)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [editArticle, setEditArticle] = useState(null)
  const [previewArticle, setPreviewArticle] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [updateMessage, setUpdateMessage] = useState("")
  const { token } = useAuth();

  console.log(token)

  // ✅ Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8010/api/category")
      if (!res.ok) throw new Error("Failed to fetch categories")
      setCategories(await res.json())
    } catch (error) {
      console.error(error)
    }
  }, [])

  // ✅ Fetch articles
  const fetchArticles = useCallback(async () => {
    try {
      let url = "http://localhost:8010/api/article"
      if (searchTerm) url += `/title?title=${encodeURIComponent(searchTerm)}`
      else if (selectedCategory) url += `/category/${selectedCategory}`

      const res = await fetch(url)
      if (!res.ok) throw new Error("Failed to fetch articles")
      setArticlesData(await res.json())
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [searchTerm, selectedCategory])

  useEffect(() => {
    fetchCategories()
    fetchArticles()
  }, [fetchCategories, fetchArticles])

  const toggleSortOrder = () =>
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8010/api/article/${id}`, { method: "DELETE", headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  } })
      if (!res.ok) throw new Error("Error deleting the article")
      setArticlesData((prev) => prev.filter((a) => a.id !== id))
      setConfirmDelete(null)
    } catch (error) {
      console.error(error)
      alert("Unable to delete the article")
    }
  }

  const handleEditChange = (field, value) =>
    setEditArticle((prev) => ({ ...prev, [field]: value }))

  const handleEditSubmit = async () => {
    if (!editArticle?.id) return
    try {
      const res = await fetch(`http://localhost:8010/api/article/${editArticle.id}`, {
        method: "PUT",
        headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
        body: JSON.stringify(editArticle),
      })
      if (!res.ok) throw new Error("Error updating article")
      const updated = await res.json()
      setArticlesData((prev) => prev.map((a) => (a.id === updated.id ? updated : a)))
      setEditArticle(null)
      setUpdateMessage("Updated!")
      setTimeout(() => setUpdateMessage(""), 3000)
    } catch (error) {
      console.error(error)
      alert("Unable to update the article")
    }
  }

  const sortedArticles = [...articlesData].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB
  })

  if (loading) return <p className="text-center pt-10 text-white">Loading articles...</p>

  return (
    <div className="relative w-full min-h-screen bg-gray-900">
      {/* Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-[#121212] backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 flex flex-col w-full gap-6 container mx-auto pt-20">

        {/* FILTRES */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <input
            type="text"
            placeholder="Search an article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#4b4b4b] text-white placeholder:text-gray-200 px-4 py-2 rounded-xl w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-white/40 cursor-pointer"
          />
          <div className="flex gap-2 sm:gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#4b4b4b] text-white px-4 py-2 rounded-xl w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-white/40 appearance-none cursor-pointer"
            >
              <option value="">All categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.title}</option>
              ))}
            </select>
            <button
              onClick={toggleSortOrder}
              className="bg-[#4b4b4b] text-white font-semibold px-4 py-2 rounded-xl hover:bg-white/40 transition cursor-pointer"
            >
              {sortOrder === "desc" ? "Date ↑" : "Date ↓"}
            </button>
          </div>
        </div>

        {/* MESSAGE DE MISE À JOUR */}
        {updateMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-400 font-semibold text-center"
          >
            {updateMessage}
          </motion.div>
        )}

        {/* LISTE DES ARTICLES */}
        {sortedArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.3, ease: "easeOut" }}
            className="relative p-4 bg-[#1e1e1e] border border-white/20 rounded-xl flex justify-between items-center gap-4"
          >
            {article.image && (
              <div className="w-28 h-30 md:w-50 md:h-33 flex-shrink-0 overflow-hidden rounded-lg border border-white/20">
  <img
    src={article.image}
    alt={article.title}
    className="w-full h-full object-cover"
  />
</div>

            )}
            <div className="flex-1">
              <h3 className="text-gray-300 text-sm">{formatDate(article.date)}</h3>
              <h2 className="text-xl font-bold text-white my-1">{article.title}</h2>
              <p className="text-gray-300 text-sm">{article.preview}</p>
            </div>
            <div className="flex flex-col gap-2">
              <ActionButton icon="✎" title="Edit" hover="hover:bg-[#2a6aa6]" onClick={() => setEditArticle(article)} />
              <ActionButton icon="👁" title="Preview" hover="hover:bg-[#2a6aa6]" onClick={() => setPreviewArticle(article)} />
              <ActionButton icon="✕" title="Delete" hover="hover:bg-red-500/60" onClick={() => setConfirmDelete(article.id)} />
            </div>
          </motion.div>
        ))}

        {/* CONFIRM DELETE */}
        {confirmDelete && (
          <Modal onClose={() => setConfirmDelete(null)}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Confirmation</h3>
              <button
                onClick={() => setConfirmDelete(null)}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20 border border-white/30 text-white text-sm font-bold hover:bg-gray-500 transition cursor-pointer"
              >
                ✕
              </button>
            </div>
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
          </Modal>
        )}

        {/* EDIT ARTICLE */}
        {editArticle && (
          <Modal onClose={() => setEditArticle(null)} size="max-w-3xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Edit Article</h3>
              <button
                onClick={() => setEditArticle(null)}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20 border border-white/30 text-white text-sm font-bold hover:bg-gray-500 transition cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={editArticle?.title ?? ""}
                onChange={(e) => handleEditChange("title", e.target.value)}
                placeholder="Title"
                className="bg-[#4b4b4b] text-white px-4 py-2 rounded-xl focus:outline-none"
              />
              <input
                type="text"
                value={editArticle?.preview ?? ""}
                onChange={(e) => handleEditChange("preview", e.target.value)}
                placeholder="Preview"
                className="bg-[#4b4b4b] text-white px-4 py-2 rounded-xl focus:outline-none"
              />
              <textarea
                value={editArticle?.text ?? ""}
                onChange={(e) => handleEditChange("text", e.target.value)}
                placeholder="Content"
                className="bg-[#4b4b4b] text-white px-4 py-2 rounded-xl h-40 resize-none custom-scroll"
              />
              <input
                type="text"
                value={editArticle?.image ?? ""}
                onChange={(e) => handleEditChange("image", e.target.value)}
                placeholder="Image URL"
                className="bg-[#4b4b4b] text-white px-4 py-2 rounded-xl"
              />
            </div>
            <div className="flex gap-4 justify-end mt-4">
              <button
                onClick={handleEditSubmit}
                className="px-6 py-2 rounded-xl bg-blue-500/70 hover:bg-blue-600/80 border border-blue-400/40 text-white font-semibold transition cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={() => setEditArticle(null)}
                className="px-6 py-2 rounded-xl bg-white/20 hover:bg-white/40 border border-white/30 text-white font-semibold transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </Modal>
        )}

        {/* PREVIEW ARTICLE */}
        {previewArticle && (
          <Modal onClose={() => setPreviewArticle(null)} size="max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{previewArticle.title}</h3>
              <button
                onClick={() => setPreviewArticle(null)}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20 border border-white/30 text-white text-sm font-bold hover:bg-gray-500 transition cursor-pointer"
              >
                ✕
              </button>
            </div>
            {previewArticle.image && (
              <div className="w-full h-48 mb-4 overflow-hidden rounded-lg border border-white/20">
                <img src={previewArticle.image} alt={previewArticle.title} className="w-full h-full object-cover"/>
              </div>
            )}
            <p className="text-gray-300 mb-4 text-xl font-semibold">{previewArticle.preview}</p>
            <p className="text-gray-300 whitespace-pre-wrap text-justify">{previewArticle.text}</p>
          </Modal>
        )}

      </div>
    </div>
  )
}
