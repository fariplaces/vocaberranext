"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { linkNote } from "@/store/actions/notesActions";
import { fetchCategories, fetchSkills, fetchTopics } from "@/store/actions/skillActions";

// Target types that we can actually pull list data for
const TARGET_TYPES = ["TOPIC", "SKILL", "CATEGORY", "TASKS"];

export default function LinkNoteModal({ noteId, onClose }) {
   const dispatch = useDispatch();
   const [targetType, setTargetType] = useState("TOPIC");
   const [targetId, setTargetId] = useState("");
   const [loading, setLoading] = useState(false);
   const [fetching, setFetching] = useState(false);
   const [error, setError] = useState("");

   // Read the arrays from your skill slice
   const { topics = [], categories = [], skills = [] } = useSelector(s => s.skill);

   console.log(categories);
   // Determine which array to use in the selector based on current target type
   const getTargetArray = () => {
      switch (targetType) {
         case "TOPIC": return topics;
         case "SKILL": return skills;
         case "CATEGORY": return categories;
         default: return []; // For Exercise, Lesson, Task if you don't have endpoints yet
      }
   };

   // Trigger the fetch manually when user clicks search/fetch button
   const handleTriggerFetch = async () => {
      setFetching(true);
      setError("");
      try {
         if (targetType === "TOPIC") await dispatch(fetchTopics()).unwrap();
         if (targetType === "SKILL") await dispatch(fetchSkills()).unwrap();
         if (targetType === "CATEGORY") await dispatch(fetchCategories()).unwrap();
      } catch (err) {
         setError(`Failed to fetch ${targetType.toLowerCase()} list.`);
      } finally {
         setFetching(false);
      }
   };

   const handleLink = async () => {
      if (!targetId) return setError("Please select or enter a valid Target ID");
      setLoading(true);
      try {
         await dispatch(linkNote({ id: noteId, targetId, targetType })).unwrap();
         onClose();
      } catch (err) {
         setError("Failed to link note");
      } finally {
         setLoading(false);
      }
   };

   const currentOptions = getTargetArray();
   // console.log(currentOptions);

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
                        onClick={() => {
                           setTargetType(t);
                           setTargetId(""); // Reset selection on switch
                           setError("");
                        }}
                     >
                        {t}
                     </button>
                  ))}
               </div>

               <div className="field-header" style={{ marginTop: 16 }}>
                  <label className="field-label">Target ID</label>
                  {["TOPIC", "SKILL", "CATEGORY"].includes(targetType) && (
                     <button
                        className="fetch-btn"
                        onClick={handleTriggerFetch}
                        disabled={fetching}
                     >
                        {fetching ? "Fetching..." : "Fetch List"}
                     </button>
                  )}
               </div>

               {/* Use a dropdown if we have fetched list items, fallback to input if empty */}
               {currentOptions.length > 0 ? (
                  <>
                     {/* {targetType === "SKILL" &&
                        <CustomDropdown
                           items={currentOptions}
                           value={targetId}
                           placeholder={`Select a ${targetType.toLowerCase()}...`}
                           onChange={(id) => {
                              setTargetId(id);
                              setError("");
                           }}
                           columns={[
                              { key: "title", label: "Title" },
                              { key: "displaySkill", label: "Skill" },
                           ]}
                           getLabel={(item) => `${item.title} - (${item.displaySkill})`}
                        />
                     }
                     {targetType === "CATEGORY" &&
                        <CustomDropdown
                           items={currentOptions}
                           value={targetId}
                           placeholder={`Select a ${targetType.toLowerCase()}...`}
                           onChange={(id) => {
                              setTargetId(id);
                              setError("");
                           }}
                           columns={
                              targetType === "CATEGORY"
                                 ? [
                                    { key: "title", label: "Title" },
                                    { key: "skill.title", label: "Skill" }, // nested property
                                 ]
                                 : [
                                    { key: "title", label: "Title" },
                                    { key: "displaySkill", label: "Skill" }, // flat property
                                 ]
                           }
                           getLabel={(item) =>
                              targetType === "CATEGORY"
                                 ? `${item.title} - (${item.skill.title})`
                                 : `${item.title} - (${item.skill.title})`
                           }
                        />
                     }
                     {targetType === "TOPIC" &&
                        <CustomDropdown
                           items={currentOptions}
                           value={targetId}
                           placeholder={`Select a ${targetType.toLowerCase()}...`}
                           onChange={(id) => {
                              setTargetId(id);
                              setError("");
                           }}
                           columns={[
                              { key: "title", label: "Title" },
                              { key: "displaySkill", label: "Skill" },
                           ]}
                           getLabel={(item) => `${item.title} - (${item.displaySkill})`}
                        />
                     } */}
                     <select
                        className="field-input"
                        value={targetId}
                        onChange={(e) => {
                           setTargetId(e.target.value);
                           setError("");
                        }}
                     >
                        <option value="">Select a {targetType.toLowerCase()}...</option>
                        {currentOptions.map((item) => (
                           <option key={item.id} value={item.id}>
                              {item.title + " - (" + item.displaySkill + ")"}
                           </option>
                        ))}
                     </select>
                  </>
               ) : (
                  <input
                     className="field-input"
                     placeholder={`Enter custom ${targetType.toLowerCase()} ID manually...`}
                     value={targetId}
                     onChange={(e) => {
                        setTargetId(e.target.value);
                        setError("");
                     }}
                  />
               )}

               {error && <p className="field-error">{error}</p>}
            </div>

            <div className="modal-footer">
               <button className="modal-btn cancel" onClick={onClose}>Cancel</button>
               <button className="modal-btn confirm" onClick={handleLink} disabled={loading || !targetId}>
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
         .field-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
         }
         .field-label {
            display: block;
            font-size: 12px;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 0.08em;
         }
         .fetch-btn {
            background: transparent;
            border: 1px solid #3a3a3a;
            color: #e8e6e0;
            font-size: 11px;
            padding: 3px 8px;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.1s;
         }
         .fetch-btn:hover { border-color: #555; background: #1a1a1a; }
         .fetch-btn:disabled { opacity: 0.5; cursor: not-allowed; }
         .type-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
            margin-bottom: 8px;
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
            box-sizing: border-box;
         }
         select.field-input {
            appearance: none;
            cursor: pointer;
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