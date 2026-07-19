"use client";

import { motion } from "motion/react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export function AnimatedHero({
  eyebrow = "New · Component library",
  title = "Ship interfaces that move like they mean it",
  subtitle = "A prop-driven catalog of animated sections and atoms — copy the code, keep the motion.",
  primaryCtaLabel = "Get started",
  secondaryCtaLabel = "View docs",
  align = "center",
}) {
  const alignClass = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <section className="relative w-full overflow-hidden bg-[#0A0C10] px-6 py-24">
      <style>{`
        @keyframes atelier-blob-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(3%, -4%) scale(1.08); }
        }
      `}</style>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[560px] h-[560px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #D9A441 0%, #5B8DEF 55%, transparent 75%)",
          animation: "atelier-blob-float 12s ease-in-out infinite",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={`relative max-w-2xl mx-auto flex flex-col gap-5 ${alignClass}`}
      >
        <motion.span
          variants={item}
          className="text-[11px] uppercase tracking-[0.14em] font-mono text-[#D9A441] px-3 py-1 rounded-full border border-[#D9A441]/30 bg-[#D9A441]/10"
        >
          {eyebrow}
        </motion.span>

        <motion.h1
          variants={item}
          className="font-serif text-4xl md:text-5xl leading-[1.1] text-[#E9EBF0]"
        >
          {title}
        </motion.h1>

        <motion.p variants={item} className="text-base text-[#8A93A6] leading-relaxed max-w-xl">
          {subtitle}
        </motion.p>

        <motion.div variants={item} className="flex items-center gap-3 mt-2">
          <button className="px-5 py-2.5 rounded-md bg-[#D9A441] text-[#0A0C10] text-sm font-semibold hover:brightness-110 transition-[filter]">
            {primaryCtaLabel}
          </button>
          <button className="px-5 py-2.5 rounded-md border border-[#242832] text-[#E9EBF0] text-sm font-medium hover:border-[#5B8DEF]/50 transition-colors">
            {secondaryCtaLabel}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default AnimatedHero;
