"use client";

import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUilibComponents } from "@/store/selectors/uilibSelectors";
import { openManagePopup } from "@/store/slices/uilibFormSlice";
import { PanelLeftIcon, PlusIcon, SearchIcon } from "./icons";
import { groupAndFilterSpecimens, slugify } from "./utils";

export function CatalogSidebar({ query, onQueryChange, collapsed, onToggleCollapsed }) {
  const dispatch = useDispatch();
  const blocks = useSelector(selectAllUilibComponents);
  const filtered = useMemo(() => groupAndFilterSpecimens(blocks, query), [blocks, query]);

  return (
    <aside
      className={`hidden lg:flex flex-col shrink-0 h-screen sticky top-0 border-r border-[#1B1F27] gap-6 overflow-y-auto transition-[width] duration-200 ${
        collapsed ? "w-16 p-3 items-center" : "w-64 p-6"
      }`}
    >
      <div className={`flex items-center w-full ${collapsed ? "justify-center" : "justify-between"}`}>
        {!collapsed && (
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#D9A441] font-mono mb-1">
              Atelier
            </div>
            <div className="font-serif text-lg">Component Catalog</div>
          </div>
        )}
        <button
          onClick={onToggleCollapsed}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="p-1.5 rounded-md bg-[#171B22] border border-[#242832] text-[#8A93A6] hover:text-[#D9A441] hover:border-[#D9A441]/50 transition-colors shrink-0"
        >
          <PanelLeftIcon width={14} height={14} />
        </button>
      </div>

      {!collapsed && (
        <>
          <div className="relative w-full">
            <SearchIcon width={14} height={14} className="absolute left-2.5 top-2.5 text-[#5C6272]" />
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search specimens…"
              className="w-full pl-8 pr-2 py-2 rounded-md bg-[#12151B] border border-[#242832] text-xs text-[#E9EBF0] placeholder:text-[#5C6272] focus:outline-none focus:border-[#D9A441]/60"
            />
          </div>

          <nav className="flex flex-col gap-4 text-sm w-full">
            {filtered.map(([cat, items]) => (
              <div key={cat}>
                <div className="text-[10px] uppercase tracking-[0.14em] text-[#5C6272] font-mono mb-1.5">
                  {cat}
                </div>
                <div className="flex flex-col gap-0.5">
                  {items.map((b) => (
                    <a
                      key={b.id}
                      href={`#spec-${slugify(b.name)}`}
                      className="text-[#8A93A6] hover:text-[#D9A441] transition-colors py-0.5 truncate"
                    >
                      {b.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </>
      )}

      <button
        onClick={() => dispatch(openManagePopup({ editData: null }))}
        title="New specimen"
        className={`mt-auto flex items-center justify-center gap-1.5 rounded-md bg-[#D9A441] text-[#0A0C10] font-semibold hover:brightness-110 transition-[filter] ${
          collapsed ? "w-9 h-9 p-0" : "w-full px-3 py-2 text-sm"
        }`}
      >
        <PlusIcon width={14} height={14} />
        {!collapsed && "New specimen"}
      </button>
    </aside>
  );
}

export default CatalogSidebar;
