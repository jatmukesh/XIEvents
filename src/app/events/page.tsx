"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ------------------------------
// Mock Events Data
// ------------------------------
const eventsData = [
  {
    id: 1,
    title: "CodeSprint 2.0",
    type: "Technical",
    date: "Nov 25, 2025",
    desc: "A 3-hour competitive coding challenge open to all students.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    title: "Solo Dance Battle",
    type: "Cultural",
    date: "Dec 2, 2025",
    desc: "Show your moves and creativity in the biggest dance showdown!",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: 3,
    title: "Cricket League Finals",
    type: "Sports",
    date: "Dec 10, 2025",
    desc: "Departmental teams compete for the championship trophy.",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: 4,
    title: "AI for Healthcare",
    type: "Technical",
    date: "Dec 15, 2025",
    desc: "A workshop exploring AI innovations in the medical field.",
    color: "from-yellow-500 to-amber-600",
  },
];

// ------------------------------
// Page Component
// ------------------------------
const Page = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dept: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert(`🎉 You have successfully registered for ${selectedEvent.title}!`);
    setSelectedEvent(null);
    setFormData({ name: "", email: "", dept: "" });
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white px-3 sm:px-6 lg:px-12 py-10">
      {/* Header */}
      <header className="text-center mb-10 px-2">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-400"
        >
          Upcoming Events
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-400 text-sm sm:text-base md:text-lg mt-3 max-w-2xl mx-auto leading-relaxed"
        >
          Join the fun! Participate in cultural, technical, and sports events happening across campus.
        </motion.p>
      </header>

      {/* Events Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
        {eventsData.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className={`bg-gradient-to-br ${event.color} rounded-2xl p-[1px] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03]`}
          >
            <div className="bg-gray-900 rounded-2xl h-full p-5 flex flex-col justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-bold mb-2">{event.title}</h2>
                <p className="text-gray-400 text-xs sm:text-sm mb-1">
                  <span className="font-semibold text-gray-200">Type:</span> {event.type}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mb-2">
                  <span className="font-semibold text-gray-200">Date:</span> {event.date}
                </p>
                <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
                  {event.desc}
                </p>
              </div>
              <button
                onClick={() => setSelectedEvent(event)}
                className="mt-5 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all"
              >
                Participate
              </button>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Participation Form Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-3 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md p-5 sm:p-6"
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-400">
                Participate in {selectedEvent.title}
              </h2>
              <p className="text-gray-400 text-center mb-5 text-xs sm:text-sm">
                Fill in your details below to register.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 outline-none text-sm sm:text-base"
                />
                <input
                  required
                  type="email"
                  placeholder="Email ID"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 outline-none text-sm sm:text-base"
                />
                <input
                  required
                  type="text"
                  placeholder="Department"
                  value={formData.dept}
                  onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 outline-none text-sm sm:text-base"
                />

                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedEvent(null)}
                    className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 text-sm sm:text-base transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-semibold text-sm sm:text-base transition-all"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="text-center mt-16 text-gray-400 text-xs sm:text-sm md:text-base px-3">
        © {new Date().getFullYear()} XIE | Be part of something great 🎉
      </footer>
    </main>
  );
};

export default Page;
