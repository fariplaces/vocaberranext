export function DemoButton({
  children,
  variant = "default",
  rounded = "md",
  stroke = false,
  hover = false,
  bgColor = "black",
  data,
  ...rest
}) {
  const bgBase =
    bgColor === "blue"
      ? "bg-[#5B8DEF] text-[#0A0C10]"
      : bgColor === "white"
      ? "bg-[#E9EBF0] text-[#0A0C10]"
      : "bg-[#0A0C10] text-[#E9EBF0]";
  const border = stroke
    ? "border-2 border-[#D9A441]"
    : "border border-transparent";
  const round =
    rounded === "full"
      ? "rounded-full"
      : rounded === "lg"
      ? "rounded-lg"
      : rounded === "sm"
      ? "rounded-sm"
      : rounded === "none"
      ? "rounded-none"
      : "rounded-md";
  const hoverClass = hover ? "hover:brightness-110 transition-[filter]" : "";
  let variantClass = "";
  switch (variant) {
    case "danger":
      variantClass = "!bg-[#E2574C] !text-white";
      break;
    case "primary":
      variantClass = "!bg-[#D9A441] !text-[#0A0C10]";
      break;
    case "outline":
      variantClass = "!bg-transparent border !border-[#8A93A6] !text-[#E9EBF0]";
      break;
    default:
      break;
  }
  return (
    <button
      className={[
        "px-4 py-2 font-medium text-sm",
        bgBase,
        border,
        round,
        hoverClass,
        variantClass,
      ]
        .filter(Boolean)
        .join(" ")}
      data-demo={data ? JSON.stringify(data) : undefined}
      {...rest}
    >
      {children ?? "Click me"}
    </button>
  );
}

export default DemoButton;
