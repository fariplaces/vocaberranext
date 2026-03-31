// // components/NotesEditor/DynamicEditor.js
// "use client";

// import dynamic from "next/dynamic";

// export const DynamicEditor = dynamic(() => import("./BlockNoteEditor"), {
//    ssr: false,
//    loading: () => (
//       <div className="h-[300px] flex items-center justify-center text-gray-400">
//          Loading Notion Editor...
//       </div>
//    )
// });

// components/NotesEditor/DynamicEditor.jsx
"use client";

import dynamic from "next/dynamic";

// This forces Next.js to COMPLETELY ignore the editor on the server!
export const DynamicEditor = dynamic(
   () => import("./BlockNoteEditor"),
   {
      ssr: false, // 👈 THE FIX: Disables Server-Side Rendering
      loading: () => (
         <div className="h-[300px] flex items-center justify-center text-gray-400">
            Loading interactive editor...
         </div>
      )
   }
);