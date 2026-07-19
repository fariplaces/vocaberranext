"use client";

import { useState } from "react";
import { PlusIcon, XIcon } from "./icons";
import { KNOWN_ENUMS, inferFieldType } from "./registry";

export function PropEditor({ props, onChange }) {
  const [newKey, setNewKey] = useState("");
  const entries = Object.entries(props || {});

  const updateKey = (key, value) => onChange({ ...props, [key]: value });
  const removeKey = (key) => {
    const next = { ...props };
    delete next[key];
    onChange(next);
  };
  const addKey = () => {
    const k = newKey.trim();
    if (!k || k in props) return;
    onChange({ ...props, [k]: "" });
    setNewKey("");
  };

  return (
    <div className="flex flex-col gap-3">
      {entries.map(([key, value]) => {
        const type = inferFieldType(key, value);
        return (
          <div key={key}>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[10px] uppercase tracking-wide text-[#5C6272] font-mono">
                {key}
              </label>
              <button
                onClick={() => removeKey(key)}
                className="text-[#5C6272] hover:text-[#E2574C] transition-colors"
                aria-label={`Remove ${key}`}
              >
                <XIcon width={12} height={12} />
              </button>
            </div>
            {type === "select" && (
              <select
                value={value}
                onChange={(e) => updateKey(key, e.target.value)}
                className="w-full rounded-md px-2 py-1.5 bg-[#171B22] text-[#E9EBF0] border border-[#242832] text-xs font-mono focus:outline-none focus:border-[#D9A441]/60"
              >
                {KNOWN_ENUMS[key].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}
            {type === "boolean" && (
              <label className="flex items-center gap-2 text-xs text-[#C7CCD8] px-1 py-1">
                <input
                  type="checkbox"
                  checked={!!value}
                  onChange={(e) => updateKey(key, e.target.checked)}
                  className="accent-[#D9A441]"
                />
                {value ? "true" : "false"}
              </label>
            )}
            {type === "number" && (
              <input
                type="number"
                value={value}
                onChange={(e) => updateKey(key, Number(e.target.value))}
                className="w-full rounded-md px-2 py-1.5 bg-[#171B22] text-[#E9EBF0] border border-[#242832] text-xs font-mono focus:outline-none focus:border-[#D9A441]/60"
              />
            )}
            {type === "json" && (
              <textarea
                defaultValue={JSON.stringify(value)}
                rows={Array.isArray(value) ? 4 : 2}
                onBlur={(e) => {
                  try {
                    updateKey(key, JSON.parse(e.target.value));
                  } catch {
                    /* keep previous value until valid JSON */
                  }
                }}
                className="w-full rounded-md px-2 py-1.5 bg-[#171B22] text-[#E9EBF0] border border-[#242832] text-xs font-mono focus:outline-none focus:border-[#D9A441]/60"
              />
            )}
            {type === "text" && (
              <input
                type="text"
                value={value}
                onChange={(e) => updateKey(key, e.target.value)}
                className="w-full rounded-md px-2 py-1.5 bg-[#171B22] text-[#E9EBF0] border border-[#242832] text-xs font-mono focus:outline-none focus:border-[#D9A441]/60"
              />
            )}
          </div>
        );
      })}
      <div className="flex items-center gap-2 pt-2 border-t border-[#1B1F27]">
        <input
          type="text"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addKey();
            }
          }}
          placeholder="add prop key…"
          className="flex-1 rounded-md px-2 py-1.5 bg-[#0D1016] text-[#E9EBF0] border border-[#242832] text-xs font-mono placeholder:text-[#5C6272] focus:outline-none focus:border-[#D9A441]/60"
        />
        <button
          onClick={addKey}
          className="p-1.5 rounded-md bg-[#171B22] border border-[#242832] text-[#8A93A6] hover:text-[#D9A441] hover:border-[#D9A441]/50 transition-colors"
          aria-label="Add prop"
        >
          <PlusIcon width={14} height={14} />
        </button>
      </div>
    </div>
  );
}

export default PropEditor;
