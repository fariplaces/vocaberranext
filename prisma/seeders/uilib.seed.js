// prisma/seeders/uilib.seed.js
// One-time seed for the Atelier UI catalog (UILibComponent + UILibDoc).
// Idempotent: only inserts if the tables are still empty.

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

  // --- Animated (Phase 3 — Motion / GSAP / Three.js specimens) ---
  {
    category: "Animated",
    name: "Motion Reveal Card",
    description: "An entrance + hover animation driven entirely by props.",
    component: "MotionRevealCard",
    engine: "motion",
    importStatement: `import { MotionRevealCard } from "@/components/uilib/blocks/MotionRevealCard"`,
    props: {
      direction: "up",
      distance: 24,
      duration: 0.6,
      delay: 0,
      hoverLift: true,
      tone: "info",
      title: "Motion Reveal",
      text: "Animated entrance driven entirely by props.",
    },
    implementation: `import { MotionRevealCard } from "@/components/uilib/blocks/MotionRevealCard";\n\n<MotionRevealCard direction="up" tone="info" title="Motion Reveal" />`,
    detailDocs: `**MotionRevealCard** uses the \`motion\` package for a props-driven entrance + hover lift.\n\n- \`direction\`: "up" | "down" | "left" | "right"\n- \`distance\`, \`duration\`, \`delay\`: entrance tuning\n- \`hoverLift\`: toggles the whileHover lift\n- \`tone\`: "default" | "info" | "success" | "warning" | "danger"`,
  },
  {
    category: "Animated",
    name: "GSAP Marquee Badge",
    description: "A looping marquee pill animated with a GSAP timeline.",
    component: "GsapMarqueeBadge",
    engine: "gsap",
    importStatement: `import { GsapMarqueeBadge } from "@/components/uilib/blocks/GsapMarqueeBadge"`,
    props: {
      label: "New specimen shipped",
      speed: 40,
      direction: "left",
      pauseOnHover: true,
      tone: "info",
    },
    implementation: `import { GsapMarqueeBadge } from "@/components/uilib/blocks/GsapMarqueeBadge";\n\n<GsapMarqueeBadge label="New specimen shipped" speed={40} />`,
    detailDocs: `**GsapMarqueeBadge** loops its label with an infinite \`gsap.to\` tween, torn down via \`gsap.context().revert()\` on unmount.\n\n- \`speed\`: px/sec scroll speed\n- \`direction\`: "left" | "right"\n- \`pauseOnHover\`: pauses the tween on mouse enter`,
  },
  {
    category: "Animated",
    name: "Three.js Orb Avatar",
    description: "A rotating 3D orb rendered with vanilla three.js.",
    component: "ThreeOrbAvatar",
    engine: "three",
    importStatement: `import { ThreeOrbAvatar } from "@/components/uilib/blocks/ThreeOrbAvatar"`,
    props: { color: "#D9A441", wireframe: false, speed: 1, size: 160 },
    implementation: `import { ThreeOrbAvatar } from "@/components/uilib/blocks/ThreeOrbAvatar";\n\n<ThreeOrbAvatar color="#D9A441" speed={1} />`,
    detailDocs: `**ThreeOrbAvatar** builds a plain three.js scene/camera/renderer in a \`useEffect\`, driven by props, and fully disposes the WebGL context on unmount.\n\n- \`color\`: hex string\n- \`wireframe\`: toggles wireframe rendering\n- \`speed\`: rotation speed multiplier\n- \`size\`: canvas size in px`,
  },

  // --- Sections (starter-kit blocks — full-width, animated, prop-driven) ---
  {
    category: "Sections",
    name: "Animated Navbar",
    description: "A sticky, prop-driven navbar with entrance animation and a mobile menu.",
    component: "AnimatedNavbar",
    engine: "motion",
    layout: "full",
    importStatement: `import { AnimatedNavbar } from "@/components/uilib/blocks/sections/AnimatedNavbar"`,
    props: {
      brand: "Atelier",
      links: [
        { label: "Product", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Docs", href: "#" },
      ],
      ctaLabel: "Get started",
      sticky: true,
      transparent: false,
    },
    implementation: `import { AnimatedNavbar } from "@/components/uilib/blocks/sections/AnimatedNavbar";\n\n<AnimatedNavbar brand="Atelier" ctaLabel="Get started" />`,
    detailDocs: `**AnimatedNavbar** slides down on mount (\`motion\`) and includes a local mobile-menu toggle.\n\n- \`links\`: \`{ label, href }[]\`\n- \`sticky\`, \`transparent\`: layout toggles`,
  },
  {
    category: "Sections",
    name: "Animated Hero",
    description: "A staggered-entrance hero section over an animated gradient backdrop.",
    component: "AnimatedHero",
    engine: "motion",
    layout: "full",
    importStatement: `import { AnimatedHero } from "@/components/uilib/blocks/sections/AnimatedHero"`,
    props: {
      eyebrow: "New · Component library",
      title: "Ship interfaces that move like they mean it",
      subtitle: "A prop-driven catalog of animated sections and atoms — copy the code, keep the motion.",
      primaryCtaLabel: "Get started",
      secondaryCtaLabel: "View docs",
      align: "center",
    },
    implementation: `import { AnimatedHero } from "@/components/uilib/blocks/sections/AnimatedHero";\n\n<AnimatedHero title="Ship interfaces that move like they mean it" />`,
    detailDocs: `**AnimatedHero** staggers eyebrow → title → subtitle → CTAs in with \`motion\`, over a slow CSS-keyframe gradient blob.\n\n- \`align\`: "left" | "center"`,
  },
  {
    category: "Sections",
    name: "Animated About Section",
    description: "A two-column about section with scroll-triggered reveals and stat callouts.",
    component: "AnimatedAboutSection",
    engine: "motion",
    layout: "full",
    importStatement: `import { AnimatedAboutSection } from "@/components/uilib/blocks/sections/AnimatedAboutSection"`,
    props: {
      heading: "Built for teams who ship fast",
      text: "Every specimen in this catalog is a real, reusable component — not a screenshot. Drop it in, wire up the props, and it behaves exactly like it does here.",
      stats: [
        { label: "Components", value: "40+" },
        { label: "Frameworks", value: "3" },
        { label: "Setup time", value: "0 min" },
      ],
      reverse: false,
    },
    implementation: `import { AnimatedAboutSection } from "@/components/uilib/blocks/sections/AnimatedAboutSection";\n\n<AnimatedAboutSection heading="Built for teams who ship fast" />`,
    detailDocs: `**AnimatedAboutSection** uses \`motion\`'s \`whileInView\` to reveal the copy and stagger the stat cards once scrolled into view.\n\n- \`stats\`: \`{ label, value }[]\`\n- \`reverse\`: flips column order`,
  },
  {
    category: "Sections",
    name: "Animated Footer",
    description: "A footer with a full-width GSAP marquee strip and animated link columns.",
    component: "AnimatedFooter",
    engine: "gsap",
    layout: "full",
    importStatement: `import { AnimatedFooter } from "@/components/uilib/blocks/sections/AnimatedFooter"`,
    props: {
      brand: "Atelier",
      tagline: "Animated components, shipped.",
      columns: [
        { title: "Product", links: [{ label: "Overview", href: "#" }, { label: "Pricing", href: "#" }] },
        { title: "Resources", links: [{ label: "Docs", href: "#" }, { label: "Changelog", href: "#" }] },
        { title: "Company", links: [{ label: "About", href: "#" }, { label: "Contact", href: "#" }] },
      ],
      marqueeText: "Atelier UI · Motion · GSAP · Three.js · ",
    },
    implementation: `import { AnimatedFooter } from "@/components/uilib/blocks/sections/AnimatedFooter";\n\n<AnimatedFooter brand="Atelier" />`,
    detailDocs: `**AnimatedFooter** reuses the same infinite \`gsap.to\` marquee technique as **GsapMarqueeBadge**, full-width, plus a \`motion\` fade-in for the link columns.\n\n- \`columns\`: \`{ title, links: { label, href }[] }[]\``,
  },
];

