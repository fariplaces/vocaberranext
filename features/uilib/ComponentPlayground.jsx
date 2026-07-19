"use client";

import { useState, useEffect, useMemo } from "react";
import { RenderNode } from "./RenderNode";
import { PropEditor } from "./PropEditor";
import { FrameworkTabs } from "./FrameworkTabs";
import { CodeBlock } from "./CodeBlock";
import {
  buildHTMLDocument,
  buildBladeUsage,
  buildBladeComponentStub,
  buildJSX,
  reactGSAPWrapper,
} from "./codegen";

// Specimen playground — preview (boxed "viewfinder" for atoms/compounds, or a
// full-bleed frame for section-level specimens) + generic console + live code.
export function ComponentPlayground({ block }) {
  const isFullLayout = block.layout === "full";

  const [rootProps, setRootProps] = useState(block.props || {});
  const [label, setLabel] = useState(block.label ?? "");
  const [childState, setChildState] = useState(() =>
    (block.children || []).map((c) => ({
      component: c.component,
      props: c.props || {},
    }))
  );
  const [framework, setFramework] = useState("react");
  const [gsapEnabled, setGsapEnabled] = useState(false);

  useEffect(() => {
    setRootProps(block.props || {});
    setLabel(block.label ?? "");
    setChildState(
      (block.children || []).map((c) => ({
        component: c.component,
        props: c.props || {},
      }))
    );
  }, [block]);

  const rootNode = useMemo(
    () => ({ component: block.component, props: rootProps, children: childState, label }),
    [block.component, rootProps, childState, label]
  );

  const generatedCode = useMemo(() => {
    if (framework === "html") {
      return buildHTMLDocument(rootNode, gsapEnabled);
    }
    if (framework === "laravel") {
      const usage = buildBladeUsage(rootNode);
      const stub = buildBladeComponentStub(block.component, gsapEnabled);
      return `{{-- Usage anywhere in a Blade view --}}\n${usage}\n\n${stub}`;
    }
    const jsx = buildJSX(block.component, rootProps, childState, label, 0, gsapEnabled);
    return gsapEnabled ? reactGSAPWrapper(block.component, jsx) : jsx;
  }, [framework, gsapEnabled, rootNode, block.component, rootProps, childState, label]);

  const codeLabel =
    framework === "html"
      ? "html + tailwind + gsap — copy into wordpress / any static page"
      : framework === "laravel"
      ? "laravel blade — component usage + view stub"
      : "live jsx — reflects the console above";

  const preview = (
    <RenderNode
      component={block.component}
      props={rootProps}
      children={childState}
      label={label}
    />
  );

  const consolePane = (
    <div className="w-full lg:flex-1 mt-5 lg:mt-0 flex flex-col gap-5">
      <div>
        <div className="text-[10px] uppercase tracking-[0.14em] text-[#5C6272] font-mono mb-2">
          Props · {block.component}
        </div>
        <PropEditor props={rootProps} onChange={setRootProps} />
      </div>

      {childState.length === 0 && (
        <div>
          <label className="text-[10px] uppercase tracking-[0.14em] text-[#5C6272] font-mono block mb-1.5">
            Text content
          </label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full rounded-md px-2 py-1.5 bg-[#171B22] text-[#E9EBF0] border border-[#242832] text-xs font-mono focus:outline-none focus:border-[#D9A441]/60"
            placeholder="(none)"
          />
        </div>
      )}

      {childState.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="text-[10px] uppercase tracking-[0.14em] text-[#5C6272] font-mono">
            Compound parts
          </div>
          {childState.map((c, i) => (
            <div
              key={i}
              className="rounded-lg border border-[#1B1F27] bg-[#0D1016]/60 p-3"
            >
              <div className="text-[11px] font-mono text-[#D9A441] mb-2">
                {c.component}
              </div>
              <PropEditor
                props={c.props}
                onChange={(next) =>
                  setChildState((prev) =>
                    prev.map((item, idx) =>
                      idx === i ? { ...item, props: next } : item
                    )
                  )
                }
              />
            </div>
          ))}
        </div>
      )}

      <FrameworkTabs
        value={framework}
        onChange={setFramework}
        gsapEnabled={gsapEnabled}
        onToggleGsap={setGsapEnabled}
      />
      <CodeBlock code={generatedCode} label={codeLabel} />
    </div>
  );

  if (isFullLayout) {
    return (
      <div className="flex flex-col gap-6">
        <div className="w-full rounded-xl border border-[#1B1F27] overflow-hidden">
          {preview}
        </div>
        {consolePane}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0 lg:gap-8">
      {/* Preview viewfinder */}
      <div className="w-full lg:w-[320px] shrink-0">
        <div className="relative rounded-xl border border-[#1B1F27] bg-[radial-gradient(circle_at_1px_1px,rgba(217,164,65,0.06)_1px,transparent_0)] bg-[length:16px_16px] bg-[#0D1016] flex items-center justify-center min-h-[160px] p-8">
          {/* corner brackets */}
          {[
            "top-2 left-2 border-t border-l",
            "top-2 right-2 border-t border-r",
            "bottom-2 left-2 border-b border-l",
            "bottom-2 right-2 border-b border-r",
          ].map((pos, i) => (
            <span
              key={i}
              className={`absolute ${pos} w-3 h-3 border-[#D9A441]/50`}
            />
          ))}
          {preview}
        </div>
      </div>

      {consolePane}
    </div>
  );
}

export default ComponentPlayground;
