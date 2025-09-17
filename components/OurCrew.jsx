'use client';

import { motion } from "framer-motion";

export default function OurCrew() {
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
        initial={{ opacity: 0, x: -50 }}
        delay={2}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 w-full md:flex-1 flex items-center justify-center text-white py-12 md:py-0 order-1"
      >
        <div className="px-6 md:px-12 lg:px-20 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Crew</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            At <span className="font-semibold text-white">OceanSavers</span>,
            our crew is a dedicated team of marine biologists, conservationists, and passionate volunteers. Each member brings unique skills and experiences, united by a common goal: to protect the oceans and foster sustainable practices worldwide.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Our team works tirelessly on research projects, community initiatives, and educational programs. From local beach clean-ups to global advocacy campaigns, every action we take is aimed at inspiring change and safeguarding the future of marine life.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Together, our crew embodies the spirit of collaboration, knowledge, and dedication. Through our combined efforts, we ensure that the mission of OceanSavers is not only accomplished but thrives, creating a lasting impact for generations to come.
          </p>
        </div>
      </motion.div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="relative z-10 w-full md:flex-1 h-64 md:h-screen order-2"
      >
        <img
          src="/images/professional-sailor-yachtsman-tights-tensions-cable-wire-rope-mechanical-winch-sailboat-yacht.jpg"
          alt="Our Crew Team"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </section>
  );
}
