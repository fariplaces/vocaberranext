"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { linkNote } from "@/store/slices/notesSlice";

const TARGET_TYPES = ["TOPIC", "EXERCISE", "SKILL", "CATEGORY", "LESSON", "TASK"];

export default function LinkNoteModal({ noteId, onClose }) {
   const dispatch = useDispatch();
   const [targetType, setTargetType] = useState("TOPIC");
   const [targetId, setTargetId] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   const handleLink = async () => {
      if (!targetId.trim()) return setError("Target ID is required");
      setLoading(true);
      try {
         await dispatch(linkNote({ id: noteId, targetId: targetId.trim(), targetType })).unwrap();
         onClose();
      } catch (err) {
         setError("Failed to link note");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="modal-overlay" onClick={onClose}>
         <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
               <h3>Link Note</h3>
               <button className="modal-close" onClick={onClose}>×</button>
            </div>

            <div className="modal-body">
               <label className="field-label">Target Type</label>
               <div className="type-grid">
                  {TARGET_TYPES.map((t) => (
                     <button
                        key={t}
                        className={`type-btn ${targetType === t ? "active" : ""}`}
                        onClick={() => setTargetType(t)}
                     >
                        {t}
                     </button>
                  ))}
               </div>

               <label className="field-label" style={{ marginTop: 16 }}>
                  Target ID
               </label>
               <input
                  className="field-input"
                  placeholder={`Paste the ${targetType.toLowerCase()} ID...`}
                  value={targetId}
                  onChange={(e) => {
                     setTargetId(e.target.value);
                     setError("");
                  }}
               />
               {error && <p className="field-error">{error}</p>}
            </div>

            <div className="modal-footer">
               <button className="modal-btn cancel" onClick={onClose}>Cancel</button>
               <button className="modal-btn confirm" onClick={handleLink} disabled={loading}>
                  {loading ? "Linking..." : "Link Note"}
               </button>
            </div>
         </div>

         <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }
        .modal {
          background: #141414;
          border: 1px solid #2a2a2a;
          border-radius: 10px;
          width: 420px;
          padding: 0;
          overflow: hidden;
        }
        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid #1e1e1e;
        }
        .modal-header h3 {
          font-size: 15px;
          font-weight: 600;
          color: #e8e6e0;
          margin: 0;
          font-family: 'Georgia', serif;
        }
        .modal-close {
          background: none;
          border: none;
          color: #666;
          font-size: 20px;
          cursor: pointer;
          line-height: 1;
        }
        .modal-close:hover { color: #e8e6e0; }
        .modal-body { padding: 20px; }
        .field-label {
          display: block;
          font-size: 12px;
          color: #666;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .type-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }
        .type-btn {
          padding: 7px;
          border-radius: 5px;
          border: 1px solid #2a2a2a;
          background: transparent;
          color: #666;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.15s;
          font-family: inherit;
        }
        .type-btn:hover { color: #e8e6e0; border-color: #444; }
        .type-btn.active {
          background: #1e1e1e;
          color: #e8e6e0;
          border-color: #555;
        }
        .field-input {
          width: 100%;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 6px;
          padding: 9px 12px;
          color: #e8e6e0;
          font-size: 13px;
          outline: none;
          font-family: monospace;
          box-sizing: border-box;
        }
        .field-input:focus { border-color: #444; }
        .field-error { color: #ef4444; font-size: 12px; margin-top: 6px; }
        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          padding: 16px 20px;
          border-top: 1px solid #1e1e1e;
        }
        .modal-btn {
          padding: 7px 18px;
          border-radius: 6px;
          font-size: 13px;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.15s;
        }
        .modal-btn.cancel {
          background: transparent;
          border: 1px solid #2a2a2a;
          color: #666;
        }
        .modal-btn.cancel:hover { color: #e8e6e0; border-color: #444; }
        .modal-btn.confirm {
          background: #e8e6e0;
          border: none;
          color: #0d0d0d;
          font-weight: 600;
        }
        .modal-btn.confirm:hover { opacity: 0.85; }
        .modal-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>
      </div>
   );
}