export async function seedUilib(prisma) {
  // Per-item idempotency (matched by name) rather than a table-empty guard —
  // so new specimens (e.g. the starter-kit sections) can be added to this
  // list later and seeded incrementally without wiping/duplicating existing
  // rows or any live edits made through the catalog UI.
  const existingNames = new Set(
    (await prisma.uILibComponent.findMany({ select: { name: true } })).map(
      (r) => r.name
    )
  );

  const toInsert = DEFAULT_BLOCKS.filter((block) => !existingNames.has(block.name));

  if (toInsert.length > 0) {
    const [{ _max }] = await Promise.all([
      prisma.uILibComponent.aggregate({ _max: { order: true } }),
    ]);
    let nextOrder = (_max.order ?? -1) + 1;

    await prisma.uILibComponent.createMany({
      data: toInsert.map((block) => ({
        category: block.category,
        name: block.name,
        description: block.description || null,
        component: block.component,
        engine: block.engine || "css",
        layout: block.layout || "boxed",
        importStatement: block.importStatement || null,
        props: JSON.stringify(block.props || {}),
        label: block.label ?? null,
        children: JSON.stringify(block.children || []),
        implementation: block.implementation || null,
        detailDocs: block.detailDocs || null,
        order: nextOrder++,
      })),
    });
    console.log(
      `  ↳ seeded ${toInsert.length} new UI Lib specimen(s): ${toInsert
        .map((b) => b.name)
        .join(", ")}`
    );
  } else {
    console.log("  ↳ UI Lib specimens already present, skipping");
  }

  const readmeDoc = await prisma.uILibDoc.findUnique({ where: { key: "main" } });
  if (!readmeDoc) {
    await prisma.uILibDoc.create({
      data: { key: "main", content: DEFAULT_README },
    });
    console.log("  ↳ seeded UI Lib README");
  } else {
    console.log("  ↳ UI Lib README already present, skipping");
  }
}
