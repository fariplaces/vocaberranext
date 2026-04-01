"use client";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

export default function NotesSidebar({ notes, activeNote, loading, onSelect, onDelete }) {
   const [search, setSearch] = useState("");
   const [filter, setFilter] = useState("all"); // "all" | "linked" | "standalone"

   const filtered = notes.filter((n) => {
      const matchSearch = n.title.toLowerCase().includes(search.toLowerCase());
      if (filter === "linked") return matchSearch && n.targetId;
      if (filter === "standalone") return matchSearch && !n.targetId;
      return matchSearch;
   });

   return (
      <div className="sidebar">
         {/* Search */}
         <div className="sidebar-search">
            <input
               type="text"
               placeholder="Search notes..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
            />
         </div>

         {/* Filter pills */}
         <div className="sidebar-filters">
            {["all", "linked", "standalone"].map((f) => (
               <button
                  key={f}
                  className={`filter-pill ${filter === f ? "active" : ""}`}
                  onClick={() => setFilter(f)}
               >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
               </button>
            ))}
         </div>

         {/* Notes list */}
         <div className="sidebar-list">
            {loading && <div className="sidebar-loading">Loading...</div>}
            {!loading && filtered.length === 0 && (
               <div className="sidebar-empty">No notes found</div>
            )}
            {filtered.map((note) => (
               <div
                  key={note.id}
                  className={`note-item ${activeNote?.id === note.id ? "active" : ""}`}
                  onClick={() => onSelect(note)}
               >
                  <div className="note-item-header">
                     <span className="note-item-title">{note.title || "Untitled"}</span>
                     <button
                        className="note-item-delete"
                        onClick={(e) => {
                           e.stopPropagation();
                           onDelete(note.id);
                        }}
                     >
                        ×
                     </button>
                  </div>
                  <div className="note-item-meta">
                     {note.targetType && (
                        <span className="note-badge">{note.targetType}</span>
                     )}
                     <span className="note-date">
                        {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
                     </span>
                  </div>
               </div>
            ))}
         </div>

         <style jsx>{`
        .sidebar {
          width: 260px;
          flex-shrink: 0;
          border-right: 1px solid #1e1e1e;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: #0d0d0d;
        }
        .sidebar-search {
          padding: 12px;
          border-bottom: 1px solid #1a1a1a;
        }
        .sidebar-search input {
          width: 100%;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 6px;
          padding: 7px 12px;
          color: #e8e6e0;
          font-size: 13px;
          outline: none;
          font-family: inherit;
        }
        .sidebar-search input::placeholder { color: #444; }
        .sidebar-filters {
          display: flex;
          gap: 6px;
          padding: 8px 12px;
          border-bottom: 1px solid #1a1a1a;
        }
        .filter-pill {
          padding: 3px 10px;
          border-radius: 20px;
          border: 1px solid #2a2a2a;
          background: transparent;
          color: #666;
          font-size: 11px;
          cursor: pointer;
          transition: all 0.15s;
          font-family: inherit;
        }
        .filter-pill:hover { color: #e8e6e0; border-color: #444; }
        .filter-pill.active {
          background: #1e1e1e;
          color: #e8e6e0;
          border-color: #444;
        }
        .sidebar-list {
          flex: 1;
          overflow-y: auto;
          padding: 8px;
        }
        .sidebar-loading,
        .sidebar-empty {
          text-align: center;
          color: #444;
          font-size: 13px;
          padding: 32px 0;
        }
        .note-item {
          padding: 10px 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.1s;
          margin-bottom: 2px;
        }
        .note-item:hover { background: #1a1a1a; }
        .note-item.active { background: #1e1e1e; }
        .note-item-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .note-item-title {
          font-size: 13px;
          color: #e8e6e0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
        }
        .note-item-delete {
          background: none;
          border: none;
          color: #444;
          cursor: pointer;
          font-size: 16px;
          padding: 0 2px;
          line-height: 1;
          opacity: 0;
          transition: opacity 0.15s;
        }
        .note-item:hover .note-item-delete { opacity: 1; }
        .note-item-delete:hover { color: #ef4444; }
        .note-item-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 4px;
        }
        .note-badge {
          font-size: 10px;
          padding: 1px 6px;
          border-radius: 3px;
          background: #1e1e1e;
          color: #888;
          border: 1px solid #2a2a2a;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .note-date {
          font-size: 11px;
          color: #444;
        }
      `}</style>
      </div>
   );
}