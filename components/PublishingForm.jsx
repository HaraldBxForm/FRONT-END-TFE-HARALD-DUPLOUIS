'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../app/auth/AuthContext.jsx";

// Composant Multi-select pour les catégories
function CategorySelector({ selectedCategories, setSelectedCategories, categories }) {
  const [open, setOpen] = useState(false);
  

  const toggleCategory = (catId) => {
    if (selectedCategories.includes(catId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== catId));
    } else {
      setSelectedCategories([...selectedCategories, catId]);
    }
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 rounded-lg border border-white/30 bg-[#2a2a2a] text-white text-left focus:outline-none focus:ring-2 focus:ring-white/80"
      >
        {selectedCategories.length > 0
          ? selectedCategories.map(id => categories.find(c => c.id === id)?.title).join(", ")
          : "Select Categories"}
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full bg-[#1e1e1e] backdrop-blur-sm border border-white/20 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center px-4 py-2 cursor-pointer text-white hover:bg-white/10">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => toggleCategory(cat.id)}
                className="w-3 h-3 mx-2 rounded-md border border-white/30 bg-white/10 accent-white cursor-pointer focus:ring-2 focus:ring-white/80"
              />
              {cat.title}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PublishingForm() {
  const [formData, setFormData] = useState({
    title: "",
    preview: "",
    text: "",
    image: "",
    author: "",
    category: [], // stocke les IDs
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
    const { token } = useAuth();

  // FETCH les catégories avec leur ID depuis le backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8010/api/category");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return (
      formData.title.trim() &&
      formData.preview.trim() &&
      formData.text.trim() &&
      formData.image.trim() &&
      formData.author.trim() &&
      formData.category.length > 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(false);
    setError(null);

    if (!isFormValid()) {
      setError("Please fill all fields and select at least one category.");
      return;
    }

    try {
      const payload = {
        title: formData.title,
        preview: formData.preview,
        text: formData.text,
        image: formData.image,
        date: new Date(),
        authors: formData.author ? [{ firstname: formData.author, lastname: "" }] : [],
        categoryIds: formData.category, // <-- envoie les IDs
      };

      const response = await fetch("http://localhost:8010/api/article/", {
        method: "POST",
        headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errMsg = await response.text();
        throw new Error(errMsg || "Error creating article");
      }

      const result = await response.json();
      console.log("Article created:", result);

      setSubmitted(true);
      setFormData({
        title: "",
        preview: "",
        text: "",
        image: "",
        author: "",
        category: [],
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gray-900">
      <div className="fixed inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-[#121212] backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#1e1e1e] backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-6 flex flex-col text-white min-h-[700px]"
        >
          <div className="flex flex-col gap-6 mb-4">
            <h2 className="text-3xl font-bold text-center">Publish New Article</h2>
            {submitted && (
              <p className="bg-emerald-600 text-white px-4 py-2 rounded-md text-center">
                Article submitted successfully!
              </p>
            )}
            {error && (
              <p className="bg-red-400 text-white px-4 py-2 rounded-md text-center">{error}</p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              name="title"
              placeholder="Article Title"
              value={formData.title}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg border border-white/30 bg-[#2a2a2a] placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/80"
            />
            <input
              type="text"
              name="preview"
              placeholder="Preview Text"
              value={formData.preview}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg border border-white/30 bg-[#2a2a2a] placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/80"
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg border border-white/30 bg-[#2a2a2a] placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/80"
            />
            <input
              type="text"
              name="author"
              placeholder="Author Name"
              value={formData.author}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg border border-white/30 bg-[#2a2a2a] placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/80"
            />

            <CategorySelector
              selectedCategories={formData.category}
              setSelectedCategories={(cats) => setFormData(prev => ({ ...prev, category: cats }))}
              categories={categories}
            />

            <textarea
              name="text"
              placeholder="Article Content..."
              rows={6}
              value={formData.text}
              onChange={handleChange}
              className="px-4 py-2 rounded-lg border border-white/30 bg-[#2a2a2a] placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/80 resize-none flex-1 custom-scroll"
            />

            <button
              type="submit"
              disabled={!isFormValid()}
              className={`mt-4 w-full px-6 py-3 border rounded-lg text-white font-semibold transition ${
                isFormValid()
                  ? "bg-[#2a6aa6] border-white/20 hover:bg-[#164477] cursor-pointer"
                  : "bg-white/10 border-white/20 cursor-not-allowed opacity-50"
              }`}
            >
              Publish Article
            </button>
          </form>
        </motion.div>

        {/* Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="bg-[#1e1e1e] backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg p-6 text-white overflow-y-auto custom-scroll"
          style={{ maxHeight: "700px" }}
        >
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}
          <h2 className="text-xl font-bold">{formData.title || "Article Title"}</h2>
          <p className="text-sm text-gray-200 italic">{formData.preview || "Preview text..."}</p>
          <div className="mt-4 text-gray-100 whitespace-pre-line">
            {formData.text || "Article content will appear here..."}
          </div>
          <div className="mt-4 text-xs text-gray-400">
            {formData.author && <p>By {formData.author}</p>}
            {formData.category.length > 0 && (
              <p>Category: {formData.category.map(id => categories.find(c => c.id === id)?.title).join(", ")}</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
