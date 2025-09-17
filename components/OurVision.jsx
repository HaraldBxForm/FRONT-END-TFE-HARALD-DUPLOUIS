'use client';

import { motion } from "framer-motion";

export default function OurVision() {
  return (
    <section
      className="relative w-full flex flex-col md:flex-row bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url('/images/medias-remixes-esthetiques-de-fond-de-nature-etoilee-de-l-ocean.jpg')",
      }}
    >
      {/* Overlay avec flou */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Texte */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        delay={2}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 w-full md:flex-1 flex items-center justify-center text-white py-12 md:py-0 order-1 md:order-2"
      >
        <div className="px-6 md:px-12 lg:px-20 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Vision</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            At <span className="font-semibold text-white">OceanSavers</span>,
            our vision is a future where oceans thrive with life, free from
            pollution and protected by collective human action. We believe that
            preserving marine ecosystems is not just an environmental necessity
            but also a moral responsibility to ensure a balanced planet.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            By combining innovation, global cooperation, and local engagement,
            we aim to restore ocean health and inspire new generations to value
            the blue heart of our planet. Together, we can transform awareness
            into action and protect the seas for centuries to come.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Every effort counts, and through unity, education, and sustainable
            practices, we can turn the tide and build a brighter future for both
            humanity and the incredible biodiversity that calls the ocean home.
          </p>
        </div>
      </motion.div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="relative z-10 w-full md:flex-1 h-64 md:h-screen order-2 md:order-1"
      >
        <img
          src="/images/underwater-plant.jpg"
          alt="Ocean preservation"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </section>
  );
}
