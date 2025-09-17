// app/(public)/news/[id]/page.jsx
import articles from "@/data/articles.json";
import Link from "next/link";

export default function ArticlePage({ params }) {
  const { id } = params; // récupéré côté serveur
  const article = articles.find((a) => a.id.toString() === id.toString());

  if (!article) return <p>Article not found.</p>;

  return (
    <div className="bg-gray-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
  {/* Image */}
  <img
    src={article.image}
    alt={article.title}
    className="w-full h-72 object-cover rounded-t-2xl"
  />

  {/* Contenu */}
  <div className="p-8 flex flex-col flex-1">
    <h1 className="text-4xl font-extrabold mb-6 text-white tracking-tight">
      {article.title}
    </h1>

    <p className="text-gray-300 mb-8 leading-relaxed">
      {article.text}
    </p>

    <p className="text-gray-500 text-sm">
      Published on:{" "}
      {new Date(article.publishedAt).toLocaleDateString()}
    </p>
  </div>
</div>
  );
}
