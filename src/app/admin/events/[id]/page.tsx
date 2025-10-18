"use client";

import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

// ✅ Dynamic import to avoid SSR crash
const FroalaEditor = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});

export default function EventDesc() {
  const router = useRouter();
  const { id } = useParams();
  const [model, setModel] = useState<string>("");

  // Example event data (replace with real fetch)
  const event = {
    id,
    name: `Event ${id} - CodeSprint`,
    type: "Technical",
    date: "2025-03-12",
    venue: "Main Auditorium",
    createdBy: "Admin",
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
            {event.name}
          </h1>
          <p className="text-gray-600 text-sm">
            {event.type} | {event.date} | {event.venue}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Created by:{" "}
            <span className="font-medium text-gray-700">{event.createdBy}</span>
          </p>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all"
        >
          <ArrowLeft size={18} /> Back
        </button>
      </motion.div>

      {/* Froala Editor Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white border border-gray-300 rounded-lg shadow-md p-4 md:p-6"
      >
        <h2 className="text-lg font-semibold mb-3 text-gray-700">
          Event Description / Report
        </h2>

       <FroalaEditor
        tag="textarea"
        model={model}
        onModelChange={setModel}
        config={{
            placeholderText:
            "Write detailed event summary, highlights, winners, and post-event notes...",
            theme: "gray",
            heightMin: 300,
            heightMax: 600,
            charCounterCount: true,
            quickInsertTags: ["image", "table", "ul", "ol"],
            toolbarSticky: true,
            toolbarButtons: {
            moreText: {
                buttons: [
                "bold",
                "italic",
                "underline",
                "strikeThrough",
                "subscript",
                "superscript",
                "fontFamily",
                "fontSize",
                "textColor",
                "backgroundColor",
                "clearFormatting",
                ],
            },
            moreParagraph: {
                buttons: [
                "alignLeft",
                "alignCenter",
                "alignRight",
                "alignJustify",
                "formatOL",
                "formatUL",
                "paragraphFormat",
                "lineHeight",
                "outdent",
                "indent",
                "quote",
                ],
            },
            moreRich: {
                buttons: [
                "insertLink",
                "insertImage",
                "insertVideo",
                "insertFile",
                "insertTable",
                "emoticons",
                "specialCharacters",
                "embedly",
                "insertHR",
                ],
            },
            moreMisc: {
                buttons: [
                "undo",
                "redo",
                "fullscreen",
                "selectAll",
                "print",
                "html",
                "help",
                ],
                align: "right",
                buttonsVisible: 4,
            },
            },
            // 🔌 Enable all Froala plugins
            pluginsEnabled: [
            "align",
            "charCounter",
            "codeBeautifier",
            "codeView",
            "colors",
            "draggable",
            "emoticons",
            "entities",
            "file",
            "fontFamily",
            "fontSize",
            "fullscreen",
            "image",
            "imageTUI",
            "inlineClass",
            "inlineStyle",
            "lineBreaker",
            "link",
            "lists",
            "paragraphFormat",
            "paragraphStyle",
            "quickInsert",
            "quote",
            "save",
            "table",
            "url",
            "video",
            "wordPaste",
            ],
            // 🧭 image/file upload paths (customize later)
            imageUpload: false,
            fileUpload: false,
            videoUpload: false,
            attribution: false, // hide Froala branding
        }}
        />


        <div className="flex justify-end mt-6">
          <button
            onClick={() => alert("Event Description Saved")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition-all"
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </main>
  );
}
