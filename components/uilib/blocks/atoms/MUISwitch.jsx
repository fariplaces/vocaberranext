export function MUISwitch({
  variant = "default",
  rounded = "md",
  stroke = false,
  hover = false,
  data,
  children,
  ...rest
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-[#C7CCD8]">
      <span>Switch</span>
      <input
        type="checkbox"
        className={[
          "accent-[#D9A441]",
          rounded === "full" ? "rounded-full" : "rounded",
          stroke ? "outline outline-2 outline-[#D9A441]" : "",
          hover ? "hover:scale-110 transition-transform" : "",
          variant === "danger" ? "accent-[#E2574C]" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        data-demo={data ? JSON.stringify(data) : undefined}
        {...rest}
      />
    </label>
  );
}

export default MUISwitch;
