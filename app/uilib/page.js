"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";

/* ============================================================================
   ATELIER UI — a living specimen catalog for interface components.

   Design language: "blueprint / spec sheet". Every entry is a specimen —
   given an index tag, a preview viewfinder with corner brackets, a fully
   generic prop console, and a live-generated code readout (React / plain
   HTML+Tailwind+GSAP / Laravel Blade) you can copy the instant you change
   something. The registry (AVAILABLE_COMPONENTS + DEFAULT_BLOCKS) is
   intentionally generic: atoms, compounds (a component built from named
   child components), and full blocks (compounds nested inside compounds)
   all use the same shape.

   PHASE 1 of the multi-framework roadmap (per your own prioritization):
     1. Bugfix + sidebar collapse + multi-framework code tabs      ✅ this pass
     2. Plain HTML/CSS/Tailwind + GSAP output                      ✅ this pass
     3. GSAP + Motion + Three.js/WebGL wired into specimens        ⏳ GSAP done,
        Motion + Three.js/WebGL specimens are next (see bottom note in chat)
   ============================================================================ */

/* ----------------------------- Design tokens ----------------------------- */
const T = {
  void: "#0A0C10",
  panel: "#12151B",
  panel2: "#171B22",
  code: "#0D1016",
  border: "#242832",
  borderSoft: "#1B1F27",
  text: "#E9EBF0",
  muted: "#8A93A6",
  faint: "#5C6272",
  accent: "#D9A441", // brass — signature
  accent2: "#5B8DEF", // cyan — secondary
  danger: "#E2574C",
  success: "#4FAE7C",
};

/* --------------------------------- Icons ---------------------------------- */
const iconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const TrashIcon = (p) => (
  <svg {...iconProps} {...p}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);
const CopyIcon = (p) => (
  <svg {...iconProps} {...p}>
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);
const CheckIcon = (p) => (
  <svg {...iconProps} {...p}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const PencilIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);
