"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateNote, linkNote, unlinkNote, publishNote, unpublishNote } from "@/store/slices/notesSlice";
import dynamic from "next/dynamic";
import LinkNoteModal from "./LinkNoteModal";

const BlockNoteEditor = dynamic(() => import("@/components/NotesEditor/BlockNoteEditor"), {
   ssr: false,
});

const TARGET_TYPES = ["TOPIC", "EXERCISE", "SKILL", "CATEGORY", "LESSON", "TASK"];

export default function NotesEditor({ note }) {
   const dispatch = useDispatch();
   const [title, setTitle] = useState(note.title || "Untitled");
   const [showLinkModal, setShowLinkModal] = useState(false);
   const [saving, setSaving] = useState(false);
   const saveTimer = useRef(null);

   useEffect(() => {
      setTitle(note.title || "Untitled");
   }, [note.id]);

   // Auto-save title with debounce
   const handleTitleChange = (e) => {
      setTitle(e.target.value);
      clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
         dispatch(updateNote({ id: note.id, title: e.target.value }));
      }, 800);
   };

   // Auto-save content with debounce
   const handleContentChange = useCallback(
      (content) => {
         clearTimeout(saveTimer.current);
         saveTimer.current = setTimeout(() => {
            setSaving(true);
            dispatch(updateNote({ id: note.id, content })).finally(() =>
               setSaving(false)
            );
         }, 1000);
      },
      [note.id, dispatch]
   );

   const handleUnlink = () => {
      dispatch(unlinkNote(note.id));
   };

   const handlePublish = () => {
      dispatch(publishNote(note.id));
   };

   const handleUnpublish = () => {
      dispatch(unpublishNote(note.id));
   };

   const isGlobal = note.visibility === "GLOBAL";
   const isLinked = !!note.targetId;

   return (
      <div className="editor-wrap">
         {/* Toolbar */}
         <div className="editor-toolbar">
            <div className="toolbar-left">
               {saving && <span className="saving-indicator">Saving...</span>}
               {!saving && <span className="saving-indicator saved">Saved</span>}
            </div>
            <div className="toolbar-right">
               {/* Link status */}
               {isLinked ? (
                  <div className="link-status">
                     <span className="link-badge">
                        {note.targetType} linked
                     </span>
                     <button className="toolbar-btn danger" onClick={handleUnlink}>
                        Unlink
                     </button>
                  </div>
               ) : (
                  <button
                     className="toolbar-btn"
                     onClick={() => setShowLinkModal(true)}
                  >
                     Link to...
                  </button>
               )}

               {/* Publish status */}
               {isGlobal ? (
                  <div className="link-status">
                     <span className="share-code">{note.shareCode}</span>
                     <button className="toolbar-btn danger" onClick={handleUnpublish}>
                        Unpublish
                     </button>
                  </div>
               ) : (
                  <button className="toolbar-btn publish" onClick={handlePublish}>
                     Publish
                  </button>
               )}
            </div>
         </div>

         {/* Title */}
         <div className="editor-title-wrap">
            <input
               className="editor-title"
               value={title}
               onChange={handleTitleChange}
               placeholder="Untitled"
            />
         </div>

         {/* Meta info */}
         <div className="editor-meta">
            {isLinked && (
               <span className="meta-tag">
                  {note.targetType}: {note.targetId}
               </span>
            )}
            {isGlobal && (
               <span className="meta-tag global">
                  Global · {note.shareCode}
               </span>
            )}
         </div>

         {/* Editor */}
         <div className="editor-content">
            <BlockNoteEditor
               initialContent={note.content}
               onChange={handleContentChange}
            />
         </div>

         {/* Link Modal */}
         {showLinkModal && (
            <LinkNoteModal
               noteId={note.id}
               onClose={() => setShowLinkModal(false)}
            />
         )}

         <style jsx>{`
        .editor-wrap {
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
        }
        .editor-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 32px;
          border-bottom: 1px solid #1a1a1a;
          flex-shrink: 0;
        }
        .toolbar-left { display: flex; align-items: center; gap: 8px; }
        .toolbar-right { display: flex; align-items: center; gap: 8px; }
        .saving-indicator {
          font-size: 12px;
          color: #444;
        }
        .saving-indicator.saved { color: #3d7a3d; }
        .toolbar-btn {
          padding: 5px 14px;
          border-radius: 5px;
          border: 1px solid #2a2a2a;
          background: transparent;
          color: #888;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.15s;
          font-family: inherit;
        }
        .toolbar-btn:hover { color: #e8e6e0; border-color: #444; }
        .toolbar-btn.publish {
          border-color: #3d7a3d;
          color: #4a9a4a;
        }
        .toolbar-btn.publish:hover { background: #1a2e1a; }
        .toolbar-btn.danger {
          border-color: #7a3d3d;
          color: #9a4a4a;
        }
        .toolbar-btn.danger:hover { background: #2e1a1a; }
        .link-status { display: flex; align-items: center; gap: 6px; }
        .link-badge {
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 4px;
          background: #1a2030;
          color: #6a8ab0;
          border: 1px solid #2a3a50;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .share-code {
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 4px;
          background: #1a2e1a;
          color: #4a9a4a;
          border: 1px solid #2a4a2a;
          font-family: monospace;
          letter-spacing: 0.05em;
        }
        .editor-title-wrap {
          padding: 32px 32px 0;
          flex-shrink: 0;
        }
        .editor-title {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          font-size: 28px;
          font-weight: 700;
          color: #e8e6e0;
          font-family: 'Georgia', serif;
          letter-spacing: -0.02em;
        }
        .editor-title::placeholder { color: #2a2a2a; }
        .editor-meta {
          display: flex;
          gap: 8px;
          padding: 8px 32px;
          flex-shrink: 0;
        }
        .meta-tag {
          font-size: 11px;
          color: #444;
          padding: 2px 8px;
          border-radius: 4px;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
        }
        .meta-tag.global { color: #4a9a4a; background: #1a2e1a; border-color: #2a4a2a; }
        .editor-content {
          flex: 1;
          overflow-y: auto;
          padding: 8px 32px 32px;
        }
      `}</style>
      </div>
   );
}