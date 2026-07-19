"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "motion/react";

export function AnimatedFooter({
  brand = "Atelier",
  tagline = "Animated components, shipped.",
  columns = [
    { title: "Product", links: [{ label: "Overview", href: "#" }, { label: "Pricing", href: "#" }] },
    { title: "Resources", links: [{ label: "Docs", href: "#" }, { label: "Changelog", href: "#" }] },
    { title: "Company", links: [{ label: "About", href: "#" }, { label: "Contact", href: "#" }] },
  ],
  marqueeText = "Atelier UI · Motion · GSAP · Three.js · ",
  year = new Date().getFullYear(),
}) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      const distance = track.scrollWidth / 2;
      gsap.set(track, { x: 0 });
      gsap.to(track, {
        x: -distance,
        duration: Math.max(distance / 60, 4),
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, [marqueeText]);

  return (
    <footer className="w-full bg-[#0A0C10] border-t border-[#1B1F27]">
      <div className="overflow-hidden border-b border-[#1B1F27] py-3">
        <div ref={trackRef} className="flex w-max gap-6 whitespace-nowrap text-xs font-mono text-[#5C6272]">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i}>{marqueeText.repeat(6)}</span>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-[1.2fr_repeat(3,1fr)]"
      >
        <div className="flex flex-col gap-2">
          <span className="font-serif text-lg text-[#E9EBF0]">{brand}</span>
          <p className="text-sm text-[#8A93A6] max-w-xs">{tagline}</p>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <div className="text-[11px] uppercase tracking-wide text-[#5C6272] font-mono">
              {col.title}
            </div>
            <div className="flex flex-col gap-2">
              {col.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[#8A93A6] hover:text-[#E9EBF0] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 pb-8 text-[11px] font-mono text-[#5C6272]">
        © {year} {brand}. All rights reserved.
      </div>
    </footer>
  );
}

export default AnimatedFooter;
