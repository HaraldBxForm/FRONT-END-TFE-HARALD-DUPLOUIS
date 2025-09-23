'use client';

import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div
      className="relative min-h-screen flex items-start justify-center bg-cover bg-center bg-fixed pt-24 sm:pt-32 lg:pt-40 pb-16"
      style={{ backgroundImage: "url('/images/beautiful-photo-sea-waves.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Glass effect card with animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl mx-4 sm:mx-6 md:mx-8 lg:mx-0 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl p-8 sm:p-12 text-white mb-12"
      >
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-white/80 text-base sm:text-lg">
            We value your privacy. Please read our policy carefully to understand how we handle your data.
          </p>
        </div>

        {/* Privacy Policy Content */}
        <div className="space-y-6 text-white/90 text-base sm:text-base leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
            <p>
              We may collect personal information such as your name, email address, and other details when you interact with our website. This data is used solely to improve our services and provide you with relevant information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
            <p>
              The information collected may be used to communicate with you, improve our website, send updates or newsletters, and provide a personalized experience. We ensure that your data is handled responsibly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">3. Sharing Your Information</h2>
            <p>
              We do not sell your information. Data may be shared with trusted partners only to provide services on our behalf, under strict confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">4. Cookies</h2>
            <p>
              Our website uses cookies to enhance user experience, analyze site usage, and provide personalized content. You can disable cookies in your browser settings if you prefer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">5. Security</h2>
            <p>
              We implement industry-standard security measures to protect your data. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">6. Your Rights</h2>
            <p>
              You have the right to access, correct, or request deletion of your personal data at any time. Please contact us for any privacy-related inquiries.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. Any changes will be posted on this page with the effective date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Contact</h2>
            <p>
              If you have any questions regarding this policy, you can reach us at{" "}
              <a
                href="mailto:privacy@oceansavers.org"
                className="underline hover:text-white transition"
              >
                privacy@oceansavers.org
              </a>.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
