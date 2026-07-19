"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUilibComponents, fetchUilibReadme } from "@/store/actions/uilibActions";
import { openManagePopup } from "@/store/slices/uilibFormSlice";
import { CatalogSidebar } from "./CatalogSidebar";
import { ReadmeSection } from "./ReadmeSection";
import RenderSpecimens from "./RenderSpecimens";
import { ManageSpecimenPopup } from "./ManageSpecimenPopup";
import { DeleteSpecimenPopup } from "./DeleteSpecimenPopup";
import { PlusIcon } from "./icons";

// Atelier UI — a living specimen catalog for interface components.
//
// Design language: "blueprint / spec sheet". Every entry is a specimen — given
// an index tag, a preview (boxed "viewfinder" for atoms/compounds, full-bleed
// for section-level specimens), a fully generic prop console, and a
// live-generated code readout (React / plain HTML+Tailwind+GSAP / Laravel
// Blade) you can copy the instant you change something. Specimens + the
// README are persisted in the DB (UILibComponent / UILibDoc), fetched once on
// mount here and dispatched through store/actions/uilibActions.js.
export function UilibPage() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    dispatch(fetchUilibComponents());
    dispatch(fetchUilibReadme());
  }, [dispatch]);

  return (
    <main className="w-full min-h-screen bg-[#0A0C10] text-[#E9EBF0]">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap");
        .font-serif {
          font-family: "Fraunces", ui-serif, Georgia, serif;
        }
        body,
        main {
          font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
        }
        .font-mono,
        code,
        pre {
          font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
        }
        .tok-tag {
          color: #5b8def;
        }
        .tok-attr {
          color: #d9a441;
        }
        .tok-str {
          color: #4fae7c;
        }
        ::selection {
          background: rgba(217, 164, 65, 0.25);
        }
      `}</style>

      <div className="flex">
        <CatalogSidebar
          query={query}
          onQueryChange={setQuery}
          collapsed={sidebarCollapsed}
          onToggleCollapsed={() => setSidebarCollapsed((v) => !v)}
        />

        <div className="flex-1 min-w-0">
          <div className="w-full mx-auto px-6 py-14">
            <header className="mb-12">
              <div className="flex items-center justify-between gap-4 mb-8 lg:hidden">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#D9A441] font-mono">
                  Atelier
                </div>
                <button
                  onClick={() => dispatch(openManagePopup({ editData: null }))}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#D9A441] text-[#0A0C10] text-xs font-semibold"
                >
                  <PlusIcon width={12} height={12} /> New
                </button>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl leading-[1.1] mb-4">
                Component Catalog
              </h1>
              <p className="text-[#8A93A6] text-base leading-relaxed max-w-xl">
                Every specimen below is fully controllable — adjust any prop and
                the code updates live in React, HTML+Tailwind+GSAP, or Laravel
                Blade, ready to copy. Atoms, compounds, animated specimens, and
                full sections all live in the same registry.
              </p>
            </header>

            <ReadmeSection />
            <RenderSpecimens query={query} />
          </div>
        </div>
      </div>

      <ManageSpecimenPopup />
      <DeleteSpecimenPopup />
    </main>
  );
}

export default UilibPage;
