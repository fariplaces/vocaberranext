"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "./icons";
import { highlightJSX } from "./codegen";

export function CodeBlock({ code, label }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* no-op */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative rounded-lg border border-[#242832] bg-[#0D1016] overflow-hidden">
      {label && (
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#1B1F27] bg-[#12151B]">
          <span className="text-[10px] tracking-[0.14em] uppercase text-[#5C6272] font-mono">
            {label}
          </span>
        </div>
      )}
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-mono border border-[#242832] bg-[#171B22] text-[#8A93A6] hover:text-[#E9EBF0] hover:border-[#D9A441]/50 transition-colors"
      >
        {copied ? (
          <>
            <CheckIcon width={12} height={12} className="text-[#4FAE7C]" />{" "}
            Copied
          </>
        ) : (
          <>
            <CopyIcon width={12} height={12} /> Copy
          </>
        )}
      </button>
      <pre className="p-4 pr-24 overflow-x-auto text-[12.5px] leading-relaxed font-mono text-[#C7CCD8]">
        <code dangerouslySetInnerHTML={{ __html: highlightJSX(code) }} />
      </pre>
    </div>
  );
}

export default CodeBlock;
