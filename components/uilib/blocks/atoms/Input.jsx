export function Input({
  label = "Label",
  placeholder = "",
  type = "text",
  disabled = false,
}) {
  return (
    <label className="flex flex-col gap-1.5 text-xs text-[#8A93A6] w-56">
      {label}
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className="rounded-md px-3 py-2 bg-[#0D1016] border border-[#242832] text-[#E9EBF0] text-sm placeholder:text-[#5C6272] focus:outline-none focus:border-[#D9A441]/60 disabled:opacity-40"
      />
    </label>
  );
}

export default Input;
