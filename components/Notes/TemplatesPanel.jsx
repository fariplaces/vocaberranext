"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   createTemplate,
   updateTemplate,
   deleteTemplate,
} from "@/store/slices/notesSlice";
import dynamic from "next/dynamic";

const BlockNoteEditor = dynamic(
   () => import("@/components/NotesEditor/BlockNoteEditor"),
   { ssr: false }
);

export default function TemplatesPanel() {
   const dispatch = useDispatch();
   const { templates, templateLoading } = useSelector((s) => s.notes);
   const [selected, setSelected] = useState(null); // template being edited
   const [creating, setCreating] = useState(false);
   const [form, setForm] = useState({ name: "", pattern: "", content: "" });

   const userTemplates = templates.filter((t) => t.userId !== null);
   const globalTemplates = templates.filter((t) => t.userId === null);

   const handleNew = () => {
      setSelected(null);
      setForm({ name: "", pattern: "", content: "" });
      setCreating(true);
   };

   const handleSelect = (t) => {
      // can only edit user templates, not global
      if (t.userId === null) return;
      setCreating(false);
      setSelected(t);
      setForm({ name: t.name, pattern: t.pattern, content: t.content });
   };

   const handleSave = async () => {
      if (!form.name || !form.pattern) return;
      if (creating) {
         await dispatch(createTemplate(form)).unwrap();
         setCreating(false);
      } else if (selected) {
         await dispatch(updateTemplate({ id: selected.id, ...form })).unwrap();
      }
      setForm({ name: "", pattern: "", content: "" });
      setSelected(null);
   };

   const handleDelete = async (id) => {
      await dispatch(deleteTemplate(id)).unwrap();
      if (selected?.id === id) setSelected(null);
   };

   const showEditor = creating || selected !== null;

   return (
      <div className="templates-page">
         {/* Sidebar */}
         <div className="templates-sidebar">
            <div className="templates-sidebar-header">
               <span>Templates</span>
               <button className="new-tpl-btn" onClick={handleNew}>+ New</button>
            </div>

            {templateLoading && <div className="tpl-loading">Loading...</div>}

            {globalTemplates.length > 0 && (
               <div className="tpl-section">
                  <div className="tpl-section-label">Global</div>
                  {globalTemplates.map((t) => (
                     <div
                        key={t.id}
                        className={`tpl-item ${selected?.id === t.id ? "active" : ""} readonly`}
                        onClick={() => handleSelect(t)}
                     >
                        <span className="tpl-name">{t.name}</span>
                        <span className="tpl-pattern">/{t.pattern}</span>
                     </div>
                  ))}
               </div>
            )}

            {userTemplates.length > 0 && (
               <div className="tpl-section">
                  <div className="tpl-section-label">My Templates</div>
                  {userTemplates.map((t) => (
                     <div
                        key={t.id}
                        className={`tpl-item ${selected?.id === t.id ? "active" : ""}`}
                        onClick={() => handleSelect(t)}
                     >
                        <div className="tpl-item-left">
                           <span className="tpl-name">{t.name}</span>
                           <span className="tpl-pattern">/{t.pattern}</span>
                        </div>
                        <button
                           className="tpl-delete"
                           onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(t.id);
                           }}
                        >
                           ×
                        </button>
                     </div>
                  ))}
               </div>
            )}

            {!templateLoading && templates.length === 0 && (
               <div className="tpl-empty">No templates yet</div>
            )}
         </div>

         {/* Editor panel */}
         <div className="templates-editor">
            {!showEditor && (
               <div className="templates-placeholder">
                  <p>Select a template to edit or create a new one</p>
                  <button className="new-tpl-btn-lg" onClick={handleNew}>
                     + New Template
                  </button>
               </div>
            )}

            {showEditor && (
               <>
                  <div className="tpl-editor-toolbar">
                     <div className="tpl-fields">
                        <input
                           className="tpl-field-input"
                           placeholder="Template name e.g. Daily Reflection"
                           value={form.name}
                           onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                           disabled={selected && !selected.userId}
                        />
                        <div className="tpl-pattern-wrap">
                           <span className="tpl-slash">/</span>
                           <input
                              className="tpl-field-input pattern"
                              placeholder="trigger e.g. daily"
                              value={form.pattern}
                              onChange={(e) =>
                                 setForm((f) => ({
                                    ...f,
                                    pattern: e.target.value.toLowerCase().replace(/\s/g, ""),
                                 }))
                              }
                              disabled={selected && !selected.userId}
                           />
                        </div>
                     </div>
                     {(!selected || selected.userId) && (
                        <button className="tpl-save-btn" onClick={handleSave}>
                           {creating ? "Create Template" : "Save Changes"}
                        </button>
                     )}
                  </div>

                  {/* Read-only indicator for global templates */}
                  {selected && !selected.userId && (
                     <div className="global-readonly-banner">
                        Global template — read only. Create your own copy with a different pattern.
                     </div>
                  )}

                  <div className="tpl-editor-content">
                     <BlockNoteEditor
                        key={selected?.id || "new"}
                        initialContent={form.content || undefined}
                        onChange={(content) => setForm((f) => ({ ...f, content }))}
                     />
                  </div>
               </>
            )}
         </div>

         <style jsx>{`
        .templates-page {
          flex: 1;
          display: flex;
          overflow: hidden;
        }
        .templates-sidebar {
          width: 240px;
          flex-shrink: 0;
          border-right: 1px solid #1e1e1e;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .templates-sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          border-bottom: 1px solid #1e1e1e;
          font-size: 13px;
          font-weight: 600;
          color: #e8e6e0;
        }
        .new-tpl-btn {
          background: transparent;
          border: 1px solid #2a2a2a;
          border-radius: 5px;
          color: #888;
          font-size: 12px;
          padding: 4px 10px;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.15s;
        }
        .new-tpl-btn:hover { color: #e8e6e0; border-color: #444; }
        .tpl-loading,
        .tpl-empty {
          color: #444;
          font-size: 13px;
          text-align: center;
          padding: 32px 0;
        }
        .tpl-section {
          padding: 8px;
        }
        .tpl-section-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #444;
          padding: 4px 8px 6px;
        }
        .tpl-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 10px;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.1s;
        }
        .tpl-item:hover { background: #1a1a1a; }
        .tpl-item.active { background: #1e1e1e; }
        .tpl-item.readonly { cursor: default; opacity: 0.7; }
        .tpl-item-left { display: flex; flex-direction: column; gap: 2px; }
        .tpl-name { font-size: 13px; color: #e8e6e0; }
        .tpl-pattern { font-size: 11px; color: #555; font-family: monospace; }
        .tpl-delete {
          background: none;
          border: none;
          color: #444;
          cursor: pointer;
          font-size: 16px;
          opacity: 0;
          line-height: 1;
          transition: opacity 0.15s;
        }
        .tpl-item:hover .tpl-delete { opacity: 1; }
        .tpl-delete:hover { color: #ef4444; }
        .templates-editor {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .templates-placeholder {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          color: #444;
          font-size: 14px;
        }
        .new-tpl-btn-lg {
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
        .new-tpl-btn-lg:hover { opacity: 0.85; }
        .tpl-editor-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 24px;
          border-bottom: 1px solid #1a1a1a;
          flex-shrink: 0;
        }
        .tpl-fields {
          display: flex;
          gap: 10px;
          flex: 1;
        }
        .tpl-field-input {
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 6px;
          padding: 7px 12px;
          color: #e8e6e0;
          font-size: 13px;
          outline: none;
          font-family: inherit;
          flex: 1;
        }
        .tpl-field-input:focus { border-color: #444; }
        .tpl-field-input:disabled { opacity: 0.5; cursor: not-allowed; }
        .tpl-pattern-wrap {
          display: flex;
          align-items: center;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 6px;
          padding: 0 12px;
          gap: 2px;
        }
        .tpl-slash { color: #555; font-family: monospace; font-size: 14px; }
        .tpl-field-input.pattern {
          background: transparent;
          border: none;
          padding: 7px 0;
          font-family: monospace;
          width: 140px;
          flex: none;
        }
        .tpl-save-btn {
          padding: 7px 18px;
          background: #e8e6e0;
          color: #0d0d0d;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .tpl-save-btn:hover { opacity: 0.85; }
        .global-readonly-banner {
          padding: 8px 24px;
          background: #1a1a10;
          border-bottom: 1px solid #2a2a1a;
          font-size: 12px;
          color: #888860;
        }
        .tpl-editor-content {
          flex: 1;
          overflow-y: auto;
          padding: 16px 24px;
        }
      `}</style>
      </div>
   );
}