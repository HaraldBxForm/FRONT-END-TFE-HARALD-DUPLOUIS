"use client";

import Checkout from "@/components/DonationForm.jsx";
import WatingImage from "@/components/WaitingImage.jsx";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Donation() {
  const [amount, setAmount] = useState(null);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center px-4 sm:px-6"
      style={{ backgroundImage: "url('/images/beautiful-photo-sea-waves.jpg')" }}
    >
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Carte glass effect */}
      <motion.div initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col md:flex-row bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl w-full max-w-5xl p-6 sm:p-8 gap-6 mt-24 mb-6 sm:mt-0 mx-0 sm:mx-0">

        {/* Partie gauche : choix du montant */}
        <div className="w-full md:w-full flex flex-col gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center md:text-left">
            Make a Difference
          </h2>

          {/* Boutons prédéfinis */}
          <div className="grid grid-cols-3 gap-3">
            {[10, 20, 50].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setAmount(value * 100)}
                className="px-4 py-2 bg-white/25 hover:bg-white/10 text-white font-semibold rounded-lg transition border border-white/30 cursor-pointer text-sm sm:text-base"
              >
                {value} €
              </button>
            ))}
          </div>

          {/* Formulaire montant personnalisé */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const value = e.target.amount.value;
              if (value && Number(value) > 0) {
                setAmount(Number(value) * 100);
              }
            }}
            className="flex flex-col sm:flex-row gap-3 mt-2"
          >
            <input
              name="amount"
              type="number"
              min="1"
              placeholder="Custom amount"
              className="flex-1 px-4 py-2 rounded-lg border border-white/40 bg-white/25 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition text-sm sm:text-base"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-white/25 hover:bg-white/10 text-white font-semibold rounded-lg transition border border-white/30 cursor-pointer text-sm sm:text-base"
            >
              Donate
            </button>
          </form>
        </div>

        {/* Partie droite : Checkout Stripe */}
        <div className="w-full md:w-full flex items-center justify-center">
          {amount ? <Checkout key={amount} amount={amount} /> : <WatingImage />}
        </div>
      </motion.div>
    </div>
  );
}
