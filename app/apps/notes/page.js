// app/notes/page.js
"use client";

import { useState } from "react";
import { DynamicEditor } from "@/components/NotesEditor/DynamicEditor";

export default function NotesPage() {
   const [noteContent, setNoteContent] = useState("");

   const handleSave = async () => {
      console.log("Saving this JSON to SQLite:", noteContent);

      // Since you are using a polymorphic schema for topics and notes:
      // await fetch('/api/notes', {
      //    method: 'POST',
      //    body: JSON.stringify({ content: noteContent })
      // });
   };

   return (
      <div className="max-w-4xl mx-auto p-10 space-y-4">
         <h1 className="text-2xl font-bold text-white">My Topic Notes</h1>

         <DynamicEditor onChange={(json) => setNoteContent(json)} />

         <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
         >
            Save Note
         </button>
      </div>
   );
}