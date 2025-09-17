'use client';

import { motion } from "framer-motion";

export default function OurMission() {
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
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            At <span className="font-semibold text-white">OceanSavers</span>,
            our mission is not only to protect the world’s oceans but also to
            ensure that marine biodiversity thrives for generations to come. We
            dedicate our efforts to combating plastic pollution, restoring
            fragile ecosystems, and defending endangered species that call the
            ocean their home. Every initiative we launch is rooted in the belief
            that a healthy ocean is essential for a healthy planet.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Our approach goes beyond environmental preservation. We strive to
            educate communities, inspire individuals, and influence
            decision-makers to take bold action in the fight against climate
            change and marine degradation. From organizing local clean-ups to
            advocating for stronger international policies, we are committed to
            being a driving force for positive change.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Through education, advocacy, and hands-on action, we work with
            partners and communities worldwide to build a collective movement.
            Together, we can transform awareness into action and create a truly
            sustainable relationship with our planet’s most vital resource — the
            ocean.
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
          src="/images/closeup-shot-ship-sailing-calm-sea-beautiful-day.jpg"
          alt="Ocean conservation"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </section>
  );
}
