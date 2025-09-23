'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AdminInbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    
    //! A REMPLACER PAR MON FETCH VERS L'API
    const fetchMessages = async () => {
      try {
        const fakeMessages = [
          {
            id: 1,
            sender: "Alice Dupont",
            email: "alice@example.com",
            subject: "Question about donations",
            body: "Hello, I would like to know how my donations are used concretely...",
            date: "2025-09-19T10:20:00Z",
          },
          {
            id: 2,
            sender: "Marc Lemoine",
            email: "marc@example.com",
            subject: "Volunteering",
            body: "Hi, I want to help with local cleanup operations, how can I register?",
            date: "2025-09-18T16:45:00Z",
          },
          {
            id: 3,
            sender: "Sophie Martin",
            email: "sophie@example.com",
            subject: "Newsletter",
            body: "Please add me to your monthly newsletter!",
            date: "2025-09-18T09:15:00Z",
          },
        ];
        setMessages(fakeMessages);
      } catch (error) {
        console.error("Erreur lors de la récupération des messages :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selectedMessage?.id === id) setSelectedMessage(null);
  };

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gray-900">
      {/* Fond sombre */}
      <div className="fixed inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-[#121212] backdrop-blur-sm"></div>
      </div>

      {/* Contenu */}
      <div className="relative z-10 w-full max-w-7xl mx-auto mt-32 px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Liste des messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="col-span-1 lg:col-span-1 bg-[#1e1e1e] backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white"
        >
          <h2 className="text-2xl font-bold mb-4">Inbox</h2>
          {loading ? (
            <p className="text-white/80">Loading messages...</p>
          ) : (
            <ul className="space-y-3 max-h-[600px] overflow-y-auto custom-scroll">
              {messages.map((msg) => (
                <li
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`p-4 rounded-xl cursor-pointer transition ${
                    selectedMessage?.id === msg.id
                      ? "bg-[#2a6aa6] border border-white/30"
                      : "bg-[#2a2a2a] hover:bg-[#333333]"
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="min-w-0">
                      <h3 className="font-semibold truncate">{msg.subject}</h3>
                      <p className="text-sm text-white/70 truncate">{msg.body}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <span className="text-xs text-white/50">{formatDate(msg.date)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </motion.div>

        {/* Contenu du message sélectionné */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="col-span-1 lg:col-span-2 bg-[#1e1e1e] backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white flex flex-col"
        >
          {selectedMessage ? (
            <>
              <h2 className="text-2xl font-bold mb-2">{selectedMessage.subject}</h2>
              <p className="text-sm text-white/70 mb-2">
                From: {selectedMessage.sender} ({selectedMessage.email})
              </p>
              <p className="text-xs text-white/50 mb-4">{formatDate(selectedMessage.date)}</p>

              <div className="flex-1 overflow-y-auto custom-scroll">
                <p className="text-white leading-relaxed whitespace-pre-line">
                  {selectedMessage.body}
                </p>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition"
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <p className="text-white/70 italic">Select a message to read</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
