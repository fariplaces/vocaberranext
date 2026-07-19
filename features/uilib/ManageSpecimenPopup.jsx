"use client";

import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createUilibComponent, updateUilibComponent } from "@/store/actions/uilibActions";
import { selectUilibManagePopupMeta } from "@/store/selectors/uilibFormSelectors";
import { selectUilibLoading } from "@/store/selectors/uilibSelectors";
import { closeManagePopup, setManageFormData } from "@/store/slices/uilibFormSlice";
import { KNOWN_ENUMS } from "./registry";
import { PlusIcon, TrashIcon, XIcon } from "./icons";

function ChildRow({ child, onChange, onRemove }) {
  return (
    <div className="relative rounded-lg border border-[#242832] bg-[#0D1016] p-3 flex flex-col gap-2">
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 text-[#5C6272] hover:text-[#E2574C]"
        aria-label="Remove part"
      >
        <TrashIcon width={14} height={14} />
      </button>
      <label className="text-[10px] uppercase tracking-wide text-[#5C6272] font-mono">
        Component key
        <input
          value={child.component || ""}
          onChange={(e) => onChange({ ...child, component: e.target.value })}
          placeholder="CardHeader"
          className="mt-1 w-full rounded px-2 py-1 bg-[#171B22] text-[#E9EBF0] border border-[#242832] text-xs font-mono"
        />
      </label>
      <label className="text-[10px] uppercase tracking-wide text-[#5C6272] font-mono">
        Props (JSON)
        <input
          defaultValue={JSON.stringify(child.props || {})}
          onBlur={(e) => {
            try {
              onChange({ ...child, props: JSON.parse(e.target.value) });
            } catch {
              /* ignore invalid JSON until fixed */
            }
          }}
          placeholder='{"title":"..."}'
          className="mt-1 w-full rounded px-2 py-1 bg-[#171B22] text-[#E9EBF0] border border-[#242832] text-xs font-mono"
        />
      </label>
    </div>
  );
}

export function ManageSpecimenPopup() {
  const dispatch = useDispatch();
  const { isOpen, editId, formData } = useSelector(selectUilibManagePopupMeta);
  const loading = useSelector(selectUilibLoading);

  if (!isOpen) return null;

  const isEdit = !!editId;
  const updateField = (patch) => dispatch(setManageFormData({ ...formData, ...patch }));

  const addChild = () =>
    updateField({ children: [...(formData.children || []), { component: "", props: {} }] });
  const updateChild = (idx, next) =>
    updateField({
      children: formData.children.map((c, i) => (i === idx ? next : c)),
    });
  const removeChild = (idx) =>
    updateField({ children: formData.children.filter((_, i) => i !== idx) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = {
      ...formData,
      children: (formData.children || []).filter((c) => c.component),
    };
    try {
      if (isEdit) {
        await dispatch(updateUilibComponent({ id: editId, ...trimmed })).unwrap();
      } else {
        await dispatch(createUilibComponent(trimmed)).unwrap();
      }
      dispatch(closeManagePopup());
    } catch (error) {
      toast.error(`Submission failed: ${error}`);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      style={{ backdropFilter: "blur(3px)" }}
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-[#12151B] p-7 rounded-xl border border-[#242832] w-full max-w-xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-[#5C6272] hover:text-[#E9EBF0]"
          aria-label="Close"
          onClick={() => dispatch(closeManagePopup())}
        >
          <XIcon width={18} height={18} />
        </button>
        <div className="text-[10px] uppercase tracking-[0.14em] text-[#D9A441] font-mono mb-1">
          {isEdit ? "Edit specimen" : "New specimen"}
        </div>
        <h2 className="font-serif text-2xl text-[#E9EBF0] mb-5">
          {isEdit ? formData.name || "Untitled" : "Add a component"}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <label className="block text-xs font-semibold text-[#8A93A6]">
              Name
              <input
                required
                value={formData.name}
                onChange={(e) => updateField({ name: e.target.value })}
                className="w-full mt-1 rounded-md px-2 py-1.5 bg-[#0D1016] text-[#E9EBF0] border border-[#242832] text-sm"
                placeholder="Ghost Button"
              />
            </label>
            <label className="block text-xs font-semibold text-[#8A93A6]">
              Category
              <input
                value={formData.category}
                onChange={(e) => updateField({ category: e.target.value })}
                className="w-full mt-1 rounded-md px-2 py-1.5 bg-[#0D1016] text-[#E9EBF0] border border-[#242832] text-sm"
                placeholder="Buttons"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="block text-xs font-semibold text-[#8A93A6]">
              Engine
              <select
                value={formData.engine || "css"}
                onChange={(e) => updateField({ engine: e.target.value })}
                className="w-full mt-1 rounded-md px-2 py-1.5 bg-[#0D1016] text-[#E9EBF0] border border-[#242832] text-xs font-mono"
              >
                {KNOWN_ENUMS.engine.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs font-semibold text-[#8A93A6]">
              Preview layout
              <select
                value={formData.layout || "boxed"}
                onChange={(e) => updateField({ layout: e.target.value })}
                className="w-full mt-1 rounded-md px-2 py-1.5 bg-[#0D1016] text-[#E9EBF0] border border-[#242832] text-xs font-mono"
              >
                {KNOWN_ENUMS.layout.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block text-xs font-semibold text-[#8A93A6]">
            Description
            <input
              required
              value={formData.description}
              onChange={(e) => updateField({ description: e.target.value })}
              className="w-full mt-1 rounded-md px-2 py-1.5 bg-[#0D1016] text-[#E9EBF0] border border-[#242832] text-sm"
              placeholder="What this specimen is for"
            />
          </label>

          <label className="block text-xs font-semibold text-[#8A93A6]">
            Component key
            <input
              required
              value={formData.component}
              onChange={(e) => updateField({ component: e.target.value })}
              className="w-full mt-1 rounded-md px-2 py-1.5 bg-[#0D1016] text-[#E9EBF0] border border-[#242832] text-xs font-mono"
              placeholder="DemoButton — must match a key in the registry"
            />
          </label>

          <label className="block text-xs font-semibold text-[#8A93A6]">
            Import statement
            <input
              value={formData.importStatement}
              onChange={(e) => updateField({ importStatement: e.target.value })}
              className="w-full mt-1 rounded-md px-2 py-1.5 bg-[#0D1016] text-[#E9EBF0] border border-[#242832] text-xs font-mono"
              placeholder={`import { DemoButton } from "..."`}
            />
          </label>

          <label className="block text-xs font-semibold text-[#8A93A6]">
            Default props (JSON)
            <input
              defaultValue={JSON.stringify(formData.props || {})}
              onBlur={(e) => {
                try {
                  updateField({ props: JSON.parse(e.target.value) });
                } catch {
                  /* ignore until valid */
                }
              }}
              className="w-full mt-1 rounded-md px-2 py-1.5 bg-[#0D1016] text-[#E9EBF0] border border-[#242832] text-xs font-mono"
              placeholder='{"variant":"primary"}'
            />
          </label>

          <label className="block text-xs font-semibold text-[#8A93A6]">
            Text content (used only if no compound parts below)
            <input
              value={formData.label}
              onChange={(e) => updateField({ label: e.target.value })}
              className="w-full mt-1 rounded-md px-2 py-1.5 bg-[#0D1016] text-[#E9EBF0] border border-[#242832] text-sm"
              placeholder="Click me"
            />
          </label>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#8A93A6]">
                Compound parts (optional)
              </span>
              <button
                type="button"
                onClick={addChild}
                className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-md bg-[#171B22] border border-[#242832] text-[#8A93A6] hover:text-[#D9A441] hover:border-[#D9A441]/50"
              >
                <PlusIcon width={12} height={12} /> Add part
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {(formData.children || []).map((child, idx) => (
                <ChildRow
                  key={idx}
                  child={child}
                  onChange={(next) => updateChild(idx, next)}
                  onRemove={() => removeChild(idx)}
                />
              ))}
            </div>
          </div>

          <label className="block text-xs font-semibold text-[#8A93A6]">
            Real-world usage snippet
            <textarea
              rows={3}
              value={formData.implementation}
              onChange={(e) => updateField({ implementation: e.target.value })}
              className="w-full mt-1 rounded-md px-2 py-1.5 bg-[#0D1016] text-[#E9EBF0] border border-[#242832] font-mono text-xs"
              placeholder="// how this is actually used in the app"
            />
          </label>

          <label className="block text-xs font-semibold text-[#8A93A6]">
            Documentation (Markdown)
            <textarea
              rows={5}
              value={formData.detailDocs}
              onChange={(e) => updateField({ detailDocs: e.target.value })}
              className="w-full mt-1 rounded-md px-2 py-1.5 bg-[#0D1016] text-[#E9EBF0] border border-[#242832] font-mono text-xs"
              placeholder="## Documentation"
            />
          </label>

          <div className="flex gap-3 justify-end mt-2">
            <button
              type="button"
              className="px-4 py-2 rounded-md bg-[#171B22] hover:bg-[#1B1F27] border border-[#242832] text-[#C7CCD8] text-sm"
              onClick={() => dispatch(closeManagePopup())}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-[#D9A441] hover:brightness-110 text-[#0A0C10] font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Saving…" : isEdit ? "Save changes" : "Add specimen"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ManageSpecimenPopup;
