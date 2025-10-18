"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, Plus, X, Send } from "lucide-react";

export default function ManageWinnersPage() {
  const [winners, setWinners] = useState([
    { id: 1, name: "Rahul Mehta", event: "CodeSprint", position: "1st", dept: "IT" },
    { id: 2, name: "Neha Patil", event: "RoboRace", position: "2nd", dept: "MECH" },
    { id: 3, name: "Amit Singh", event: "Cricket", position: "1st", dept: "EXTC" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newWinner, setNewWinner] = useState({
    name: "",
    event: "",
    position: "",
    dept: "",
  });

  const handleAddWinner = () => {
    if (!newWinner.name || !newWinner.event || !newWinner.position || !newWinner.dept) {
      alert("Please fill all fields!");
      return;
    }

    setWinners([...winners, { id: Date.now(), ...newWinner }]);
    setNewWinner({ name: "", event: "", position: "", dept: "" });
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Remove this winner?")) {
      setWinners(winners.filter((w) => w.id !== id));
    }
  };

  const handleSendMail = () => {
    alert("Mail sent to all admins successfully!");
  };

  return (
    <div className="relative p-6 md:p-10 bg-gray-50 min-h-screen">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-semibold text-blue-600 mb-6 flex items-center gap-2"
      >
        <Trophy size={26} /> Manage Winners
      </motion.h2>

      {/* Winners Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Event</th>
              <th className="px-6 py-3 text-left">Position</th>
              <th className="px-6 py-3 text-left">Department</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {winners.map((w) => (
              <tr
                key={w.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{w.name}</td>
                <td className="px-6 py-4">{w.event}</td>
                <td className="px-6 py-4 text-yellow-600 font-semibold flex items-center gap-1">
                  <Medal size={16} /> {w.position}
                </td>
                <td className="px-6 py-4">{w.dept}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDelete(w.id)}
                    className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition"
                    title="Delete"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Send Mail Button */}
      <div className="flex justify-end mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSendMail}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full shadow-md transition"
          title="Send Mail to Admins"
        >
          <Send size={18} />
        </motion.button>
      </div>

      {/* Floating Add Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowModal(true)}
        className="fixed bottom-20 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
        title="Add Winner"
      >
        <Plus size={22} />
      </motion.button>

      {/* Add Winner Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Add New Winner
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={newWinner.name}
                  onChange={(e) =>
                    setNewWinner({ ...newWinner, name: e.target.value })
                  }
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Event"
                  value={newWinner.event}
                  onChange={(e) =>
                    setNewWinner({ ...newWinner, event: e.target.value })
                  }
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={newWinner.position}
                  onChange={(e) =>
                    setNewWinner({ ...newWinner, position: e.target.value })
                  }
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Position</option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                </select>
                <input
                  type="text"
                  placeholder="Department"
                  value={newWinner.dept}
                  onChange={(e) =>
                    setNewWinner({ ...newWinner, dept: e.target.value })
                  }
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end mt-5">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleAddWinner}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full shadow-md transition"
                >
                  Add
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
