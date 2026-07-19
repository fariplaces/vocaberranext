"use client";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectAllUilibComponents, selectUilibLoading } from "@/store/selectors/uilibSelectors";
import { SpecimenCard } from "./SpecimenCard";
import { groupAndFilterSpecimens } from "./utils";

function RenderSpecimens({ query }) {
  const blocks = useSelector(selectAllUilibComponents);
  const loading = useSelector(selectUilibLoading);

  const filtered = useMemo(
    () => groupAndFilterSpecimens(blocks, query),
    [blocks, query]
  );

  let runningIndex = -1;

  return (
    <>
      {loading && blocks.length === 0 && (
        <p className="text-sm text-[#5C6272] font-mono mb-6">Loading catalog…</p>
      )}

      {!loading && filtered.length === 0 && (
        <p className="text-sm text-[#5C6272] font-mono">
          {query ? `No specimens match "${query}".` : "No specimens yet."}
        </p>
      )}

      {filtered.map(([cat, items]) => (
        <section key={cat} className="mb-4">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-serif text-2xl">{cat}</h2>
            <div className="flex-1 h-px bg-[#1B1F27]" />
            <span className="text-[10px] font-mono text-[#5C6272]">
              {items.length} specimen{items.length !== 1 ? "s" : ""}
            </span>
          </div>
          {items.map((block) => {
            runningIndex += 1;
            return <SpecimenCard key={block.id} block={block} index={runningIndex} />;
          })}
        </section>
      ))}
    </>
  );
}

export default RenderSpecimens;
