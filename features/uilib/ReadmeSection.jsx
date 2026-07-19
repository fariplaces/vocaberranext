"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUilibReadme } from "@/store/selectors/uilibSelectors";
import { updateUilibReadme } from "@/store/actions/uilibActions";
import { MarkdownWithMermaid } from "./MarkdownWithMermaid";

export function ReadmeSection() {
  const dispatch = useDispatch();
  const readmeFromStore = useSelector(selectUilibReadme);

  const [readme, setReadme] = useState("");
  const [editing, setEditing] = useState(false);

  // The textarea is an editable draft — only synced from the store when not
  // actively being edited, so a save-in-flight fetch can't clobber it.
  useEffect(() => {
    if (!editing) setReadme(readmeFromStore);
  }, [readmeFromStore, editing]);

  const handleSave = () => {
    dispatch(updateUilibReadme({ content: readme }));
    setEditing(false);
  };

  return (
    <>
      <div className="flex items-center gap-4 mt-5">
        <button
          onClick={() => setEditing((v) => !v)}
          className="text-xs font-mono text-[#5C6272] hover:text-[#D9A441] transition-colors underline underline-offset-4 decoration-dotted"
        >
          {editing ? "Preview documentation" : "Edit documentation"}
        </button>
        {editing && (
          <button
            onClick={handleSave}
            className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#D9A441] text-[#0A0C10] font-semibold hover:brightness-110 transition-[filter]"
          >
            Save
          </button>
        )}
      </div>

      <section className="mb-14 mt-5">
        {editing ? (
          <textarea
            value={readme}
            onChange={(e) => setReadme(e.target.value)}
            rows={16}
            className="w-full bg-[#0D1016] text-[#E9EBF0] border border-[#242832] rounded-lg p-4 font-mono text-xs leading-relaxed"
          />
        ) : (
          <div className="rounded-2xl border border-[#1B1F27] bg-[#12151B] p-7">
            <MarkdownWithMermaid>{readme}</MarkdownWithMermaid>
          </div>
        )}
      </section>
    </>
  );
}

export default ReadmeSection;
