"use client";

import { SparkIcon } from "./icons";

const FRAMEWORKS = [
  { id: "react", label: "React" },
  { id: "html", label: "HTML + Tailwind + GSAP" },
  { id: "laravel", label: "Laravel Blade" },
];

export function FrameworkTabs({ value, onChange, gsapEnabled, onToggleGsap }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
      <div className="flex items-center gap-1 rounded-lg border border-[#242832] bg-[#0D1016] p-1">
        {FRAMEWORKS.map((f) => (
          <button
            key={f.id}
            onClick={() => onChange(f.id)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors ${
              value === f.id
                ? "bg-[#D9A441] text-[#0A0C10]"
                : "text-[#8A93A6] hover:text-[#E9EBF0]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <label className="flex items-center gap-1.5 text-[11px] font-mono text-[#8A93A6] cursor-pointer select-none">
        <input
          type="checkbox"
          checked={gsapEnabled}
          onChange={(e) => onToggleGsap(e.target.checked)}
          className="accent-[#D9A441]"
        />
        <SparkIcon width={12} height={12} className="text-[#D9A441]" />
        GSAP entrance animation
      </label>
    </div>
  );
}

export default FrameworkTabs;
