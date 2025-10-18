"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown, Send, ArrowLeft } from "lucide-react";
import { TextEditor } from "@/components";

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const [recipient, setRecipient] = useState("All Students");
  const [content, setContent] = useState("");

  const recipients = ["All Students", "Faculty", "CRs", "Department Heads"];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
            Draft #{id}
          </h1>
          <p className="text-gray-500 text-sm">
            Edit and send your email to the selected recipients.
          </p>
        </div>

        {/* Back Button */}
        <motion.button
          onClick={() => router.back()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full text-white shadow-md transition-all"
          title="Go Back"
        >
          <ArrowLeft size={20} />
        </motion.button>
      </motion.div>

      {/* Email Composition */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 md:p-6"
      >
        {/* Recipient Selector and Send */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          {/* Dropdown */}
          <div className="relative w-full md:w-64">
            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full appearance-none border border-gray-300 rounded-md px-4 py-2 pr-8 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {recipients.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-3 text-gray-400 pointer-events-none"
            />
          </div>

          {/* Send Button */}
          <motion.button
            onClick={() => alert("Email Sent Successfully!")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white shadow-md transition-all"
            title="Send Mail"
          >
            <Send size={20} />
          </motion.button>
        </div>

        {/* Reusable Froala Text Editor */}
        <TextEditor
          initialContent="<p>Customize your email content here...</p>"
          onChange={(value) => setContent(value)}
        />
      </motion.div>
    </main>
  );
}
