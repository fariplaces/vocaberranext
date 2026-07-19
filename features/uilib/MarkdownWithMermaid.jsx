"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { CodeBlock } from "./CodeBlock";

const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false });

function MermaidBlock({ children }) {
  const ref = useRef();
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    import("mermaid")
      .then(async (m) => {
        try {
          m.default.initialize({
            theme: "dark",
            startOnLoad: false,
            themeVariables: {
              primaryColor: "#D9A441",
              primaryTextColor: "#0A0C10",
              lineColor: "#5C6272",
              background: "#0D1016",
            },
          });
          // mermaid v10+ render() is promise-based — it returns { svg, bindFunctions }
          // rather than taking a (svgCode) => {} callback + container as its 3rd/4th args.
          const { svg, bindFunctions } = await m.default.render(
            "mermaid-" + Math.random().toString(36).slice(2),
            children
          );
          if (alive && ref.current) {
            ref.current.innerHTML = svg;
            bindFunctions?.(ref.current);
          }
        } catch (e) {
          if (alive) setError(e.message || "Mermaid render error.");
        }
      })
      .catch((e) => {
        if (alive) setError(e.message || "Failed to load mermaid.js");
      });
    return () => {
      alive = false;
    };
  }, [children]);

  return (
    <div className="w-full overflow-x-auto rounded-lg bg-[#0D1016] p-4 my-4 border border-[#1B1F27]">
      {error ? (
        <div className="text-[#E2574C] text-xs font-mono">{error}</div>
      ) : (
        <div ref={ref} />
      )}
    </div>
  );
}

export function MarkdownWithMermaid({ children }) {
  return (
    <ReactMarkdown
      components={{
        h1: (p) => (
          <h1 className="font-serif text-2xl text-[#E9EBF0] mt-6 mb-3" {...p} />
        ),
        h2: (p) => (
          <h2
            className="font-serif text-xl text-[#E9EBF0] mt-6 mb-2.5"
            {...p}
          />
        ),
        h3: (p) => (
          <h3
            className="font-serif text-base text-[#E9EBF0] mt-4 mb-2"
            {...p}
          />
        ),
        p: (p) => (
          <p className="text-sm text-[#8A93A6] leading-relaxed mb-3" {...p} />
        ),
        ul: (p) => (
          <ul
            className="list-disc list-inside text-sm text-[#8A93A6] mb-3 space-y-1"
            {...p}
          />
        ),
        li: (p) => <li {...p} />,
        strong: (p) => (
          <strong className="text-[#C7CCD8] font-semibold" {...p} />
        ),
        hr: () => <hr className="border-[#1B1F27] my-6" />,
        a: (p) => (
          <a
            className="text-[#D9A441] underline underline-offset-2 hover:text-[#e6b662]"
            {...p}
          />
        ),
        code({ inline, className, children: codeChildren }) {
          if (className === "language-mermaid")
            return <MermaidBlock>{String(codeChildren).trim()}</MermaidBlock>;
          if (inline)
            return (
              <code className="px-1.5 py-0.5 rounded bg-[#171B22] text-[#D9A441] text-[0.85em] font-mono">
                {codeChildren}
              </code>
            );
          return <CodeBlock code={String(codeChildren).trim()} />;
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

export default MarkdownWithMermaid;
