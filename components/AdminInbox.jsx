'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AdminInbox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [activeTab, setActiveTab] = useState("all"); // onglet par défaut

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:8010/api/message");
      if (!response.ok) throw new Error("Failed to fetch messages");

      const data = await response.json();
      const mapped = data.map(msg => ({
        id: msg.id,
        sender: `${msg.firstname} ${msg.lastname}`,
        email: msg.mail_address,
        phone: msg.phone || msg.phone_number || msg.phoneNumber || "",
        message_object: msg.message_object || "",
        body: msg.text,
        date: msg.date,
        status: msg.status || "new",
      }));

      // Trier les messages : new en premier
      mapped.sort((a, b) => {
        if (a.status === "new" && b.status !== "new") return -1;
        if (a.status !== "new" && b.status === "new") return 1;
        return new Date(b.date) - new Date(a.date); // sinon par date
      });

      setMessages(mapped);
    } catch (error) {
      console.error("Erreur lors de la récupération des messages :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8010/api/message/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete message");

      setMessages(prev => prev.filter(m => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la suppression du message.");
    }
  };

  const markAsRead = async (msg) => {
    if (msg.status === "read") return; // déjà lu

    try {
      const response = await fetch(`http://localhost:8010/api/message/${msg.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "read" }),
      });
      if (!response.ok) throw new Error("Failed to mark as read");

      const updated = await response.json();
      setMessages(prev =>
        prev.map(m => (m.id === msg.id ? { ...m, status: updated.status } : m))
      );
      setSelectedMessage({ ...msg, status: "read" });
    } catch (error) {
      console.error(error);
    }
  };

  // New helper to change status (archive / unarchive etc.)
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8010/api/message/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error("Failed to change status");

      const updated = await response.json();
      setMessages(prev => prev.map(m => (m.id === id ? { ...m, status: updated.status } : m)));
      if (selectedMessage?.id === id) setSelectedMessage(prev => ({ ...prev, status: updated.status }));
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la mise à jour du statut.");
    }
  };

  const handleSelectMessage = (msg) => {
    setSelectedMessage(msg);
    markAsRead(msg); // ouvre et marque comme lu
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

  const filteredMessages = activeTab === "all"
    ? messages
    : messages.filter(msg => msg.status === activeTab);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gray-900">
      <div className="fixed inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-[#121212] backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto mt-32 px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Liste et onglets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="col-span-1 bg-[#1e1e1e] backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white"
        >
          <h2 className="text-2xl font-bold mb-4">Inbox</h2>

          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            {["all", "new", "read", "archived"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-full font-semibold text-sm transition cursor-pointer ${
                  activeTab === tab
                    ? "bg-[#2a6aa6] text-white"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-white/80">Loading messages...</p>
          ) : (
            <ul className="space-y-3 max-h-[600px] overflow-y-auto custom-scroll">
              {filteredMessages.map(msg => (
                <li
                  key={msg.id}
                  onClick={() => handleSelectMessage(msg)}
                  className={`p-4 rounded-xl cursor-pointer transition ${
                    selectedMessage?.id === msg.id
                      ? "bg-[#2a6aa6] border border-white/30"
                      : msg.status === "new"
                      ? "bg-[#464646] hover:bg-[#444444]"
                      : "bg-[#2a2a2a] hover:bg-[#333333]"
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="min-w-0">
                      <h3 className="font-semibold truncate">{msg.message_object}</h3>
                      <p className="text-sm text-white/70 truncate">{msg.body}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <span className="text-xs text-white/50">{formatDate(msg.date)}</span>
                      <p className="text-xs mt-1 text-white/50">{msg.status}</p>
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
              <h2 className="text-2xl font-bold mb-2">{selectedMessage.message_object}</h2>
              <p className="text-sm text-white/70 mb-2">
                From: {selectedMessage.sender} ({selectedMessage.email})
              </p>
              {/* Show phone in detail view if present */}
              {selectedMessage.phone && (
                <p className="text-sm text-white/70 mb-2">Phone: <a href={`tel:${selectedMessage.phone}`} className="underline">{selectedMessage.phone}</a></p>
              )}
              <p className="text-xs text-white/50 mb-4">{formatDate(selectedMessage.date)}</p>

              <div className="flex-1 overflow-y-auto custom-scroll">
                <p className="text-white leading-relaxed whitespace-pre-line">
                  {selectedMessage.body}
                </p>
              </div>

              <div className="flex justify-between mt-6 items-center">
                <div className="flex items-center gap-2">
                  {selectedMessage.status !== "archived" && (
                    <button
                      onClick={() => handleStatusChange(selectedMessage.id, "archived")}
                      className="px-4 py-2 bg-[#2a6aa6] hover:bg-[#164477] rounded-lg text-white font-semibold transition mr-2 cursor-pointer"
                    >
                      Archive
                    </button>
                  )}

                  {/* Reply button that opens default mail client */}
                  <a
                    href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent(selectedMessage.message_object || 'Re:')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-semibold transition"
                  >
                    Reply
                  </a>
                </div>

                <button
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-semibold transition cursor-pointer"
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
