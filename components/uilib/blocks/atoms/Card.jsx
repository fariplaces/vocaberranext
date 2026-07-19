export function Card({ children, variant = "default", padding = "md" }) {
  const pad = padding === "lg" ? "p-6" : padding === "sm" ? "p-3" : "p-4";
  const variantClass =
    variant === "elevated"
      ? "shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)] border-[#242832]"
      : variant === "outlined"
      ? "border-[#D9A441]/40"
      : "border-[#242832]";
  return (
    <div
      className={`w-72 rounded-xl border bg-[#0D1016] ${variantClass} ${pad} flex flex-col gap-3`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ eyebrow, title = "Title" }) {
  return (
    <div>
      {eyebrow && (
        <div className="text-[10px] tracking-[0.14em] uppercase text-[#D9A441] font-mono mb-1">
          {eyebrow}
        </div>
      )}
      <div className="text-base font-semibold text-[#E9EBF0]">{title}</div>
    </div>
  );
}

export function CardBody({ text = "" }) {
  return <p className="text-xs text-[#8A93A6] leading-relaxed">{text}</p>;
}

export function CardFooter({ price, ctaLabel = "Choose", badge }) {
  return (
    <div className="flex items-center justify-between pt-3 border-t border-[#1B1F27]">
      <div className="flex items-center gap-2">
        {price && (
          <span className="text-sm font-semibold text-[#E9EBF0]">{price}</span>
        )}
        {badge && (
          <span className="px-2 py-0.5 rounded-full bg-[#D9A441]/15 text-[#D9A441] text-[10px] font-mono">
            {badge}
          </span>
        )}
      </div>
      <button className="px-3 py-1.5 rounded-md bg-[#D9A441] text-[#0A0C10] text-xs font-semibold hover:brightness-110 transition-[filter]">
        {ctaLabel}
      </button>
    </div>
  );
}

export default Card;
