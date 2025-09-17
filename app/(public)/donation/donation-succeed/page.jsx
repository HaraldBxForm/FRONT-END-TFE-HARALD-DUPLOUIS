'use client'

// app/(public)/news/[id]/not-found.jsx
import Link from "next/link";
import { motion } from "framer-motion";
import NewsLetterForm from "@/components/NewsLetterForm.jsx";

export default function DonationSuceed() {
  return (
    <div
      className="w-full min-h-screen flex flex-col relative bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/medias-remixes-esthetiques-de-fond-de-nature-etoilee-de-l-ocean.jpg')",
      }}
    >
      {/* Overlay flou */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md"></div>

      {/* Contenu principal */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center text-white max-w-2xl"
        >
          <h1 className="text-3xl md:text-3xl font-extrabold mb-4 drop-shadow-lg">
            Thank You for Supporting Us!
          </h1>
          <p className="text-lg md:text-lg text-white/80 mb-6 ">
            We sincerely appreciate your support in helping us protect and preserve our nature. Every contribution, whether through time, resources, or advocacy, plays a crucial role in safeguarding fragile ecosystems and the incredible biodiversity they harbor.
          </p>
          <Link
            href="/"
            className="border border-white/20 inline-block bg-white/10 backdrop-blur-md text-white font-medium py-2 px-5 rounded-full hover:bg-white/20 transition text-md md:text-md"
          >
            Home
          </Link>
        </motion.div>
        <NewsLetterForm />
      </div>
    </div>
  );
}
