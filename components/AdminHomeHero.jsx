'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function AdminHomeDashboard() {
  const [articlesData, setArticlesData] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [messagesData, setMessagesData] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  //? FETCH DB ARTICLES
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:8010/api/article");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        const articles = Array.isArray(data) ? data : data.articles || [];
        setArticlesData(articles);
      } catch (err) {
        console.error("Erreur lors de la récupération des articles :", err);
      } finally {
        setLoadingArticles(false);
      }
    };

    fetchArticles();
  }, []);

  //? FETCH DB MESSAGES
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:8010/api/message");
        if (!response.ok) throw new Error("Failed to fetch messages");
        const data = await response.json();

        const messages = data.map(msg => ({
          id: msg.id,
          sender: `${msg.firstname} ${msg.lastname}`,
          email: msg.mail_address,
          message_object: msg.message_object || "",
          body: msg.text,
          date: msg.date,
          status: msg.status || "new",
        }));

        messages.sort((a, b) => new Date(b.date) - new Date(a.date));
        setMessagesData(messages);
      } catch (error) {
        console.error("Erreur lors de la récupération des messages :", error);
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
  }, []);

  // Trier les articles par date décroissante
  const sortedArticles = articlesData
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Nombre de messages non lus
  const unreadCount = messagesData.filter(m => m.status === "new").length;

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gray-900">
      <div className="fixed inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-[#121212] backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto mt-32 px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Section Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="col-span-1 lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          <Link href="/admin/articles" className="bg-[#1e1e1e] backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center text-white">
            <span className="block text-3xl font-bold">{articlesData.length}</span>
            <span className="text-sm text-white/80">Articles Published</span>
          </Link>
          <Link href="/admin/inbox"className="bg-[#1e1e1e] backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center text-white">
            <span className="block text-3xl font-bold">{loadingMessages ? "..." : unreadCount}</span>
            <span className="text-sm text-white/80">New Messages</span>
          </Link>
          <div className="bg-[#1e1e1e] backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center text-white">
            <span className="block text-3xl font-bold">450,000 €</span>
            <span className="text-sm text-white/80">Funds Raised</span>
          </div>
        </motion.div>

        {/* Section Accès Rapides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="col-span-1 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-3"
        >
          <Link
            href="/admin/new-article"
            className="bg-[#2a6aa6] hover:bg-[#164477] transition rounded-2xl text-center py-6 font-semibold text-white"
          >
            + New Article
          </Link>
          <Link
            href="/admin/articles"
            className="bg-[#2a6aa6] hover:bg-[#164477] transition rounded-2xl text-center py-6 font-semibold text-white"
          >
            Articles
          </Link>
          <Link
            href="/admin/newsletter"
            className="bg-[#2a6aa6] hover:bg-[#164477] transition rounded-2xl text-center py-6 font-semibold text-white"
          >
            Newsletter
          </Link>
          <Link
            href="/admin/inbox"
            className="bg-[#2a6aa6] hover:bg-[#164477] transition rounded-2xl text-center py-6 font-semibold text-white"
          >
            Inbox
          </Link>
        </motion.div>

        {/* Section Latest Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="col-span-1 lg:col-span-2 mt-3 bg-[#1e1e1e] backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white"
        >
          <h2 className="text-2xl font-bold mb-4">Latest Articles</h2>
          {loadingArticles ? (
            <p className="text-white/80">Loading articles...</p>
          ) : (
            <ul className="space-y-3 max-h-96 overflow-y-auto custom-scroll">
              {sortedArticles.slice(0, 3).map((article) => (
                <li key={article.id} className="bg-[#2a2a2a] p-4 rounded-xl flex justify-between items-center transition">
                  <div>
                    <h3 className="font-semibold">{article.title}</h3>
                    <p className="text-sm text-white/70">{article.preview}</p>
                  </div>
                  <span className="text-white/60 text-xs">{new Date(article.date).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>

        {/* Section Latest Inbox Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="col-span-1 lg:col-span-1 mt-3 bg-[#1e1e1e] backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center mb-4 justify-between">
            <h2 className="text-2xl font-bold">Latest Messages</h2>
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-700 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>

          {loadingMessages ? (
            <p className="text-white/80">Loading messages...</p>
          ) : messagesData.length > 0 ? (
            <ul className="space-y-3 max-h-96 overflow-y-auto custom-scroll">
              {messagesData.slice(0, 3).map((msg) => (
                <Link key={msg.id} href="/admin/inbox" className="block">
                  <li className="bg-[#2a2a2a] p-4 rounded-xl transition hover:bg-[#333333]">
                    <div className="flex justify-between items-start">
                      <div className="min-w-0">
                        <h3 className="font-semibold truncate">{msg.message_object}</h3>
                        <p className="text-sm text-white/70 truncate">{msg.body}</p>
                      </div>
                      <span className="text-xs text-white/50">
                        {new Date(msg.date).toLocaleDateString()}
                      </span>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <p className="text-white/70 italic">No messages found</p>
          )}
        </motion.div>

        {/* Section Recent Donations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="col-span-1 lg:col-span-1 mt-3 bg-[#1e1e1e] backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white"
        >
          <h2 className="text-2xl font-bold mb-4">Recent Donations</h2>
          <ul className="space-y-3">
            <li className="bg-[#2a2a2a] p-4 rounded-xl flex justify-between items-center transition">
              <span>John Doe</span>
              <span className="text-white/70 text-sm">50 €</span>
            </li>
            <li className="bg-[#2a2a2a] p-4 rounded-xl flex justify-between items-center transition">
              <span>Jane Smith</span>
              <span className="text-white/70 text-sm">30 €</span>
            </li>
          </ul>
        </motion.div>

      </div>
    </div>
  );
}
