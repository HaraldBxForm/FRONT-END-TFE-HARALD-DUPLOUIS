'use client';

import { useState } from "react";
import styles from "@/styles/NewsLetterForm.module.css";
import { motion } from "motion/react";

export default function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <motion.div
      initial={{ opacity: 0}}
      whileInView={{ opacity: 1}}
      viewport={{ once: true }}
      transition={{
        delay: 1,
        duration: 1, // plus lent
        ease: "easeInOut" // douceur constante
      }}
      className={`${styles.NewsLetter} absolute bottom-8 left-1/2 transform -translate-x-1/2 
                  backdrop-blur-lg border  border-white/20  bg-white/10 
                  rounded-2xl p-6 shadow-xl max-w-2xl w-full z-20 mx-2 hidden md:inline-block`}
    >
      <h2 className="text-xl md:text-2xl font-bold mb-2 text-white text-center">
        Subscribe to Our Newsletter
      </h2>
      <p className="text-gray-300 mb-4 text-sm text-center">
        Get the latest updates and ocean conservation news from OceanSavers.
      </p>

      {submitted ? (
        <p className="text-white-400 font-medium text-center">Thank you for subscribing! 🌊</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-600 bg-gray-700/50 placeholder-gray-400 text-white 
                       focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition "
          />
          <button
            type="submit"
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-5 py-2 rounded-lg transition"
          >
            Subscribe
          </button>
        </form>
      )}
    </motion.div>
  );
}
