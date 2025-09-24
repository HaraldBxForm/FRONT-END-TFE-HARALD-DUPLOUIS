"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "../app/auth/AuthContext.jsx";
import { useRouter } from "next/navigation";

export default function AdminHomeDashboard() {
  const [articlesData, setArticlesData] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [messagesData, setMessagesData] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("http://localhost:8010/api/article");
        if (!res.ok) throw new Error("Failed to fetch articles");
        const data = await res.json();
        const articles = Array.isArray(data) ? data : data.articles || [];
        setArticlesData(articles);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingArticles(false);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("http://localhost:8010/api/message");
        if (!res.ok) throw new Error("Failed to fetch messages");
        const data = await res.json();
        const messages = data.map((msg) => ({
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
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingMessages(false);
      }
    };
    fetchMessages();
  }, []);

  const sortedArticles = articlesData.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  const unreadCount = messagesData.filter((m) => m.status === "new").length;

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gray-900">
      {/* Background overlay */}
      <div className="fixed inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-[#121212] backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-7xl mx-auto mt-20 px-4 gap-6">
        {/* Sidebar Profil + Quick Links + Logout */}
        {user && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-64 flex-shrink-0 bg-[#1e1e1e] backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col items-center text-white mb-6 lg:mb-0"
          >
            {/* Profil */}
            <div className="w-20 h-20 rounded-full bg-[#2a2a2a] flex items-center justify-center mb-4">
              <span className="text-3xl font-bold">{user.username[0].toUpperCase()}</span>
            </div>
            <h3 className="text-xl font-bold mb-1 text-center lg:text-left">{user.username}</h3>
            <p className="text-sm text-white/70 text-center lg:text-left">{user.email}</p>
            <p
              className={
                user.role === "admin"
                  ? "text-red-500 font-semibold mt-2 text-center lg:text-left"
                  : "text-blue-500 font-semibold mt-2 text-center lg:text-left"
              }
            >
              {user.role === "admin" ? "Administrator" : "Editor"}
            </p>

            {/* Quick Links */}
            <div className="mt-6 w-full grid grid-cols-1 gap-3">
              <Link
                href="/admin/new-article"
                className="w-full bg-[#2a6aa6] hover:bg-[#164477] transition rounded-xl text-center py-3 font-semibold text-white"
              >
                + New Article
              </Link>
              <Link
                href="/admin/articles"
                className="w-full bg-[#2a6aa6] hover:bg-[#164477] transition rounded-xl text-center py-3 font-semibold text-white"
              >
                Articles
              </Link>
              <Link
                href="/admin/newsletter"
                className="w-full bg-[#2a6aa6] hover:bg-[#164477] transition rounded-xl text-center py-3 font-semibold text-white"
              >
                Newsletter
              </Link>
              <Link
                href="/admin/inbox"
                className="w-full bg-[#2a6aa6] hover:bg-[#164477] transition rounded-xl text-center py-3 font-semibold text-white flex items-center justify-center relative"
              >
                Inbox
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-700 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Link>

              {/* Discreet Log Out */}
              <button
                onClick={handleLogout}
                className="w-full bg-white/10 hover:bg-white/20 transition rounded-xl text-center py-3 font-semibold text-white cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            <Link
              href="/admin/articles"
              className="bg-[#1e1e1e] backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center text-white shadow-lg"
            >
              <span className="text-3xl font-bold">{articlesData.length}</span>
              <span className="text-sm text-white/80">Articles Published</span>
            </Link>
            <Link
              href="/admin/inbox"
              className="bg-[#1e1e1e] backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center text-white shadow-lg"
            >
              <span className="text-3xl font-bold">{loadingMessages ? "..." : unreadCount}</span>
              <span className="text-sm text-white/80">New Messages</span>
            </Link>
            <div className="bg-[#1e1e1e] backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center text-white shadow-lg">
              <span className="text-3xl font-bold">450,000 €</span>
              <span className="text-sm text-white/80">Funds Raised</span>
            </div>
          </motion.div>

          {/* Latest Articles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-1 sm:col-span-2 lg:col-span-2 bg-[#1e1e1e] backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white"
          >
            <h2 className="text-2xl font-bold mb-4">Latest Articles</h2>
            {loadingArticles ? (
              <p className="text-white/80">Loading articles...</p>
            ) : (
              <ul className="space-y-3 max-h-60 sm:max-h-96 overflow-y-auto custom-scroll">
                {sortedArticles.slice(0, 5).map((article) => (
                  <li
                    key={article.id}
                    className="bg-[#2a2a2a] p-4 rounded-xl flex justify-between items-center transition"
                  >
                    <div className="min-w-0">
                      <h3 className="font-semibold truncate">{article.title}</h3>
                      <p className="text-sm text-white/70 truncate">{article.preview}</p>
                    </div>
                    <span className="text-white/60 text-xs">
                      {new Date(article.date).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

          {/* Latest Messages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="col-span-1 sm:col-span-2 lg:col-span-1 bg-[#1e1e1e] backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white"
          >
            <div className="flex items-center justify-between mb-4">
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
              <ul className="space-y-3 max-h-60 sm:max-h-96 overflow-y-auto custom-scroll">
                {messagesData.slice(0, 5).map((msg) => (
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

          {/* Recent Donations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="col-span-1 sm:col-span-2 lg:col-span-3 bg-[#1e1e1e] backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white"
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
    </div>
  );
}
