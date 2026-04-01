"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { importNote } from "@/store/slices/notesSlice";

export default function GlobalNotesPanel() {
   const dispatch = useDispatch();
   const { globalNotes, loading } = useSelector((s) => s.notes);
   const [shareCode, setShareCode] = useState("");
   const [importing, setImporting] = useState(null);
   const [importCode, setImportCode] = useState("");
   const [search, setSearch] = useState("");

   const handleImport = async (note) => {
      setImporting(note.id);
      try {
         await dispatch(importNote({ shareCode: note.shareCode })).unwrap();
      } finally {
         setImporting(null);
      }
   };

   const handleImportByCode = async () => {
      if (!importCode.trim()) return;
      await dispatch(importNote({ shareCode: importCode.trim() })).unwrap();
      setImportCode("");
   };

   const filtered = globalNotes.filter((n) =>
      n.title.toLowerCase().includes(search.toLowerCase())
   );

   return (
      <div className="global-panel">
         {/* Import by code */}
         <div className="import-bar">
            <input
               className="import-input"
               placeholder="Enter share code e.g. NOTE-A3X9K"
               value={importCode}
               onChange={(e) => setImportCode(e.target.value.toUpperCase())}
               onKeyDown={(e) => e.key === "Enter" && handleImportByCode()}
            />
            <button className="import-btn" onClick={handleImportByCode}>
               Import
            </button>
         </div>

         {/* Search */}
         <div className="global-search">
            <input
               placeholder="Search global notes..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
            />
         </div>

         {/* Grid */}
         <div className="global-grid">
            {loading && <div className="panel-loading">Loading...</div>}
            {!loading && filtered.length === 0 && (
               <div className="panel-empty">No global notes yet</div>
            )}
            {filtered.map((note) => (
               <div key={note.id} className="global-card">
                  <div className="global-card-header">
                     <h4 className="global-card-title">{note.title}</h4>
                     <span className="global-card-code">{note.shareCode}</span>
                  </div>
                  {note.targetType && (
                     <div className="global-card-link">
                        {note.targetType}
                     </div>
                  )}
                  <div className="global-card-footer">
                     <button
                        className="import-card-btn"
                        onClick={() => handleImport(note)}
                        disabled={importing === note.id}
                     >
                        {importing === note.id ? "Importing..." : "Import to My Notes"}
                     </button>
                  </div>
               </div>
            ))}
         </div>

         <style jsx>{`
        .global-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 24px;
          gap: 16px;
        }
        .import-bar {
          display: flex;
          gap: 8px;
          max-width: 500px;
        }
        .import-input {
          flex: 1;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 6px;
          padding: 9px 14px;
          color: #e8e6e0;
          font-size: 13px;
          outline: none;
          font-family: monospace;
          letter-spacing: 0.05em;
        }
        .import-input:focus { border-color: #444; }
        .import-btn {
          padding: 9px 20px;
          background: #e8e6e0;
          color: #0d0d0d;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
        }
        .import-btn:hover { opacity: 0.85; }
        .global-search input {
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 6px;
          padding: 8px 14px;
          color: #e8e6e0;
          font-size: 13px;
          outline: none;
          width: 300px;
          font-family: inherit;
        }
        .global-grid {
          flex: 1;
          overflow-y: auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 12px;
          align-content: start;
        }
        .panel-loading,
        .panel-empty {
          color: #444;
          font-size: 14px;
          grid-column: 1/-1;
          text-align: center;
          padding: 48px 0;
        }
        .global-card {
          background: #141414;
          border: 1px solid #1e1e1e;
          border-radius: 8px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: border-color 0.15s;
        }
        .global-card:hover { border-color: #2a2a2a; }
        .global-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
        }
        .global-card-title {
          font-size: 14px;
          font-weight: 600;
          color: #e8e6e0;
          margin: 0;
          font-family: 'Georgia', serif;
        }
        .global-card-code {
          font-size: 10px;
          font-family: monospace;
          color: #4a9a4a;
          background: #1a2e1a;
          border: 1px solid #2a4a2a;
          padding: 2px 6px;
          border-radius: 3px;
          flex-shrink: 0;
        }
        .global-card-link {
          font-size: 11px;
          color: #6a8ab0;
          background: #1a2030;
          border: 1px solid #2a3a50;
          padding: 2px 8px;
          border-radius: 4px;
          display: inline-block;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .global-card-footer { margin-top: auto; }
        .import-card-btn {
          width: 100%;
          padding: 7px;
          border-radius: 5px;
          border: 1px solid #2a2a2a;
          background: transparent;
          color: #888;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.15s;
          font-family: inherit;
        }
        .import-card-btn:hover {
          background: #1e1e1e;
          color: #e8e6e0;
          border-color: #444;
        }
        .import-card-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>
      </div>
   );
}