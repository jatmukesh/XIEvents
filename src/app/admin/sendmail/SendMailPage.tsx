"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Edit3, Trash2, Mail } from "lucide-react";

export default function SendMailPage() {
  const router = useRouter();

  const [drafts, setDrafts] = useState([
    { id: 1, title: "Welcome to Spandan", subject: "Cultural Fest - Spandan Announcement" },
    { id: 2, title: "Transmission Launch", subject: "Technical Fest Begins!" },
    { id: 3, title: "Sparx Sports Week", subject: "Get Ready for Interdepartmental Sports!" },
    { id: 4, title: "Alumni Meet 2025", subject: "Join us for the grand alumni reunion" },
  ]);

  const handleAdd = () => alert("Add new draft");
  const handleEdit = (id: number) => alert(`Edit draft ${id}`);
  const handleDelete = (id: number) => {
    if (confirm("Delete this draft?")) {
      setDrafts(drafts.filter((d) => d.id !== id));
    }
  };

  return (
    <main className="relative min-h-screen bg-gray-50 text-gray-900 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-600 flex items-center gap-2">
            <Mail size={28} /> Email Drafts
          </h2>
          <p className="text-gray-500 text-sm">
            Manage, edit, or delete your saved email templates.
          </p>
        </div>

        {/* Add New Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all"
          title="Add New Draft"
        >
          <Plus size={20} />
        </motion.button>
      </div>

      {/* Draft List (Column Layout) */}
      <div className="flex flex-col divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white shadow-sm">
        {drafts.map((draft, index) => (
          <motion.div
            key={draft.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 hover:bg-gray-50 transition-all cursor-pointer"
            onClick={() => router.push(`/admin/sendmail/${draft.id}`)} // ✅ navigate to draft editor
          >
            {/* Draft Info */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{draft.title}</h3>
              <p className="text-sm text-gray-500">{draft.subject}</p>
            </div>

            {/* Actions */}
            <div
              className="flex gap-3 mt-3 sm:mt-0"
              onClick={(e) => e.stopPropagation()} // ✅ prevent navigation when clicking icons
            >
              <button
                onClick={() => handleEdit(draft.id)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
                title="Edit"
              >
                <Edit3 size={18} className="text-yellow-600" />
              </button>
              <button
                onClick={() => handleDelete(draft.id)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
                title="Delete"
              >
                <Trash2 size={18} className="text-red-600" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {drafts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center mt-16 text-gray-500"
        >
          <Mail size={40} className="text-gray-400 mb-3" />
          <p className="text-sm">No drafts found. Click the + button to create one.</p>
        </motion.div>
      )}
    </main>
  );
}
