"use client";

import { useState } from "react";
import { motion } from "motion/react";

export function AnimatedNavbar({
  brand = "Atelier",
  links = [
    { label: "Product", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Docs", href: "#" },
  ],
  ctaLabel = "Get started",
  sticky = true,
  transparent = false,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={[
        "w-full text-[#E9EBF0]",
        sticky ? "sticky top-0 z-10" : "",
        transparent
          ? "bg-[#0A0C10]/60 backdrop-blur-md"
          : "bg-[#0D1016] border-b border-[#1B1F27]",
      ].join(" ")}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <span className="font-serif text-lg tracking-tight">{brand}</span>

        <div className="hidden md:flex items-center gap-8 text-sm text-[#8A93A6]">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#E9EBF0] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <button className="px-4 py-2 rounded-md bg-[#D9A441] text-[#0A0C10] text-sm font-semibold hover:brightness-110 transition-[filter]">
            {ctaLabel}
          </button>
        </div>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden p-2 rounded-md border border-[#242832] text-[#8A93A6]"
          aria-label="Toggle menu"
        >
          <span className="block w-4 h-[1.5px] bg-current mb-1" />
          <span className="block w-4 h-[1.5px] bg-current" />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3 text-sm text-[#8A93A6] border-t border-[#1B1F27]">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="pt-3 hover:text-[#E9EBF0]">
              {link.label}
            </a>
          ))}
          <button className="mt-1 px-4 py-2 rounded-md bg-[#D9A441] text-[#0A0C10] text-sm font-semibold">
            {ctaLabel}
          </button>
        </div>
      )}
    </motion.nav>
  );
}

export default AnimatedNavbar;
