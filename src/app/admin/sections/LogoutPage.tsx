"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

export default function LogoutPage() {
  const [showModal, setShowModal] = useState(true);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <AnimatePresence>
        {showModal && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              className="fixed z-50 w-80 bg-white rounded-xl shadow-lg p-6 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Confirm Logout
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to log out of your account?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
