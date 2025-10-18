"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { User, Mail, Phone, Building2, Edit3, Trophy, CalendarDays, Star } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@xie.edu.in",
    department: "Information Technology",
    role: "Event Coordinator",
    contact: "+91 98765 43210",
    profilePic: "https://avatars.githubusercontent.com/u/9919?s=200&v=4",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-8 overflow-y-auto">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-semibold text-blue-600 mb-6"
      >
        Profile
      </motion.h2>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md border border-gray-200 p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6"
      >
        {/* Profile Image */}
        <div className="relative">
          <img
            src={profile.profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-md"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">{profile.name}</h3>
            <button
              onClick={handleEditToggle}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all"
              title="Edit Profile"
            >
              <Edit3 size={18} />
            </button>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Mail size={18} className="text-blue-500" />
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-1 w-full focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span>{profile.email}</span>
              )}
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <Building2 size={18} className="text-green-500" />
              {isEditing ? (
                <input
                  type="text"
                  name="department"
                  value={profile.department}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-1 w-full focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span>{profile.department}</span>
              )}
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <User size={18} className="text-purple-500" />
              {isEditing ? (
                <input
                  type="text"
                  name="role"
                  value={profile.role}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-1 w-full focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span>{profile.role}</span>
              )}
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <Phone size={18} className="text-pink-500" />
              {isEditing ? (
                <input
                  type="text"
                  name="contact"
                  value={profile.contact}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-1 w-full focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span>{profile.contact}</span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats / Overview Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8"
      >
        {[
          { title: "Events Managed", value: 12, icon: <CalendarDays size={20} className="text-blue-500" /> },
          { title: "Winners Recognized", value: 36, icon: <Trophy size={20} className="text-yellow-500" /> },
          { title: "Achievements", value: 8, icon: <Star size={20} className="text-pink-500" /> },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <h4 className="text-xl font-semibold text-gray-800">{stat.value}</h4>
            </div>
            {stat.icon}
          </motion.div>
        ))}
      </motion.div>

      {/* Footer Buttons */}
      {isEditing && (
        <div className="flex justify-end mt-8">
          <button
            onClick={() => setIsEditing(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md transition"
          >
            Save Changes
          </button>
        </div>
      )}
    </main>
  );
}
