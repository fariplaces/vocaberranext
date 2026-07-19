"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const TONE_BG = {
  default: "bg-[#171B22] text-[#C7CCD8] border-[#242832]",
  info: "bg-[#5B8DEF]/10 text-[#5B8DEF] border-[#5B8DEF]/30",
  success: "bg-[#4FAE7C]/10 text-[#4FAE7C] border-[#4FAE7C]/30",
  warning: "bg-[#D9A441]/10 text-[#D9A441] border-[#D9A441]/30",
  danger: "bg-[#E2574C]/10 text-[#E2574C] border-[#E2574C]/30",
};

export function GsapMarqueeBadge({
  label = "New specimen shipped",
  speed = 40,
  direction = "left",
  pauseOnHover = true,
  tone = "info",
}) {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      const distance = track.scrollWidth / 2;
      const duration = Math.max(distance / Math.max(speed, 1), 1);
      const fromX = direction === "right" ? -distance : 0;
      const toX = direction === "right" ? 0 : -distance;

      gsap.set(track, { x: fromX });
      tweenRef.current = gsap.to(track, {
        x: toX,
        duration,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, [speed, direction, label]);

  const toneClass = TONE_BG[tone] || TONE_BG.default;

  return (
    <div
      className={`w-72 overflow-hidden rounded-full border px-4 py-2.5 ${toneClass}`}
      onMouseEnter={() => pauseOnHover && tweenRef.current?.pause()}
      onMouseLeave={() => pauseOnHover && tweenRef.current?.resume()}
    >
      <div
        ref={trackRef}
        className="flex w-max gap-8 whitespace-nowrap text-xs font-mono"
      >
        <span>{label}</span>
        <span>{label}</span>
      </div>
    </div>
  );
}

export default GsapMarqueeBadge;
