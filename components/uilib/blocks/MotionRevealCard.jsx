"use client";

import { motion } from "motion/react";

const TONE_STYLES = {
  default: { border: "border-[#242832]", accent: "#8A93A6" },
  info: { border: "border-[#5B8DEF]/40", accent: "#5B8DEF" },
  success: { border: "border-[#4FAE7C]/40", accent: "#4FAE7C" },
  warning: { border: "border-[#D9A441]/40", accent: "#D9A441" },
  danger: { border: "border-[#E2574C]/40", accent: "#E2574C" },
};

const OFFSETS = {
  up: { y: 1 },
  down: { y: -1 },
  left: { x: 1 },
  right: { x: -1 },
};

export function MotionRevealCard({
  direction = "up",
  distance = 24,
  duration = 0.6,
  delay = 0,
  hoverLift = true,
  tone = "default",
  title = "Motion Reveal",
  text = "Animated entrance driven entirely by props.",
}) {
  const offset = OFFSETS[direction] || OFFSETS.up;
  const toneStyle = TONE_STYLES[tone] || TONE_STYLES.default;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: (offset.x || 0) * distance,
        y: (offset.y || 0) * distance,
      }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      whileHover={hoverLift ? { y: -6, transition: { duration: 0.25 } } : undefined}
      className={`w-72 rounded-xl border bg-[#0D1016] p-5 flex flex-col gap-2 ${toneStyle.border}`}
    >
      <div
        className="text-[10px] uppercase tracking-[0.14em] font-mono mb-1"
        style={{ color: toneStyle.accent }}
      >
        Motion
      </div>
      <div className="text-base font-semibold text-[#E9EBF0]">{title}</div>
      <p className="text-xs text-[#8A93A6] leading-relaxed">{text}</p>
    </motion.div>
  );
}

export default MotionRevealCard;
