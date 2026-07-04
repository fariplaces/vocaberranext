import React from "react";
import NotesSidebar from "@/components/Notes/NotesSidebar";
import NotesEditor from "@/components/Notes/NotesEditor";
import { useDispatch, useSelector } from "react-redux";
import { selectNotesMetaData } from "@/store/selectors/notesSelectors";
import { setActiveNote } from "@/store/slices/notesSlice";
import { deleteNote } from "@/store/actions/notesActions";
import { X } from "lucide-react";

const ReadNotes = ({ notes, setIsOpen }) => {
  const dispatch = useDispatch();
  const { activeNote, loading } = useSelector(selectNotesMetaData);

  return (
    <div className="absolute flex justify-center items-center inset-0 bg-white/10 backdrop-blur-sm transition-all duration-300">
      <div className="notes-page max-w-[90vw] mx-auto w-full max-h-[calc(100vh-2rem)] overflow-hidden rounded-md">
        {/* Body */}
        <div className="notes-body">
          <NotesSidebar
            notes={notes}
            activeNote={activeNote}
            loading={loading}
            onSelect={(note) => dispatch(setActiveNote(note))}
            onDelete={(id) => dispatch(deleteNote(id))}
          />
          <div className="notes-editor-area">
            <X
              size={20}
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            {activeNote ? (
              <NotesEditor note={activeNote} />
            ) : (
              <div className="notes-empty">
                <p>Select a note ...</p>
                {/* <button
                  className="new-note-btn"
                  //  onClick={handleNewNote}
                >
                  + New Note
                </button> */}
              </div>
            )}
          </div>
        </div>

        <style jsx>{`
          .notes-page {
            display: flex;
            flex-direction: column;
            height: 100vh;
            background: #0d0d0d;
            color: #e8e6e0;
            font-family: "Georgia", serif;
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
            font-family: "Georgia", serif;
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
          .tab-btn:hover {
            color: #e8e6e0;
            background: #1a1a1a;
          }
          .tab-btn.active {
            color: #e8e6e0;
            background: #1e1e1e;
          }
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
          .new-note-btn:hover {
            opacity: 0.85;
          }
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
          .notes-empty p {
            font-size: 15px;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ReadNotes;
