"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// ✅ Dynamically import Froala to avoid SSR crash
const FroalaEditor = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});

interface TextEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
}

const TextEditor = ({ initialContent = "", onChange }: TextEditorProps) => {
  const [model, setModel] = useState(initialContent);

  const handleChange = (content: string) => {
    setModel(content);
    if (onChange) onChange(content);
  };

  return (
    <div className="w-full rounded-lg border border-gray-300 overflow-hidden">
      <FroalaEditor
        tag="textarea"
        model={model}
        onModelChange={handleChange}
        config={{
          placeholderText: "Write here...",
          theme: "gray",
          heightMin: 300,
          heightMax: 600,
          charCounterCount: true,
          toolbarSticky: true,
          quickInsertTags: ["image", "table", "ul", "ol"],
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
                "insertTable",
                "emoticons",
                "insertHR",
              ],
            },
            moreMisc: {
              buttons: ["undo", "redo", "fullscreen", "html"],
              align: "right",
            },
          },
          pluginsEnabled: [
            "align",
            "charCounter",
            "colors",
            "draggable",
            "emoticons",
            "file",
            "fontFamily",
            "fontSize",
            "fullscreen",
            "image",
            "inlineClass",
            "inlineStyle",
            "lineBreaker",
            "link",
            "lists",
            "paragraphFormat",
            "paragraphStyle",
            "quickInsert",
            "quote",
            "table",
            "url",
            "video",
            "wordPaste",
          ],
          attribution: false,
          imageUpload: false,
          fileUpload: false,
          videoUpload: false,
        }}
      />
    </div>
  );
};

export default TextEditor;
