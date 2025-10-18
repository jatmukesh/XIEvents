"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden bg-gray-500 text-white">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="https://videos.pexels.com/video-files/2941105/2941105-uhd_2732_1440_24fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      {/* Floating Glow */}
      <motion.div
        className="absolute w-80 h-80 bg-blue-500/30 blur-3xl rounded-full top-20 left-20"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-pink-500/30 blur-3xl rounded-full bottom-20 right-20"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl text-center px-6 sm:px-10">
        {/* Typing Text */}
        <TypeAnimation
          sequence={[
            "XIE Student Council",
            1500,
            "Celebrating Talent, Innovation & Spirit",
            1500,
            "Explore the highlights of Spandan, Transmission & Sparx.",
            1500,
          ]}
          speed={50}
          repeat={Infinity}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-400"
        />

        {/* Fading subtitle (animated in below typing) */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8"
        >
          Track medals, winners, and class standings across every XIE fest —
          <span className="text-yellow-400 font-semibold"> Spandan</span>,{" "}
          <span className="text-green-400 font-semibold">Transmission</span> &
          <span className="text-red-400 font-semibold"> Sparx</span>.
        </motion.p>

        {/* Buttons with hover animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/events"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-lg font-medium shadow-md hover:shadow-blue-500/50 transition-all"
          >
            View Fests
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/medal-tally"
            className="px-6 py-3 border border-white hover:bg-white hover:text-black rounded-lg text-lg font-medium shadow-md hover:shadow-white/30 transition-all"
          >
            View Medal Tally
          </motion.a>
        </motion.div>
      </div>

      {/* Floating Badges */}
      <div className="absolute bottom-5 flex gap-3 justify-center w-full text-sm text-gray-400">
        <span className="bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
          🎭 Spandan (Cultural)
        </span>
        <span className="bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
          ⚙️ Transmission (Technical)
        </span>
        <span className="bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
          🏆 Sparx (Sports)
        </span>
      </div>
    </section>
  );
}
