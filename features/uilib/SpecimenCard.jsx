"use client";

import { useDispatch } from "react-redux";
import { openManagePopup, openDeletePopup } from "@/store/slices/uilibFormSlice";
import { ComponentPlayground } from "./ComponentPlayground";
import { MarkdownWithMermaid } from "./MarkdownWithMermaid";
import { CodeBlock } from "./CodeBlock";
import { ChevronIcon, PencilIcon, TrashIcon } from "./icons";
import { slugify } from "./utils";

export function SpecimenCard({ block, index }) {
  const dispatch = useDispatch();
  const childImports = (block.children || [])
    .map((c) => c.importStatement)
    .filter(Boolean);

  return (
    <div
      id={`spec-${slugify(block.name)}`}
      className="scroll-mt-24 rounded-2xl border border-[#1B1F27] bg-[#12151B] p-6 md:p-8 mb-10 relative group"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="text-[10px] uppercase tracking-[0.14em] text-[#D9A441] font-mono">
              Spec — {String(index + 1).padStart(2, "0")}
            </div>
            {block.engine && block.engine !== "css" && (
              <span className="px-1.5 py-0.5 rounded-full bg-[#5B8DEF]/15 text-[#5B8DEF] text-[9px] font-mono uppercase tracking-wide">
                {block.engine}
              </span>
            )}
            {block.layout === "full" && (
              <span className="px-1.5 py-0.5 rounded-full bg-[#D9A441]/15 text-[#D9A441] text-[9px] font-mono uppercase tracking-wide">
                section
              </span>
            )}
          </div>
          <h3 className="font-serif text-xl text-[#E9EBF0]">{block.name}</h3>
          <p className="text-sm text-[#8A93A6] mt-1 max-w-md">
            {block.description}
          </p>
        </div>
        <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => dispatch(openManagePopup({ editData: block }))}
            title="Edit"
            className="p-1.5 rounded-md bg-[#171B22] border border-[#242832] text-[#8A93A6] hover:text-[#5B8DEF] hover:border-[#5B8DEF]/40"
          >
            <PencilIcon width={14} height={14} />
          </button>
          <button
            onClick={() => dispatch(openDeletePopup(block))}
            title="Delete"
            className="p-1.5 rounded-md bg-[#171B22] border border-[#242832] text-[#8A93A6] hover:text-[#E2574C] hover:border-[#E2574C]/40"
          >
            <TrashIcon width={14} height={14} />
          </button>
        </div>
      </div>

      <ComponentPlayground block={block} />

      {(block.detailDocs || block.implementation || block.importStatement) && (
        <div className="mt-8 pt-6 border-t border-[#1B1F27] flex flex-col gap-5">
          {block.detailDocs && (
            <details className="group/d" open>
              <summary className="text-[11px] uppercase tracking-[0.14em] text-[#5C6272] font-mono cursor-pointer select-none flex items-center gap-1.5">
                <ChevronIcon
                  width={12}
                  height={12}
                  className="transition-transform group-open/d:rotate-90"
                />
                Documentation
              </summary>
              <div className="mt-3 pl-4 border-l border-[#1B1F27]">
                <MarkdownWithMermaid>{block.detailDocs}</MarkdownWithMermaid>
              </div>
            </details>
          )}

          {block.importStatement && (
            <details className="group/i">
              <summary className="text-[11px] uppercase tracking-[0.14em] text-[#5C6272] font-mono cursor-pointer select-none flex items-center gap-1.5">
                <ChevronIcon
                  width={12}
                  height={12}
                  className="transition-transform group-open/i:rotate-90"
                />
                Imports
              </summary>
              <div className="mt-3">
                <CodeBlock
                  code={[block.importStatement, ...childImports].join("\n")}
                />
              </div>
            </details>
          )}

          {block.implementation && (
            <details className="group/u">
              <summary className="text-[11px] uppercase tracking-[0.14em] text-[#5C6272] font-mono cursor-pointer select-none flex items-center gap-1.5">
                <ChevronIcon
                  width={12}
                  height={12}
                  className="transition-transform group-open/u:rotate-90"
                />
                Real-world usage
              </summary>
              <div className="mt-3">
                <CodeBlock code={block.implementation} />
              </div>
            </details>
          )}
        </div>
      )}
    </div>
  );
}

export default SpecimenCard;
