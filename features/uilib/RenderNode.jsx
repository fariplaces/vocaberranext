"use client";

import { AVAILABLE_COMPONENTS } from "./registry";

// Recursive live renderer — walks a { component, props, children, label } tree
// and renders real registry components, atom or compound alike.
export function RenderNode({ component, props, children, label }) {
  const Comp = AVAILABLE_COMPONENTS[component];
  if (!Comp)
    return (
      <span className="text-xs text-[#E2574C] font-mono">
        Unknown component: {component}
      </span>
    );
  const kids =
    children && children.length > 0
      ? children.map((c, i) => <RenderNode key={c.component + i} {...c} />)
      : label ?? undefined;
  // Only pass a `children` prop at all when there's actually content — otherwise
  // React sets `props.children = undefined` on every component, which leaf
  // components spreading `...rest` onto a void DOM element (e.g. <input>) can't
  // accept, even when the value is undefined.
  if (kids === undefined) return <Comp {...props} />;
  return <Comp {...props}>{kids}</Comp>;
}

export default RenderNode;