const PlusIcon = (p) => (
  <svg {...iconProps} {...p}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const XIcon = (p) => (
  <svg {...iconProps} {...p}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const SearchIcon = (p) => (
  <svg {...iconProps} {...p}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const ChevronIcon = (p) => (
  <svg {...iconProps} {...p}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const PanelLeftIcon = (p) => (
  <svg {...iconProps} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="9" y1="3" x2="9" y2="21" />
  </svg>
);
const SparkIcon = (p) => (
  <svg {...iconProps} {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
  </svg>
);

/* ============================================================================
   ATOMS + COMPOUND PARTS — the renderable registry.
   Add anything here; the playground will pick up its props automatically.
   ============================================================================ */
const AVAILABLE_COMPONENTS = {
  DemoButton: ({
    children,
    variant = "default",
    rounded = "md",
    stroke = false,
    hover = false,
    bgColor = "black",
    data,
    ...rest
  }) => {
    const bgBase =
      bgColor === "blue"
        ? "bg-[#5B8DEF] text-[#0A0C10]"
        : bgColor === "white"
        ? "bg-[#E9EBF0] text-[#0A0C10]"
        : "bg-[#0A0C10] text-[#E9EBF0]";
    const border = stroke
      ? "border-2 border-[#D9A441]"
      : "border border-transparent";
    const round =
      rounded === "full"
        ? "rounded-full"
        : rounded === "lg"
        ? "rounded-lg"
        : rounded === "sm"
        ? "rounded-sm"
        : rounded === "none"
        ? "rounded-none"
        : "rounded-md";
    const hoverClass = hover ? "hover:brightness-110 transition-[filter]" : "";
    let variantClass = "";
    switch (variant) {
      case "danger":
        variantClass = "!bg-[#E2574C] !text-white";
        break;
      case "primary":
        variantClass = "!bg-[#D9A441] !text-[#0A0C10]";
        break;
      case "outline":
        variantClass =
          "!bg-transparent border !border-[#8A93A6] !text-[#E9EBF0]";
        break;
      default:
        break;
    }
    return (
      <button
        className={[
          "px-4 py-2 font-medium text-sm",
          bgBase,
          border,
          round,
          hoverClass,
          variantClass,
        ]
          .filter(Boolean)
          .join(" ")}
        data-demo={data ? JSON.stringify(data) : undefined}
        {...rest}
      >
        {children ?? "Click me"}
      </button>
    );
  },

  MUISwitch: ({
    variant = "default",
    rounded = "md",
    stroke = false,
    hover = false,
    data,
    children,
    ...rest
  }) => (
    <label className="flex items-center gap-2 text-sm text-[#C7CCD8]">
      <span>Switch</span>
      <input
        type="checkbox"
        className={[
          "accent-[#D9A441]",
          rounded === "full" ? "rounded-full" : "rounded",
          stroke ? "outline outline-2 outline-[#D9A441]" : "",
          hover ? "hover:scale-110 transition-transform" : "",
          variant === "danger" ? "accent-[#E2574C]" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        data-demo={data ? JSON.stringify(data) : undefined}
        {...rest}
      />
    </label>
  ),

  DemoChild: ({ label = "I am child!" }) => (
    <span className="text-[#D9A441] text-sm font-mono">{label}</span>
  ),

  Badge: ({ label = "Badge", tone = "default" }) => {
    const toneClass =
      {
        default: "bg-[#242832] text-[#C7CCD8]",
        info: "bg-[#5B8DEF]/15 text-[#5B8DEF]",
        success: "bg-[#4FAE7C]/15 text-[#4FAE7C]",
        warning: "bg-[#D9A441]/15 text-[#D9A441]",
        danger: "bg-[#E2574C]/15 text-[#E2574C]",
      }[tone] || "bg-[#242832] text-[#C7CCD8]";
    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wide ${toneClass}`}
      >
        {label}
      </span>
    );
  },

  Input: ({
    label = "Label",
    placeholder = "",
    type = "text",
    disabled = false,
  }) => (
    <label className="flex flex-col gap-1.5 text-xs text-[#8A93A6] w-56">
      {label}
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className="rounded-md px-3 py-2 bg-[#0D1016] border border-[#242832] text-[#E9EBF0] text-sm placeholder:text-[#5C6272] focus:outline-none focus:border-[#D9A441]/60 disabled:opacity-40"
      />
    </label>
  ),

  Alert: ({ tone = "info", title = "Heads up", message = "" }) => {
    const toneClass =
      {
        info: {
          border: "border-[#5B8DEF]/40",
          bg: "bg-[#5B8DEF]/[0.08]",
          dot: "bg-[#5B8DEF]",
        },
        success: {
          border: "border-[#4FAE7C]/40",
          bg: "bg-[#4FAE7C]/[0.08]",
          dot: "bg-[#4FAE7C]",
        },
        warning: {
          border: "border-[#D9A441]/40",
          bg: "bg-[#D9A441]/[0.08]",
          dot: "bg-[#D9A441]",
        },
        danger: {
          border: "border-[#E2574C]/40",
          bg: "bg-[#E2574C]/[0.08]",
          dot: "bg-[#E2574C]",
        },
      }[tone] || {};
    return (
      <div
        className={`w-72 rounded-lg border ${toneClass.border} ${toneClass.bg} p-3.5`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className={`w-1.5 h-1.5 rounded-full ${toneClass.dot}`} />
          <span className="text-sm font-semibold text-[#E9EBF0]">{title}</span>
        </div>
        {message && (
          <p className="text-xs text-[#8A93A6] leading-relaxed">{message}</p>
        )}
      </div>
    );
  },

  Card: ({ children, variant = "default", padding = "md" }) => {
    const pad = padding === "lg" ? "p-6" : padding === "sm" ? "p-3" : "p-4";
    const variantClass =
      variant === "elevated"
        ? "shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)] border-[#242832]"
        : variant === "outlined"
        ? "border-[#D9A441]/40"
        : "border-[#242832]";
    return (
      <div
        className={`w-72 rounded-xl border bg-[#0D1016] ${variantClass} ${pad} flex flex-col gap-3`}
      >
        {children}
      </div>
    );
  },
  CardHeader: ({ eyebrow, title = "Title" }) => (
    <div>
      {eyebrow && (
        <div className="text-[10px] tracking-[0.14em] uppercase text-[#D9A441] font-mono mb-1">
          {eyebrow}
        </div>
      )}
      <div className="text-base font-semibold text-[#E9EBF0]">{title}</div>
    </div>
  ),
  CardBody: ({ text = "" }) => (
    <p className="text-xs text-[#8A93A6] leading-relaxed">{text}</p>
  ),
  CardFooter: ({ price, ctaLabel = "Choose", badge }) => (
    <div className="flex items-center justify-between pt-3 border-t border-[#1B1F27]">
      <div className="flex items-center gap-2">
        {price && (
          <span className="text-sm font-semibold text-[#E9EBF0]">{price}</span>
        )}
        {badge && (
          <span className="px-2 py-0.5 rounded-full bg-[#D9A441]/15 text-[#D9A441] text-[10px] font-mono">
            {badge}
          </span>
        )}
      </div>
      <button className="px-3 py-1.5 rounded-md bg-[#D9A441] text-[#0A0C10] text-xs font-semibold hover:brightness-110 transition-[filter]">
        {ctaLabel}
      </button>
    </div>
  ),
};

/* ------------------------- known enums for the console ------------------------- */
const KNOWN_ENUMS = {
  variant: ["default", "primary", "danger", "outline"],
  rounded: ["none", "sm", "md", "lg", "full"],
  bgColor: ["black", "blue", "white"],
  tone: ["default", "info", "success", "warning", "danger"],
  padding: ["sm", "md", "lg"],
  type: ["text", "email", "password"],
};

function inferFieldType(key, value) {
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return "number";
  if (KNOWN_ENUMS[key]) return "select";
  if (value && typeof value === "object") return "json";
  return "text";
}

/* ============================================================================
   Live code generation — React / plain HTML+Tailwind+GSAP / Laravel Blade.
   All three read from the SAME live prop state, so switching frameworks or
   editing a prop always keeps every tab in sync with what's on screen.
   ============================================================================ */

/* ---- shared class-resolution logic (mirrors AVAILABLE_COMPONENTS exactly) ---- */
function resolveClasses(component, props = {}) {
  switch (component) {
    case "DemoButton": {
      const {
        variant = "default",
        rounded = "md",
        stroke = false,
        hover = false,
        bgColor = "black",
      } = props;
      const bgBase =
        bgColor === "blue"
          ? "bg-[#5B8DEF] text-[#0A0C10]"
          : bgColor === "white"
          ? "bg-[#E9EBF0] text-[#0A0C10]"
          : "bg-[#0A0C10] text-[#E9EBF0]";
      const border = stroke
        ? "border-2 border-[#D9A441]"
        : "border border-transparent";
      const round =
        { full: "rounded-full", lg: "rounded-lg", sm: "rounded-sm", none: "rounded-none" }[
          rounded
        ] || "rounded-md";
      const hoverClass = hover ? "hover:brightness-110 transition-[filter]" : "";
      const variantClass =
        variant === "danger"
          ? "!bg-[#E2574C] !text-white"
          : variant === "primary"
          ? "!bg-[#D9A441] !text-[#0A0C10]"
          : variant === "outline"
          ? "!bg-transparent border !border-[#8A93A6] !text-[#E9EBF0]"
          : "";
      return ["px-4 py-2 font-medium text-sm", bgBase, border, round, hoverClass, variantClass]
        .filter(Boolean)
        .join(" ");
    }
    case "MUISwitch": {
      const { variant = "default", rounded = "md", stroke = false, hover = false } = props;
      return [
        "accent-[#D9A441]",
        rounded === "full" ? "rounded-full" : "rounded",
        stroke ? "outline outline-2 outline-[#D9A441]" : "",
        hover ? "hover:scale-110 transition-transform" : "",
        variant === "danger" ? "accent-[#E2574C]" : "",
      ]
        .filter(Boolean)
        .join(" ");
    }
    case "Badge": {
      const { tone = "default" } = props;
      const toneClass =
        {
          default: "bg-[#242832] text-[#C7CCD8]",
          info: "bg-[#5B8DEF]/15 text-[#5B8DEF]",
          success: "bg-[#4FAE7C]/15 text-[#4FAE7C]",
          warning: "bg-[#D9A441]/15 text-[#D9A441]",
          danger: "bg-[#E2574C]/15 text-[#E2574C]",
        }[tone] || "bg-[#242832] text-[#C7CCD8]";
      return `inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wide ${toneClass}`;
    }
    case "Alert": {
      const { tone = "info" } = props;
      const toneClass =
        {
          info: "border-[#5B8DEF]/40 bg-[#5B8DEF]/[0.08]",
          success: "border-[#4FAE7C]/40 bg-[#4FAE7C]/[0.08]",
          warning: "border-[#D9A441]/40 bg-[#D9A441]/[0.08]",
          danger: "border-[#E2574C]/40 bg-[#E2574C]/[0.08]",
        }[tone] || "";
      return `w-72 rounded-lg border ${toneClass} p-3.5`;
    }
    case "Card": {
      const { variant = "default", padding = "md" } = props;
      const pad = padding === "lg" ? "p-6" : padding === "sm" ? "p-3" : "p-4";
      const variantClass =
        variant === "elevated"
          ? "shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)] border-[#242832]"
          : variant === "outlined"
          ? "border-[#D9A441]/40"
          : "border-[#242832]";
      return `w-72 rounded-xl border bg-[#0D1016] ${variantClass} ${pad} flex flex-col gap-3`;
    }
    default:
      return "";
  }
}

function toneDotClass(tone) {
  return (
    {
      info: "bg-[#5B8DEF]",
      success: "bg-[#4FAE7C]",
      warning: "bg-[#D9A441]",
      danger: "bg-[#E2574C]",
    }[tone] || "bg-[#5B8DEF]"
  );
}

/* ---- React JSX generator (existing behavior, kept for the "React" tab) ---- */
function serializeAttr(key, value) {
  if (value === undefined || key === "") return null;
  if (typeof value === "boolean") return value ? key : `${key}={false}`;
  if (typeof value === "number") return `${key}={${value}}`;
  if (typeof value === "string")
    return `${key}="${value.replace(/"/g, "&quot;")}"`;
  try {
    return `${key}={${JSON.stringify(value)}}`;
  } catch {
    return null;
  }
}

function attrsToString(props) {
  return Object.entries(props || {})
    .map(([k, v]) => serializeAttr(k, v))
    .filter(Boolean)
    .join(" ");
}

function buildJSX(componentKey, props, children, label, indent = 0, gsap = false) {
  const pad = "  ".repeat(indent);
  const mergedProps =
    gsap && indent === 0 ? { ...props, "data-animate": "fade-up" } : props;
  const attrs = attrsToString(mergedProps);
  const open = `<${componentKey}${attrs ? " " + attrs : ""}`;
  const hasChildren = children && children.length > 0;
  const hasLabel = !hasChildren && label;

  if (!hasChildren && !hasLabel) return `${pad}${open} />`;
  if (hasLabel) return `${pad}${open}>${label}</${componentKey}>`;

  const inner = children
    .map((c) => buildJSX(c.component, c.props, c.children, c.label, indent + 1))
    .join("\n");
  return `${pad}${open}>\n${inner}\n${pad}</${componentKey}>`;
}

function reactGSAPWrapper(componentKey, jsx) {
  return `import { useRef, useEffect } from "react";
import { gsap } from "gsap";

function Animated${componentKey}() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power2.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref}>
${jsx
  .split("\n")
  .map((l) => "      " + l)
  .join("\n")}
    </div>
  );
}`;
}

/* ---- Plain HTML + Tailwind + GSAP generator (for WordPress / static sites) ---- */
function buildHTMLNode(node, indent = 1) {
  const pad = "  ".repeat(indent);
  const { component, props = {}, children = [], label } = node;

  switch (component) {
    case "DemoButton": {
      const cls = resolveClasses("DemoButton", props);
      const dataAttr = props.data ? ` data-demo='${JSON.stringify(props.data)}'` : "";
      return `${pad}<button type="button" class="${cls}"${dataAttr}>${escapeHtmlText(
        label || "Click me"
      )}</button>`;
    }
    case "MUISwitch": {
      const cls = resolveClasses("MUISwitch", props);
      return `${pad}<label class="flex items-center gap-2 text-sm text-[#C7CCD8]">
${pad}  <span>Switch</span>
${pad}  <input type="checkbox" class="${cls}" />
${pad}</label>`;
    }
    case "DemoChild": {
      return `${pad}<span class="text-[#D9A441] text-sm font-mono">${escapeHtmlText(
        props.label || "I am child!"
      )}</span>`;
    }
    case "Badge": {
      const cls = resolveClasses("Badge", props);
      return `${pad}<span class="${cls}">${escapeHtmlText(props.label || "Badge")}</span>`;
    }
    case "Input": {
      const { label: l = "Label", placeholder = "", type = "text", disabled = false } = props;
      return `${pad}<label class="flex flex-col gap-1.5 text-xs text-[#8A93A6] w-56">
${pad}  ${escapeHtmlText(l)}
${pad}  <input type="${type}" placeholder="${escapeHtmlText(placeholder)}"${
        disabled ? " disabled" : ""
      } class="rounded-md px-3 py-2 bg-[#0D1016] border border-[#242832] text-[#E9EBF0] text-sm placeholder:text-[#5C6272] focus:outline-none focus:border-[#D9A441]/60 disabled:opacity-40" />
${pad}</label>`;
    }
    case "Alert": {
      const { tone = "info", title = "Heads up", message = "" } = props;
      const cls = resolveClasses("Alert", props);
      return `${pad}<div class="${cls}">
${pad}  <div class="flex items-center gap-2 mb-1">
${pad}    <span class="w-1.5 h-1.5 rounded-full ${toneDotClass(tone)}"></span>
${pad}    <span class="text-sm font-semibold text-[#E9EBF0]">${escapeHtmlText(title)}</span>
${pad}  </div>${
        message
          ? `\n${pad}  <p class="text-xs text-[#8A93A6] leading-relaxed">${escapeHtmlText(
              message
            )}</p>`
          : ""
      }
${pad}</div>`;
    }
    case "Card": {
      const cls = resolveClasses("Card", props);
      const kids = children.map((c) => buildHTMLNode(c, indent + 1)).join("\n");
      return `${pad}<div class="${cls}">
${kids}
${pad}</div>`;
    }
    case "CardHeader": {
      const { eyebrow, title = "Title" } = props;
      return `${pad}<div>${
        eyebrow
          ? `\n${pad}  <div class="text-[10px] tracking-[0.14em] uppercase text-[#D9A441] font-mono mb-1">${escapeHtmlText(
              eyebrow
            )}</div>`
          : ""
      }
${pad}  <div class="text-base font-semibold text-[#E9EBF0]">${escapeHtmlText(title)}</div>
${pad}</div>`;
    }
    case "CardBody": {
      return `${pad}<p class="text-xs text-[#8A93A6] leading-relaxed">${escapeHtmlText(
        props.text || ""
      )}</p>`;
    }
    case "CardFooter": {
      const { price, ctaLabel = "Choose", badge } = props;
      return `${pad}<div class="flex items-center justify-between pt-3 border-t border-[#1B1F27]">
${pad}  <div class="flex items-center gap-2">${
        price
          ? `\n${pad}    <span class="text-sm font-semibold text-[#E9EBF0]">${escapeHtmlText(
              price
            )}</span>`
          : ""
      }${
        badge
          ? `\n${pad}    <span class="px-2 py-0.5 rounded-full bg-[#D9A441]/15 text-[#D9A441] text-[10px] font-mono">${escapeHtmlText(
              badge
            )}</span>`
          : ""
      }
${pad}  </div>
${pad}  <button type="button" class="px-3 py-1.5 rounded-md bg-[#D9A441] text-[#0A0C10] text-xs font-semibold hover:brightness-110 transition-[filter]">${escapeHtmlText(
        ctaLabel
      )}</button>
${pad}</div>`;
    }
    default:
      return `${pad}<!-- unknown component ${component} -->`;
  }
}

function buildHTMLDocument(rootNode, gsapEnabled) {
  const animAttr = gsapEnabled ? ' data-animate="fade-up"' : "";
  const inner = buildHTMLNode(rootNode, 2);
  const gsapScriptTag = gsapEnabled
    ? `\n    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>`
    : "";
  const gsapInit = gsapEnabled
    ? `
    <script>
      document.querySelectorAll('[data-animate="fade-up"]').forEach((el) => {
        gsap.from(el, { opacity: 0, y: 24, duration: 0.6, ease: "power2.out" });
      });
    </script>`
    : "";
  return `<!-- Tailwind (via CDN) + optional GSAP — drop straight into a static/WordPress page -->
<script src="https://cdn.tailwindcss.com"></script>${gsapScriptTag}

<div${animAttr}>
${inner}
</div>${gsapInit}`;
}

/* ---- Laravel Blade generator ---- */
function toKebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function bladeAttr(key, value) {
  if (value === undefined) return null;
  if (typeof value === "boolean") return value ? `:${key}="true"` : `:${key}="false"`;
  if (typeof value === "number") return `:${key}="${value}"`;
  if (typeof value === "object") return `:${key}='${JSON.stringify(value)}'`;
  return `${key}="${String(value).replace(/"/g, "&quot;")}"`;
}

function buildBladeUsage(node, indent = 0) {
  const pad = "  ".repeat(indent);
  const kebab = toKebab(node.component);
  const attrs = Object.entries(node.props || {})
    .map(([k, v]) => bladeAttr(k, v))
    .filter(Boolean)
    .join(" ");
  const open = `<x-${kebab}${attrs ? " " + attrs : ""}`;
  const hasChildren = node.children && node.children.length > 0;
  const hasLabel = !hasChildren && node.label;

  if (!hasChildren && !hasLabel) return `${pad}${open} />`;
  if (hasLabel) return `${pad}${open}>${node.label}</x-${kebab}>`;

  const inner = node.children
    .map((c) => buildBladeUsage(c, indent + 1))
    .join("\n");
  return `${pad}${open}>\n${inner}\n${pad}</x-${kebab}>`;
}

function buildBladeComponentStub(rootComponent, gsapEnabled) {
  const kebab = toKebab(rootComponent);
  const htmlBody = buildHTMLNode({ component: rootComponent, props: {}, children: [] }, 1)
    // component stub uses Blade prop bindings instead of resolved literal values
    .replace(/class="[^"]*"/, `{{ $attributes->merge(['class' => 'inline-block']) }}`);
  const animAttr = gsapEnabled ? ' data-animate="fade-up"' : "";
  return `{{-- resources/views/components/${kebab}.blade.php --}}
{{-- Usage: <x-${kebab} variant="primary" rounded="lg">Click me</x-${kebab}> --}}
@props([
    'variant' => 'default',
    'rounded' => 'md',
    'stroke' => false,
    'hover' => false,
    'bgColor' => 'black',
])

<div${animAttr} {{ $attributes }}>
    {{ $slot }}
</div>

{{-- Tip: keep the exact Tailwind class logic from the React source in a small
     PHP helper (e.g. app/Support/AtelierClasses.php) and call it here, so the
     React, HTML, and Blade outputs never drift from one design system. --}}`;
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeHtmlText(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* ----------------------------------------------------------------------------
   Syntax highlighter — FIXED.
   The previous version ran three sequential regex passes on its own HTML
   output, so the second and third passes re-matched the `class="tok-tag"`
   markup that the first pass had just inserted (visible as literal
   `"tok-attr">class="tok-tag">…` text in the preview, even though the
   underlying copied string was correct). This version tokenizes the RAW
   source once, escapes each piece exactly once, and never re-scans its own
   output.
   ---------------------------------------------------------------------------- */
function highlightJSX(code) {
  const pattern = /(<\/?[A-Za-z][\w.-]*)|(\s[a-zA-Z_:][\w-]*)(?=[=\s/>])|("[^"]*")/g;
  let out = "";
  let lastIndex = 0;
  let match;
  while ((match = pattern.exec(code)) !== null) {
    out += escapeHtml(code.slice(lastIndex, match.index));
    if (match[1]) {
      out += `<span class="tok-tag">${escapeHtml(match[1])}</span>`;
    } else if (match[2]) {
      out += `<span class="tok-attr">${escapeHtml(match[2])}</span>`;
    } else if (match[3]) {
      out += `<span class="tok-str">${escapeHtml(match[3])}</span>`;
    }
    lastIndex = pattern.lastIndex;
  }
  out += escapeHtml(code.slice(lastIndex));
  return out;
}

/* --------------------------------- Copy button + code panel --------------------------------- */
function CodeBlock({ code, label }) {
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

/* --------------------------------- Generic prop console --------------------------------- */
function PropEditor({ props, onChange }) {
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
                rows={2}
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

/* --------------------------------- Recursive live renderer --------------------------------- */
function RenderNode({ component, props, children, label }) {
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

/* ============================================================================
   Framework tabs — React / HTML+Tailwind+GSAP / Laravel Blade
   ============================================================================ */
const FRAMEWORKS = [
  { id: "react", label: "React" },
  { id: "html", label: "HTML + Tailwind + GSAP" },
  { id: "laravel", label: "Laravel Blade" },
];

function FrameworkTabs({ value, onChange, gsapEnabled, onToggleGsap }) {
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

/* ============================================================================
   Specimen playground — preview viewfinder + generic console + live code.
   ============================================================================ */
function ComponentPlayground({ block }) {
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

  return (
    <div className="flex flex-col  gap-0 lg:gap-8">
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
          <RenderNode
            component={block.component}
            props={rootProps}
            children={childState}
            label={label}
          />
        </div>
      </div>

      {/* Console */}
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
    </div>
  );
}

/* ============================================================================
   Markdown + Mermaid
   ============================================================================ */
const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false });

function MermaidBlock({ children }) {
  const ref = useRef();
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    import("mermaid")
      .then((m) => {
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
          if (alive && ref.current) {
            m.default.render(
              "mermaid-" + Math.random().toString(36).slice(2),
              children,
              (svgCode) => {
                if (ref.current) ref.current.innerHTML = svgCode;
              },
              ref.current
            );
          }
        } catch (e) {
          setError(e.message || "Mermaid render error.");
        }
      })
      .catch((e) => setError(e.message || "Failed to load mermaid.js"));
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

function MarkdownWithMermaid({ children }) {
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

/* ============================================================================
   Content: README + default specimen registry
   ============================================================================ */
const DEFAULT_README = `# Atelier UI

A living specimen catalog for interface components — buttons, toggles, forms,
and full compound blocks. Every specimen ships with a real console: change a
prop, and the code readout below it updates immediately in React, plain
HTML+Tailwind+GSAP, or Laravel Blade — ready to copy into whichever project
you're actually working in.

## How specimens are built

- **Atoms** — a single component with its own props (\`Button\`, \`Switch\`, \`Input\`…)
- **Compounds** — a root component composed of named child components (\`Card\` → \`CardHeader\` + \`CardBody\`)
- **Blocks** — compounds assembled into a real pattern (a pricing card, a form row)

The registry is plain data, so adding a new specimen — of any shape — doesn't
require touching the console or the code generator.

\`\`\`mermaid
graph TD
    Registry -->|atom| Button
    Registry -->|atom| Switch
    Registry -->|compound| Card
    Card --> CardHeader
    Card --> CardBody
    Card --> CardFooter
\`\`\`
`;

const DEFAULT_BLOCKS = [
  {
    category: "Buttons",
    name: "Primary Button",
    description: "The default call-to-action button.",
    component: "DemoButton",
    importStatement: `import { DemoButton } from "@/components/DemoButton"`,
    props: { variant: "primary", rounded: "full" },
    label: "Click me",
    implementation: `import { DemoButton } from "@/components/DemoButton";\n\n<DemoButton variant="primary" rounded="full">Click me</DemoButton>`,
    detailDocs: `**DemoButton** is a customizable button.\n\n- \`variant\`: "default" | "primary" | "danger" | "outline"\n- \`rounded\`: "none" | "sm" | "md" | "lg" | "full"\n- \`stroke\`: adds a brass border\n- \`hover\`: brightens on hover\n- \`bgColor\`: "black" | "blue" | "white"`,
  },
  {
    category: "Buttons",
    name: "Button with Child",
    description: "A button composed with a nested child component.",
    component: "DemoButton",
    importStatement: `import { DemoButton } from "@/components/DemoButton"`,
    props: { stroke: true, data: { foo: "bar" } },
    children: [{ component: "DemoChild", props: { label: "Inner!" } }],
    implementation: `<DemoButton stroke data={{ foo: "bar" }}>\n  <DemoChild label="Inner!" />\n</DemoButton>`,
    detailDocs: `Demonstrates composing **DemoButton** with a **DemoChild** — the simplest form of a compound specimen.`,
  },
  {
    category: "Toggles",
    name: "Switch",
    description: "A material-style toggle switch.",
    component: "MUISwitch",
    importStatement: `import Switch from "@mui/material/Switch"`,
    props: { hover: true, rounded: "lg" },
    implementation: `import Switch from "@mui/material/Switch";\n\n<Switch defaultChecked />`,
    detailDocs: `**MUISwitch** simulates a checkbox-based toggle. Extra props pass straight through to the underlying \`<input type="checkbox">\`.`,
  },
  {
    category: "Feedback",
    name: "Badge",
    description: "A small status pill for inline labels.",
    component: "Badge",
    importStatement: `import { Badge } from "@/components/Badge"`,
    props: { label: "New", tone: "info" },
    detailDocs: `**Badge** communicates status at a glance.\n\n- \`tone\`: "default" | "info" | "success" | "warning" | "danger"`,
  },
  {
    category: "Feedback",
    name: "Alert",
    description: "An inline message for confirmations or warnings.",
    component: "Alert",
    importStatement: `import { Alert } from "@/components/Alert"`,
    props: {
      tone: "success",
      title: "Saved",
      message: "Your changes have been saved.",
    },
    detailDocs: `**Alert** pairs a tone-colored dot with a title and optional message.`,
  },
  {
    category: "Forms",
    name: "Text Input",
    description: "A labeled text field.",
    component: "Input",
    importStatement: `import { Input } from "@/components/Input"`,
    props: { label: "Email", placeholder: "you@example.com", type: "email" },
    detailDocs: `**Input** is a labeled field. \`type\` accepts "text" | "email" | "password".`,
  },
  {
    category: "Compound",
    name: "Profile Card",
    description:
      "A compound specimen — Card composed of CardHeader + CardBody.",
    component: "Card",
    importStatement: `import { Card, CardHeader, CardBody } from "@/components/Card"`,
    props: { variant: "outlined", padding: "md" },
    children: [
      {
        component: "CardHeader",
        props: { eyebrow: "PROFILE", title: "Jane Doe" },
      },
      {
        component: "CardBody",
        props: {
          text: "Product designer focused on systems that scale without losing their voice.",
        },
      },
    ],
    detailDocs: `Shows how a **compound** specimen nests multiple named parts under one root, each with its own independent props.`,
  },
  {
    category: "Compound",
    name: "Pricing Card",
    description:
      "A full block — three compound parts assembled into a real pattern.",
    component: "Card",
    importStatement: `import { Card, CardHeader, CardBody, CardFooter } from "@/components/Card"`,
    props: { variant: "elevated", padding: "lg" },
    children: [
      { component: "CardHeader", props: { eyebrow: "PLAN", title: "Pro" } },
      {
        component: "CardBody",
        props: {
          text: "Everything you need to ship and maintain a design system.",
        },
      },
      {
        component: "CardFooter",
        props: { price: "$29/mo", ctaLabel: "Upgrade", badge: "Popular" },
      },
    ],
    detailDocs: `A **block**: the same \`Card\` root as Profile Card, but assembled with a third part (\`CardFooter\`) into a shippable pattern — this is the level of composition a real page section lives at.`,
  },
];

/* ============================================================================
   Add / Edit modal
   ============================================================================ */
function ChildRow({ child, onChange, onRemove }) {
  return (
    <div className="relative rounded-lg border border-[#242832] bg-[#0D1016] p-3 flex flex-col gap-2">
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 text-[#5C6272] hover:text-[#E2574C]"
        aria-label="Remove part"
      >
        <TrashIcon width={14} height={14} />
      </button>
      <label className="text-[10px] uppercase tracking-wide text-[#5C6272] font-mono">
        Component key
        <input
          value={child.component || ""}
          onChange={(e) => onChange({ ...child, component: e.target.value })}
          placeholder="CardHeader"
          className="mt-1 w-full rounded px-2 py-1 bg-[#171B22] text-[#E9EBF0] border border-[#242832] text-xs font-mono"
        />
      </label>
      <label className="text-[10px] uppercase tracking-wide text-[#5C6272] font-mono">
        Props (JSON)
        <input
          defaultValue={JSON.stringify(child.props || {})}
          onBlur={(e) => {
            try {
              onChange({ ...child, props: JSON.parse(e.target.value) });
            } catch {
              /* ignore invalid JSON until fixed */
            }
          }}
          placeholder='{"title":"..."}'
          className="mt-1 w-full rounded px-2 py-1 bg-[#171B22] text-[#E9EBF0] border border-[#242832] text-xs font-mono"
        />
      </label>
    </div>
  );
}

function ComponentModal({ open, onClose, onSubmit, initialData, isEdit }) {
  const blank = {
    category: "Uncategorized",
    name: "",
    description: "",
    component: "",
    importStatement: "",
    props: {},
    label: "",
    children: [],
    implementation: "",
    detailDocs: "",
  };
  const [form, setForm] = useState(initialData || blank);

  useEffect(() => {
    setForm(initialData || blank);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData, open]);

  if (!open) return null;

  const addChild = () =>
    setForm((f) => ({
      ...f,
      children: [...(f.children || []), { component: "", props: {} }],
    }));
  const updateChild = (idx, next) =>
    setForm((f) => ({
      ...f,
      children: f.children.map((c, i) => (i === idx ? next : c)),
    }));
  const removeChild = (idx) =>
    setForm((f) => ({
      ...f,
      children: f.children.filter((_, i) => i !== idx),
    }));

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      style={{ backdropFilter: "blur(3px)" }}
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-[#12151B] p-7 rounded-xl border border-[#242832] w-full max-w-xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-[#5C6272] hover:text-[#E9EBF0]"
          aria-label="Close"
          onClick={onClose}
        >
          <XIcon width={18} height={18} />
        </button>
        <div className="text-[10px] uppercase tracking-[0.14em] text-[#D9A441] font-mono mb-1">
          {isEdit ? "Edit specimen" : "New specimen"}
        </div>
        <h2 className="font-serif text-2xl text-[#E9EBF0] mb-5">
          {isEdit ? form.name || "Untitled" : "Add a component"}
        </h2>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <label className="block text-xs font-semibold text-[#8A93A6]">
              Name
              <input
                required
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="w-full mt-1 rounded-md px-2 py-1.5 bg-[#0D1016] text-[#E9EBF0] border border-[#242832] text-sm"
                placeholder="Ghost Button"
              />
            </label>
            <label className="block text-xs font-semibold text-[#8A93A6]">
              Category
              <input
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                className="w-full mt-1 rounded-md px-2 py-1.5 bg-[#0D1016] text-[#E9EBF0] border border-[#242832] text-sm"
                placeholder="Buttons"
              />
            </label>
          </div>

          <label className="block text-xs font-semibold text-[#8A93A6]">
            Description
            <input
              required
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              className="w-full mt-1 rounded-md px-2 py-1.5 bg-[#0D1016] text-[#E9EBF0] border border-[#242832] text-sm"
              placeholder="What this specimen is for"
            />
          </label>

          <label className="block text-xs font-semibold text-[#8A93A6]">
            Component key
            <input
              required
              value={form.component}
              onChange={(e) =>
                setForm((f) => ({ ...f, component: e.target.value }))
              }
              className="w-full mt-1 rounded-md px-2 py-1.5 bg-[#0D1016] text-[#E9EBF0] border border-[#242832] text-xs font-mono"
              placeholder="DemoButton — must match a key in AVAILABLE_COMPONENTS"
            />
          </label>

          <label className="block text-xs font-semibold text-[#8A93A6]">
            Import statement
            <input
              value={form.importStatement}
              onChange={(e) =>
                setForm((f) => ({ ...f, importStatement: e.target.value }))
              }
              className="w-full mt-1 rounded-md px-2 py-1.5 bg-[#0D1016] text-[#E9EBF0] border border-[#242832] text-xs font-mono"
              placeholder={`import { DemoButton } from "..."`}
            />
          </label>

          <label className="block text-xs font-semibold text-[#8A93A6]">
            Default props (JSON)
            <input
              defaultValue={JSON.stringify(form.props || {})}
              onBlur={(e) => {
                try {
                  setForm((f) => ({ ...f, props: JSON.parse(e.target.value) }));
                } catch {
                  /* ignore until valid */
                }
              }}
              className="w-full mt-1 rounded-md px-2 py-1.5 bg-[#0D1016] text-[#E9EBF0] border border-[#242832] text-xs font-mono"
              placeholder='{"variant":"primary"}'
            />
          </label>

          <label className="block text-xs font-semibold text-[#8A93A6]">
            Text content (used only if no compound parts below)
            <input
              value={form.label}
              onChange={(e) =>
                setForm((f) => ({ ...f, label: e.target.value }))
              }
              className="w-full mt-1 rounded-md px-2 py-1.5 bg-[#0D1016] text-[#E9EBF0] border border-[#242832] text-sm"
              placeholder="Click me"
            />
          </label>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#8A93A6]">
                Compound parts (optional)
              </span>
              <button
                type="button"
                onClick={addChild}
                className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-md bg-[#171B22] border border-[#242832] text-[#8A93A6] hover:text-[#D9A441] hover:border-[#D9A441]/50"
              >
                <PlusIcon width={12} height={12} /> Add part
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {(form.children || []).map((child, idx) => (
                <ChildRow
                  key={idx}
                  child={child}
                  onChange={(next) => updateChild(idx, next)}
                  onRemove={() => removeChild(idx)}
                />
              ))}
            </div>
          </div>

          <label className="block text-xs font-semibold text-[#8A93A6]">
            Real-world usage snippet
            <textarea
              rows={3}
              value={form.implementation}
              onChange={(e) =>
                setForm((f) => ({ ...f, implementation: e.target.value }))
              }
              className="w-full mt-1 rounded-md px-2 py-1.5 bg-[#0D1016] text-[#E9EBF0] border border-[#242832] font-mono text-xs"
              placeholder="// how this is actually used in the app"
            />
          </label>

          <label className="block text-xs font-semibold text-[#8A93A6]">
            Documentation (Markdown)
            <textarea
              rows={5}
              value={form.detailDocs}
              onChange={(e) =>
                setForm((f) => ({ ...f, detailDocs: e.target.value }))
              }
              className="w-full mt-1 rounded-md px-2 py-1.5 bg-[#0D1016] text-[#E9EBF0] border border-[#242832] font-mono text-xs"
              placeholder="## Documentation"
            />
          </label>

          <div className="flex gap-3 justify-end mt-2">
            <button
              type="button"
              className="px-4 py-2 rounded-md bg-[#171B22] hover:bg-[#1B1F27] border border-[#242832] text-[#C7CCD8] text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-[#D9A441] hover:brightness-110 text-[#0A0C10] font-semibold text-sm"
            >
              {isEdit ? "Save changes" : "Add specimen"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ============================================================================
   Specimen card — preview/console + meta (docs, imports, implementation)
   ============================================================================ */
function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function SpecimenCard({ block, index, onEdit, onDelete }) {
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
          <div className="text-[10px] uppercase tracking-[0.14em] text-[#D9A441] font-mono mb-1">
            Spec — {String(index + 1).padStart(2, "0")}
          </div>
          <h3 className="font-serif text-xl text-[#E9EBF0]">{block.name}</h3>
          <p className="text-sm text-[#8A93A6] mt-1 max-w-md">
            {block.description}
          </p>
        </div>
        <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(block)}
            title="Edit"
            className="p-1.5 rounded-md bg-[#171B22] border border-[#242832] text-[#8A93A6] hover:text-[#5B8DEF] hover:border-[#5B8DEF]/40"
          >
            <PencilIcon width={14} height={14} />
          </button>
          <button
            onClick={() => onDelete(block)}
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

/* ============================================================================
   Page
   ============================================================================ */
export default function UIlibPage() {
  const [blocks, setBlocks] = useState(DEFAULT_BLOCKS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [readme, setReadme] = useState(DEFAULT_README);
  const [editReadme, setEditReadme] = useState(false);
  const [query, setQuery] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const categories = useMemo(() => {
    const map = new Map();
    blocks.forEach((b) => {
      const cat = b.category || "Uncategorized";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat).push(b);
    });
    return Array.from(map.entries());
  }, [blocks]);

  const filtered = useMemo(() => {
    if (!query.trim()) return categories;
    const q = query.toLowerCase();
    return categories
      .map(([cat, items]) => [
        cat,
        items.filter(
          (b) =>
            b.name.toLowerCase().includes(q) ||
            b.description.toLowerCase().includes(q) ||
            cat.toLowerCase().includes(q)
        ),
      ])
      .filter(([, items]) => items.length > 0);
  }, [categories, query]);

  function handleSubmit(data) {
    const trimmed = {
      ...data,
      children: (data.children || []).filter((c) => c.component),
    };
    if (editTarget) {
      setBlocks((prev) => prev.map((b) => (b === editTarget ? trimmed : b)));
    } else {
      setBlocks((prev) => [...prev, trimmed]);
    }
    setModalOpen(false);
    setEditTarget(null);
  }

  function handleDelete(block) {
    setBlocks((prev) => prev.filter((b) => b !== block));
  }

  let runningIndex = -1;

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
        {/* Sidebar */}
        <aside
          className={`hidden lg:flex flex-col shrink-0 h-screen sticky top-0 border-r border-[#1B1F27] gap-6 overflow-y-auto transition-[width] duration-200 ${
            sidebarCollapsed ? "w-16 p-3 items-center" : "w-64 p-6"
          }`}
        >
          <div
            className={`flex items-center w-full ${
              sidebarCollapsed ? "justify-center" : "justify-between"
            }`}
          >
            {!sidebarCollapsed && (
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#D9A441] font-mono mb-1">
                  Atelier
                </div>
                <div className="font-serif text-lg">Component Catalog</div>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed((v) => !v)}
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="p-1.5 rounded-md bg-[#171B22] border border-[#242832] text-[#8A93A6] hover:text-[#D9A441] hover:border-[#D9A441]/50 transition-colors shrink-0"
            >
              <PanelLeftIcon width={14} height={14} />
            </button>
          </div>

          {!sidebarCollapsed && (
            <>
              <div className="relative w-full">
                <SearchIcon
                  width={14}
                  height={14}
                  className="absolute left-2.5 top-2.5 text-[#5C6272]"
                />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
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
                          key={b.name}
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
            onClick={() => {
              setEditTarget(null);
              setModalOpen(true);
            }}
            title="New specimen"
            className={`mt-auto flex items-center justify-center gap-1.5 rounded-md bg-[#D9A441] text-[#0A0C10] font-semibold hover:brightness-110 transition-[filter] ${
              sidebarCollapsed ? "w-9 h-9 p-0" : "w-full px-3 py-2 text-sm"
            }`}
          >
            <PlusIcon width={14} height={14} />
            {!sidebarCollapsed && "New specimen"}
          </button>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          <div className="w-full mx-auto px-6 py-14">
            <header className="mb-12">
              <div className="flex items-center justify-between gap-4 mb-8 lg:hidden">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#D9A441] font-mono">
                  Atelier
                </div>
                <button
                  onClick={() => {
                    setEditTarget(null);
                    setModalOpen(true);
                  }}
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
                Blade, ready to copy. Atoms, compounds, and full blocks all live
                in the same registry.
              </p>
              <button
                onClick={() => setEditReadme((v) => !v)}
                className="mt-5 text-xs font-mono text-[#5C6272] hover:text-[#D9A441] transition-colors underline underline-offset-4 decoration-dotted"
              >
                {editReadme ? "Preview documentation" : "Edit documentation"}
              </button>
            </header>

            <section className="mb-14">
              {editReadme ? (
                <textarea
                  value={readme}
                  onChange={(e) => setReadme(e.target.value)}
                  rows={16}
                  className="w-full bg-[#0D1016] text-[#E9EBF0] border border-[#242832] rounded-lg p-4 font-mono text-xs leading-relaxed"
                />
              ) : (
                <div className="rounded-2xl border border-[#1B1F27] bg-[#12151B] p-7">
                  <MarkdownWithMermaid>{readme}</MarkdownWithMermaid>
                </div>
              )}
            </section>

            {filtered.length === 0 && (
              <p className="text-sm text-[#5C6272] font-mono">
                No specimens match "{query}".
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
                  return (
                    <SpecimenCard
                      key={block.name}
                      block={block}
                      index={runningIndex}
                      onEdit={(b) => {
                        setEditTarget(b);
                        setModalOpen(true);
                      }}
                      onDelete={handleDelete}
                    />
                  );
                })}
              </section>
            ))}
          </div>
        </div>
      </div>

      <ComponentModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditTarget(null);
        }}
        onSubmit={handleSubmit}
        initialData={editTarget}
        isEdit={!!editTarget}
      />
    </main>
  );
}