"use client";

import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Heading2,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image as ImageIcon,
  Link as LinkIcon,
  Code,
} from "lucide-react";
import { useCallback, useRef } from "react";

const TiptapToolbar = ({ editor }) => {
  const fileInputRef = useRef(null);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        editor.chain().focus().setImage({ src: data.url }).run();
      } else {
        alert("Image upload failed: " + data.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during upload.");
    }
  };

  if (!editor) {
    return null;
  }
  return (
    <div className="border-b border-gray-300 p-2 flex flex-wrap items-center gap-2 bg-gray-50">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
        title="Bold"
      >
        <Bold className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
        title="Italic"
      >
        <Italic className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
        title="Strikethrough"
      >
        <Strikethrough className="w-5 h-5" />
      </button>

      <div className="divider" />

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
        title="Bullet List"
      >
        <List className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
        title="Ordered List"
      >
        <ListOrdered className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
        title="Blockquote"
      >
        <Quote className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
        title="Code Block"
      >
        <Code className="w-5 h-5" />
      </button>

      <div className="divider" />

      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
        title="Align Left"
      >
        <AlignLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
        title="Align Center"
      >
        <AlignCenter className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
        title="Align Right"
      >
        <AlignRight className="w-5 h-5" />
      </button>

      <div className="divider" />

      <button
        onClick={setLink}
        className={editor.isActive("link") ? "is-active" : ""}
        title="Add Link"
      >
        <LinkIcon className="w-5 h-5" />
      </button>
      <button onClick={() => fileInputRef.current?.click()} title="Add Image">
        <ImageIcon className="w-5 h-5" />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      <style jsx>{`
        button {
          padding: 6px;
          border: none;
          background: transparent;
          cursor: pointer;
          border-radius: 4px;
          transition: background-color 0.2s;
        }
        button:hover {
          background-color: #e5e7eb; /* gray-200 */
        }
        button.is-active {
          background-color: #d1d5db; /* gray-300 */
          color: #111827; /* gray-900 */
        }
        .divider {
          width: 1px;
          height: 1.25rem;
          background-color: #d1d5db; /* gray-300 */
          margin-left: 0.25rem;
          margin-right: 0.25rem;
        }
      `}</style>
    </div>
  );
};

export default TiptapToolbar;
