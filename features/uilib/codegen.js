// features/uilib/codegen.js
// Pure code-generation helpers for the specimen playground's React / plain
// HTML+Tailwind+GSAP / Laravel Blade tabs. All three read from the same live
// prop state, so switching frameworks or editing a prop keeps every tab in sync.

/* ---- shared class-resolution logic (mirrors the atom components exactly) ---- */
export function resolveClasses(component, props = {}) {
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

export function toneDotClass(tone) {
  return (
    {
      info: "bg-[#5B8DEF]",
      success: "bg-[#4FAE7C]",
      warning: "bg-[#D9A441]",
      danger: "bg-[#E2574C]",
    }[tone] || "bg-[#5B8DEF]"
  );
}

/* ---- React JSX generator (drives the "React" tab) ---- */
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

export function buildJSX(componentKey, props, children, label, indent = 0, gsap = false) {
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

export function reactGSAPWrapper(componentKey, jsx) {
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

export function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function escapeHtmlText(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* ---- Plain HTML + Tailwind + GSAP generator (for WordPress / static sites) ---- */
export function buildHTMLNode(node, indent = 1) {
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
    case "MotionRevealCard": {
      const { title = "Motion Reveal", text = "" } = props;
      return `${pad}<!-- MotionRevealCard requires the React + \`motion\` runtime — copy the React tab instead. Static fallback below: -->
${pad}<div class="w-72 rounded-xl border border-[#5B8DEF]/40 bg-[#0D1016] p-5 flex flex-col gap-2">
${pad}  <div class="text-base font-semibold text-[#E9EBF0]">${escapeHtmlText(title)}</div>${
        text
          ? `\n${pad}  <p class="text-xs text-[#8A93A6] leading-relaxed">${escapeHtmlText(text)}</p>`
          : ""
      }
${pad}</div>`;
    }
    case "GsapMarqueeBadge": {
      const {
        label = "New specimen shipped",
        direction = "left",
        pauseOnHover = true,
      } = props;
      const id = "marquee-" + Math.random().toString(36).slice(2, 8);
      return `${pad}<div id="${id}" class="w-72 overflow-hidden rounded-full border border-[#5B8DEF]/30 bg-[#5B8DEF]/10 text-[#5B8DEF] px-4 py-2.5"${
        pauseOnHover
          ? ` onmouseenter="window['${id}_tween']?.pause()" onmouseleave="window['${id}_tween']?.resume()"`
          : ""
      }>
${pad}  <div class="marquee-track flex w-max gap-8 whitespace-nowrap text-xs font-mono">
${pad}    <span>${escapeHtmlText(label)}</span>
${pad}    <span>${escapeHtmlText(label)}</span>
${pad}  </div>
${pad}</div>
${pad}<script>
${pad}  (function () {
${pad}    var track = document.querySelector("#${id} .marquee-track");
${pad}    var distance = track.scrollWidth / 2;
${pad}    var duration = Math.max(distance / 40, 1);
${pad}    gsap.set(track, { x: ${direction === "right" ? "-distance" : "0"} });
${pad}    window['${id}_tween'] = gsap.to(track, { x: ${
        direction === "right" ? "0" : "-distance"
      }, duration: duration, ease: "none", repeat: -1 });
${pad}  })();
${pad}</script>`;
    }
    case "ThreeOrbAvatar": {
      const { size = 160 } = props;
      return `${pad}<!-- ThreeOrbAvatar requires the React + \`three\` runtime — copy the React tab instead. Static fallback below: -->
${pad}<div style="width:${size}px;height:${size}px" class="rounded-xl bg-[#0D1016] border border-[#242832]"></div>`;
    }
    case "AnimatedNavbar":
    case "AnimatedHero":
    case "AnimatedAboutSection":
    case "AnimatedFooter": {
      return `${pad}<!-- ${component} is a full section built from Motion/GSAP + several nested elements —
${pad}     too structurally involved for a faithful static transliteration. Copy the React tab instead. -->
${pad}<div class="w-full rounded-xl border border-dashed border-[#242832] bg-[#0D1016] p-10 text-center text-xs font-mono text-[#5C6272]">
${pad}  ${component} preview — see the React tab for the real, animated version
${pad}</div>`;
    }
    default:
      return `${pad}<!-- unknown component ${component} -->`;
  }
}

export function buildHTMLDocument(rootNode, gsapEnabled) {
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

export function buildBladeUsage(node, indent = 0) {
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

export function buildBladeComponentStub(rootComponent, gsapEnabled) {
  const kebab = toKebab(rootComponent);
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

/* ----------------------------------------------------------------------------
   Syntax highlighter — tokenizes the RAW source once, escapes each piece
   exactly once, and never re-scans its own output.
   ---------------------------------------------------------------------------- */
export function highlightJSX(code) {
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

export function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
