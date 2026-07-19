"use client";

import { motion } from "motion/react";

export function AnimatedAboutSection({
  heading = "Built for teams who ship fast",
  text = "Every specimen in this catalog is a real, reusable component — not a screenshot. Drop it in, wire up the props, and it behaves exactly like it does here.",
  stats = [
    { label: "Components", value: "40+" },
    { label: "Frameworks", value: "3" },
    { label: "Setup time", value: "0 min" },
  ],
  reverse = false,
}) {
  return (
    <section className="w-full bg-[#0A0C10] px-6 py-20">
      <div
        className={`max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center ${
          reverse ? "md:[direction:rtl]" : ""
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="md:[direction:ltr] flex flex-col gap-4"
        >
          <h2 className="font-serif text-3xl text-[#E9EBF0] leading-tight">{heading}</h2>
          <p className="text-sm text-[#8A93A6] leading-relaxed max-w-md">{text}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="md:[direction:ltr] grid grid-cols-3 gap-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
              }}
              className="rounded-xl border border-[#242832] bg-[#0D1016] p-5 text-center"
            >
              <div className="font-serif text-2xl text-[#D9A441]">{stat.value}</div>
              <div className="text-[11px] uppercase tracking-wide text-[#5C6272] mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default AnimatedAboutSection;
