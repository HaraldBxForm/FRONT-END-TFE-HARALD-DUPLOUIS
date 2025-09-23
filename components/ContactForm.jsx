"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div
      className="relative min-h-screen flex items-start justify-center bg-cover bg-center bg-fixed pt-24 sm:pt-32 lg:pt-40"
      style={{ backgroundImage: "url('/images/beautiful-photo-sea-waves.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Glass effect card with animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-4 sm:mx-0 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col gap-6 text-white"
      >
        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Contact Us</h2>
          <p className="text-white/80 text-sm sm:text-base">
            For any questions or to support our mission, send us a message.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="firstname"
              placeholder="First name"
              value={formData.firstname}
              onChange={handleChange}
              required
              className="flex-1 px-4 py-2 rounded-lg border border-white/30 bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/80"
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last name"
              value={formData.lastname}
              onChange={handleChange}
              required
              className="flex-1 px-4 py-2 rounded-lg border border-white/30 bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/80"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded-lg border border-white/30 bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/80"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg border border-white/30 bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/80"
          />
          <textarea
            name="message"
            placeholder="Your message..."
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded-lg border border-white/30 bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/80"
          ></textarea>

          <button
            type="submit"
            className="px-6 py-3 bg-white/20 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/40 transition cursor-pointer"
          >
            Send
          </button>
        </form>

        {/* Contact info */}
        <div className="mt-6 border-t border-white/30 pt-4 text-center text-white/80 text-sm sm:text-base space-y-1">
          <p>
            Email:{" "}
            <a
              href="mailto:contact@oceansavers.org"
              className="underline hover:text-white transition"
            >
              contact@oceansavers.org
            </a>
          </p>
          <p>
            Phone:{" "}
            <a
              href="tel:+33123456789"
              className="underline hover:text-white transition"
            >
              +33 1 23 45 67 89
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
