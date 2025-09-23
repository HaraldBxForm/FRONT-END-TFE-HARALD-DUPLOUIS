"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ArticleCard from "./ArticleCard.jsx";

export default function ArticlesList() {
  const [articlesData, setArticlesData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:8010/api/category");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchArticles = async () => {
    setLoading(true);
    try {
      let url = "http://localhost:8010/api/article";
      if (searchTerm) {
        url = `http://localhost:8010/api/article/title?title=${encodeURIComponent(searchTerm)}`;
      } else if (selectedCategory) {
        url = `http://localhost:8010/api/article/category/${selectedCategory}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch articles");
      const data = await res.json();
      setArticlesData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [searchTerm, selectedCategory]);

  const toggleSortOrder = () => setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));

  const sortedArticles = [...articlesData].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="relative w-full min-h-screen">
      {/* IMAGE DE FOND FLOUE */}
      <div className="fixed inset-0 w-full h-full z-0">
        <img
          src="/images/belle-prise-de-vue-sous-l-eau-avec-la-lumiere-du-soleil-qui-brille-a-travers-la-surface.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xl"></div>
      </div>

      {/* CONTENU */}
      <div className="relative z-10 flex flex-col w-full gap-6 container mx-auto pt-20">
        {/* FILTRES */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-0">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search an article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/20 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-200 px-4 py-2 rounded-xl w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>

          <div className="flex flex-row gap-2 sm:gap-4 flex-nowrap justify-end w-full md:w-auto">
            <select
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(Number(e.target.value) || "")} // force number
>
  <option value="">All categories</option>
  {categories.map(cat => (
    <option key={cat.id} value={cat.id}>{cat.title}</option>
  ))}
</select>

            <button
              onClick={toggleSortOrder}
              className="bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold px-4 py-2 rounded-xl hover:bg-white/40 transition whitespace-nowrap w-full sm:w-auto"
            >
              {sortOrder === "desc" ? "Date ↑" : "Date ↓"}
            </button>
          </div>
        </div>

        {/* LISTE DES ARTICLES */}
        {loading && <p className="text-center text-white pt-10">Loading articles...</p>}

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

        {!loading && sortedArticles.length === 0 && <p className="text-center text-white pt-10">No articles found.</p>}
      </div>
    </div>
  );
}
