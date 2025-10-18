"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// ------------------------------
// Mock Gallery Data
// ------------------------------
const galleryItems = [
  {
    id: 1,
    title: "Spandan Night",
    cat: "Cultural",
    src: "https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=1200",
  },
  {
    id: 2,
    title: "Hackathon Finals",
    cat: "Technical",
    src: "https://images.unsplash.com/photo-1555421689-3f034debb7f3?q=80&w=1200",
  },
  {
    id: 3,
    title: "Football Finals",
    cat: "Sports",
    src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200",
  },
  {
    id: 4,
    title: "AI Workshop",
    cat: "Technical",
    src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200",
  },
  {
    id: 5,
    title: "Group Dance",
    cat: "Cultural",
    src: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200",
  },
  {
    id: 6,
    title: "Athletics",
    cat: "Sports",
    src: "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?q=80&w=1200",
  },
  {
    id: 7,
    title: "Project Exhibition",
    cat: "Technical",
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200",
  },
  {
    id: 8,
    title: "Music Night",
    cat: "Cultural",
    src: "https://images.unsplash.com/photo-1507878866276-a947ef722fee?q=80&w=1200",
  },
  {
    id: 9,
    title: "Basketball Finals",
    cat: "Sports",
    src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200",
  },
];

// ------------------------------
// Page Component
// ------------------------------
const page = () => {
  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 sm:px-6 lg:px-12 py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-400"
        >
          Gallery Highlights
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-400 text-base sm:text-lg mt-3 max-w-2xl mx-auto"
        >
          Explore moments from <span className="text-yellow-400">Spandan</span>,{" "}
          <span className="text-green-400">Transmission</span> &{" "}
          <span className="text-red-400">Sparx</span> — events that define the
          spirit of XIE!
        </motion.p>
      </div>

      {/* Gallery Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        {galleryItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-gray-900/60 shadow-md hover:shadow-blue-500/10 hover:scale-[1.03] transition-all duration-300"
          >
            {/* Image */}
            <img
              src={item.src}
              alt={item.title}
              width={600}
              height={400}
              className="h-48 sm:h-56 md:h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Text */}
            <div className="absolute bottom-0 p-3 sm:p-4">
              <p className="font-semibold text-sm sm:text-base">{item.title}</p>
              <p className="text-xs sm:text-sm text-blue-300">{item.cat}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-16 text-gray-400 text-sm sm:text-base"
      >
        © {new Date().getFullYear()} XIE | Celebrating Talent, Innovation & Unity ✨
      </motion.div>
    </main>
  );
};

export default page;
