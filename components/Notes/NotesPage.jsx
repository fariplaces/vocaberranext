"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotesSidebar from "@/components/Notes/NotesSidebar";
import NotesEditor from "@/components/Notes/NotesEditor";
import TemplatesPanel from "@/components/Notes/TemplatesPanel";
import GlobalNotesPanel from "@/components/Notes/GlobalNotesPanel";
import { setActiveNote } from "@/store/slices/notesSlice";
import { createNote, deleteNote, fetchGlobalNotes, fetchNotes, fetchTemplates } from "@/store/actions/notesActions";

export default function NotesPage() {
   const dispatch = useDispatch();
   const { notes, activeNote, loading } = useSelector((s) => s.notes);
   const [view, setView] = useState("notes"); // "notes" | "templates" | "global"

   useEffect(() => {
      dispatch(fetchNotes());
      dispatch(fetchTemplates());
      dispatch(fetchGlobalNotes());
   }, [dispatch]);

   const handleNewNote = () => {
      dispatch(createNote({ title: "Untitled" }));
   };

   return (
      <div className="notes-page">
         {/* Top nav */}
         <div className="notes-topbar">
            <div className="notes-topbar-left">
               <span className="notes-logo">{view == "notes" ? "Notes" : view == "templates" ? "Templates" : "Global"}</span>
            </div>
            <div className="notes-topbar-tabs">
               <button
                  className={`tab-btn ${view === "notes" ? "active" : ""}`}
                  onClick={() => setView("notes")}
               >
                  My Notes
               </button>
               <button
                  className={`tab-btn ${view === "global" ? "active" : ""}`}
                  onClick={() => setView("global")}
               >
                  Global
               </button>
               <button
                  className={`tab-btn ${view === "templates" ? "active" : ""}`}
                  onClick={() => setView("templates")}
               >
                  Templates
               </button>
            </div>
            <div className="notes-topbar-right">
               {view === "notes" && (
                  <button className="new-note-btn" onClick={handleNewNote}>
                     + New Note
                  </button>
               )}
            </div>
         </div>

         {/* Body */}
         <div className="notes-body">
            {view === "notes" && (
               <>
                  <NotesSidebar
                     notes={notes}
                     activeNote={activeNote}
                     loading={loading}
                     onSelect={(note) => dispatch(setActiveNote(note))}
                     onDelete={(id) => dispatch(deleteNote(id))}
                  />
                  <div className="notes-editor-area">
                     {activeNote ? (
                        <NotesEditor note={activeNote} />
                     ) : (
                        <div className="notes-empty">
                           <p>Select a note or create a new one</p>
                           <button className="new-note-btn" onClick={handleNewNote}>
                              + New Note
                           </button>
                        </div>
                     )}
                  </div>
               </>
            )}

            {view === "global" && <GlobalNotesPanel />}
            {view === "templates" && <TemplatesPanel />}
         </div>

         <style jsx>{`
        .notes-page {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: #0d0d0d;
          color: #e8e6e0;
          font-family: 'Georgia', serif;
        }
        .notes-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          height: 52px;
          border-bottom: 1px solid #1e1e1e;
          background: #0d0d0d;
          flex-shrink: 0;
        }
        .notes-logo {
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #e8e6e0;
          font-family: 'Georgia', serif;
        }
        .notes-topbar-tabs {
          display: flex;
          gap: 4px;
        }
        .tab-btn {
          padding: 6px 16px;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: #666;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.15s;
          font-family: inherit;
        }
        .tab-btn:hover { color: #e8e6e0; background: #1a1a1a; }
        .tab-btn.active { color: #e8e6e0; background: #1e1e1e; }
        .new-note-btn {
          padding: 7px 16px;
          background: #e8e6e0;
          color: #0d0d0d;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.15s;
          font-family: inherit;
        }
        .new-note-btn:hover { opacity: 0.85; }
        .notes-body {
          display: flex;
          flex: 1;
          overflow: hidden;
        }
        .notes-editor-area {
          flex: 1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .notes-empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          color: #444;
        }
        .notes-empty p { font-size: 15px; }
      `}</style>
      </div>
   );
}