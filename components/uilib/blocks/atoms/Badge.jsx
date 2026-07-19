export function Badge({ label = "Badge", tone = "default" }) {
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
}

export default Badge;
