// features/uilib/utils.js
export { slugify } from "./codegen";

// Groups specimens by category, then applies the search query across
// name/description/category. Shared by CatalogSidebar (nav links) and
// RenderSpecimens (the actual sections) so both stay in sync.
export function groupAndFilterSpecimens(blocks, query) {
  const map = new Map();
  blocks.forEach((b) => {
    const cat = b.category || "Uncategorized";
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat).push(b);
  });
  const categories = Array.from(map.entries());

  if (!query?.trim()) return categories;
  const q = query.toLowerCase();
  return categories
    .map(([cat, items]) => [
      cat,
      items.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          (b.description || "").toLowerCase().includes(q) ||
          cat.toLowerCase().includes(q)
      ),
    ])
    .filter(([, items]) => items.length > 0);
}
