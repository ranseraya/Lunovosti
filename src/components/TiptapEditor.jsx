'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapToolbar from './TiptapToolbar';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';

const TiptapEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image.configure({
        inline: true,
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
        onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <div className="border border-gray-300 rounded-lg">
      <TiptapToolbar editor={editor} />
      <EditorContent editor={editor} style={{ minHeight: '16rem' }} />
    </div>
  );
};

export default TiptapEditor;