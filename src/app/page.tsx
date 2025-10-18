// app/page.tsx
"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import {
  ArrowRight,
  Medal,
  Megaphone,
  Trophy,
  Users,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import { HeroSection } from "@/components";

// ------------------------------
// Mock data (replace with API/DB)
// ------------------------------
const festCards = [
  {
    key: "spandan",
    title: "Spandan",
    subtitle: "Cultural Fest",
    colorFrom: "from-pink-500",
    colorTo: "to-fuchsia-600",
    href: "/fests/spandan",
    img: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200",
  },
  {
    key: "transmission",
    title: "Transmission",
    subtitle: "Technical Fest",
    colorFrom: "from-blue-500",
    colorTo: "to-indigo-600",
    href: "/fests/transmission",
    img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200",
  },
  {
    key: "sparx",
    title: "Sparx",
    subtitle: "Sports Fest",
    colorFrom: "from-emerald-500",
    colorTo: "to-green-600",
    href: "/fests/sparx",
    img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200",
  },
];

const gallery = [
  { id: 1, title: "Spandan Night", cat: "Cultural", src: "https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=1200" },
  { id: 2, title: "Hackathon Finals", cat: "Technical", src: "https://images.unsplash.com/photo-1555421689-3f034debb7f3?q=80&w=1200" },
  { id: 3, title: "Football Finals", cat: "Sports", src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200" },
  { id: 4, title: "AI Workshop", cat: "Technical", src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200" },
  { id: 5, title: "Group Dance", cat: "Cultural", src: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200" },
  { id: 6, title: "Athletics", cat: "Sports", src: "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?q=80&w=1200" },
];

const latestWinners = [
  { id: 1, name: "Rahul Mehta", event: "CodeSprint 2.0", pos: "Gold", dept: "IT" },
  { id: 2, name: "Aisha Shaikh", event: "AI in Healthcare", pos: "Silver", dept: "CS" },
  { id: 3, name: "Rohan Gupta", event: "Cricket Finals", pos: "Gold", dept: "EXTC" },
  { id: 4, name: "Priya Nair", event: "Solo Dance", pos: "Bronze", dept: "IT" },
];

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-start min-h-screen overflow-hidden bg-gray-950 text-white">
      {/* HERO */}
      <HeroSection />

      {/* Typing + intro */}
      <section className="relative w-full max-w-6xl px-6 py-16 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3, scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-pink-500/20 to-yellow-400/30 blur-3xl -z-10"
        />
        <TypeAnimation
          sequence={[
            "Discover the Spirit of XIE",
            1600,
            "Track Medals, Fests & Winners",
            1600,
            "Celebrate Talent, Innovation & Unity",
            1600,
          ]}
          speed={50}
          repeat={Infinity}
          className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-400 mb-6"
        />
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Winners from <span className="text-yellow-400 font-semibold">Spandan</span>,{" "}
          <span className="text-green-400 font-semibold">Transmission</span> &{" "}
          <span className="text-red-400 font-semibold">Sparx</span>. Automatic medal tallies, department standings, gallery highlights, and official email drafts — all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/fests"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg font-semibold shadow-lg hover:shadow-blue-500/40 transition-all inline-flex items-center gap-2"
          >
            Explore Fests <ArrowRight size={18} />
          </Link>
          <Link
            href="/medal-tally"
            className="px-6 py-3 bg-transparent border border-gray-300 rounded-lg font-semibold hover:bg-gray-200 hover:text-black transition-all inline-flex items-center gap-2"
          >
            View Medal Tally <Medal size={18} />
          </Link>
        </motion.div>
      </section>

      {/* Fest Overview */}
      <section className="w-full max-w-7xl px-6 pb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Fests at XIE</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {festCards.map((f, i) => (
            <motion.div
              key={f.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden bg-gray-900/60 border border-white/10"
            >
              <img
                src={f.img}
                alt={f.title}
                width={1000}
                height={600}
                className="h-56 w-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 p-5">
                <span className={`inline-block px-2.5 py-1 text-xs rounded-full bg-gradient-to-r ${f.colorFrom} ${f.colorTo}`}>
                  {f.subtitle}
                </span>
                <h3 className="text-2xl font-bold mt-3">{f.title}</h3>
                <Link
                  href={f.href}
                  className="mt-3 inline-flex items-center gap-2 text-sm text-blue-300 hover:text-blue-200"
                >
                  View events <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery Highlights */}
      <section className="w-full max-w-7xl px-6 py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl md:text-3xl font-bold">Gallery Highlights</h2>
          <Link href="/gallery" className="text-blue-300 hover:text-blue-200 text-sm inline-flex items-center gap-2">
            View all <Trophy size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {gallery.map((g, i) => (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-gray-900/60"
            >
              <img
                src={g.src}
                alt={g.title}
                width={600}
                height={500}
                className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 p-2 text-xs">
                <p className="font-semibold">{g.title}</p>
                <p className="text-blue-300">{g.cat}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Latest Winners */}
      <section className="w-full max-w-7xl px-6 pb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Latest Winners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {latestWinners.map((w, i) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl bg-gray-900/50 border border-white/10 p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-300">{w.event}</p>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    w.pos === "Gold"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : w.pos === "Silver"
                      ? "bg-slate-300/20 text-slate-200"
                      : "bg-amber-800/30 text-amber-200"
                  }`}
                >
                  {w.pos}
                </span>
              </div>
              <h4 className="text-lg font-semibold mt-2">{w.name}</h4>
              <p className="text-sm text-gray-400">Dept: {w.dept}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Notice Banner */}
      <section className="w-full px-6 pb-12">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/15 p-3 rounded-xl">
              <Megaphone size={22} />
            </div>
            <div>
              <p className="text-sm opacity-90">Latest Notice</p>
              <h3 className="text-lg md:text-xl font-semibold">
                Registration Open for Spandan 2025 — Join the celebration!
              </h3>
            </div>
          </div>
          <Link
            href="/notices"
            className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 transition px-4 py-2 rounded-lg"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 py-8 px-6 text-sm text-gray-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-white mb-2">XIE Student Council</h4>
            <p className="text-gray-400">
              Celebrating Talent, Innovation & Spirit across Spandan, Transmission & Sparx.
            </p>
          </div>
          <div className="space-y-1">
            <Link href="/about" className="hover:text-white block">
              About
            </Link>
            <Link href="/contact" className="hover:text-white block">
              Contact
            </Link>
            <Link href="/admin" className="hover:text-white block">
              Admin Login
            </Link>
          </div>
          <div className="text-gray-500 md:text-right">
            © {new Date().getFullYear()} XIE. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
