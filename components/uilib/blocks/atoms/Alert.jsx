export function Alert({ tone = "info", title = "Heads up", message = "" }) {
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
}

export default Alert;
