"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, ShieldCheck } from "lucide-react";

export default function Page() {
  const [admins, setAdmins] = useState([
    { id: 1, name: "John Doe", email: "john@xie.edu", role: "Super Admin" },
    { id: 2, name: "Priya Sharma", email: "priya@xie.edu", role: "Admin" },
  ]);

  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", role: "Admin" });

  const handleAdd = () => {
    if (newAdmin.name && newAdmin.email) {
      setAdmins([
        ...admins,
        { id: Date.now(), ...newAdmin },
      ]);
      setNewAdmin({ name: "", email: "", role: "Admin" });
      alert("New admin added successfully!");
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-semibold text-blue-600 mb-6 flex items-center gap-2"
      >
        <UserPlus size={26} /> Manage Admins
      </motion.h2>

      {/* Add New Admin Form */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newAdmin.name}
            onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={newAdmin.email}
            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newAdmin.role}
            onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option>Admin</option>
            <option>Super Admin</option>
          </select>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAdd}
          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Add Admin
        </motion.button>
      </div>

      {/* Admin List */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Existing Admins</h3>
        <ul className="divide-y divide-gray-200">
          {admins.map((admin) => (
            <li key={admin.id} className="flex justify-between py-3 text-sm">
              <span className="font-medium">{admin.name}</span>
              <span className="text-gray-500">{admin.email}</span>
              <span className="text-blue-600 flex items-center gap-1">
                <ShieldCheck size={16} /> {admin.role}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
