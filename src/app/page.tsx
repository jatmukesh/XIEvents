"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { HeroSection ,Navbar} from "@/components";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gray-950 text-white">
      {/* HERO SECTION */}
      <HeroSection />

      {/* Animated Section Below Hero */}
      <section className="relative w-full max-w-6xl px-6 py-20 text-center overflow-hidden">
        {/* Background floating glow for effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3, scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-pink-500/20 to-yellow-400/30 blur-3xl -z-10"
        />

        {/* Typing heading */}
        <TypeAnimation
          sequence={[
            "Discover the Spirit of XIE",
            2000,
            "Track Medals, Fests & Winners",
            2000,
            "Celebrate Talent, Innovation & Unity",
            2000,
          ]}
          speed={50}
          repeat={Infinity}
          className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-400 mb-8"
        />

        {/* Paragraph fade in */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Step into a world where <span className="text-yellow-400 font-semibold">Spandan</span>’s
          cultural rhythm meets <span className="text-green-400 font-semibold">Transmission</span>’s
          technical brilliance and <span className="text-red-400 font-semibold">Sparx</span>’s
          athletic energy. Experience <span className="font-semibold text-blue-400">XIE</span> like
          never before.
        </motion.p>

        {/* Animated Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <motion.a
            href="/fests"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg font-semibold shadow-lg hover:shadow-blue-500/40 transition-all"
          >
            Explore Fests
          </motion.a>

          <motion.a
            href="/medal-tally"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-transparent border border-gray-300 rounded-lg font-semibold hover:bg-gray-200 hover:text-black transition-all"
          >
            View Medal Tally
          </motion.a>
        </motion.div>
      </section>
    </main>
  );
}
