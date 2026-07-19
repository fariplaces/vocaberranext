import { prisma } from "@/lib/prisma";

//* Safely parse a JSON text column, falling back if it's malformed/empty
function safeParse(text, fallback) {
  try {
    return text ? JSON.parse(text) : fallback;
  } catch {
    return fallback;
  }
}

//* Shape a raw row into the object/array props the frontend registry expects
function serializeComponent(row) {
  if (!row) return row;
  return {
    ...row,
    props: safeParse(row.props, {}),
    children: safeParse(row.children, []),
  };
}

export const uilibDbServices = {
  //* ==========================================
  // --- COMPONENTS (specimens) ---
  //* ==========================================

  //* Fetch all specimens, ordered for stable catalog layout
  getComponents: async () => {
    const components = await prisma.uILibComponent.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });

    return components.map(serializeComponent);
  },

  //* Create a specimen
  createComponent: async ({
    category,
    name,
    description,
    component,
    engine,
    layout,
    importStatement,
    props,
    label,
    children,
    implementation,
    detailDocs,
    order,
  }) => {
    if (!name || !component) {
      throw { status: 400, message: "Specimen name and component key are required" };
    }

    const created = await prisma.uILibComponent.create({
      data: {
        category: category || "Uncategorized",
        name,
        description: description || null,
        component,
        engine: engine || "css",
        layout: layout || "boxed",
        importStatement: importStatement || null,
        props: JSON.stringify(props || {}),
        label: label ?? null,
        children: JSON.stringify(children || []),
        implementation: implementation || null,
        detailDocs: detailDocs || null,
        order: order ? Number(order) : 0,
      },
    });

    return serializeComponent(created);
  },

  //* Update a specimen (partial)
  updateComponent: async (id, data) => {
    if (!id) {
      throw { status: 400, message: "Specimen ID is required" };
    }

    const {
      category,
      name,
      description,
      component,
      engine,
      layout,
      importStatement,
      props,
      label,
      children,
      implementation,
      detailDocs,
      order,
    } = data;

    try {
      const updated = await prisma.uILibComponent.update({
        where: { id },
        data: {
          ...(category !== undefined && { category }),
          ...(name !== undefined && { name }),
          ...(description !== undefined && { description }),
          ...(component !== undefined && { component }),
          ...(engine !== undefined && { engine }),
          ...(layout !== undefined && { layout }),
          ...(importStatement !== undefined && { importStatement }),
          ...(props !== undefined && { props: JSON.stringify(props || {}) }),
          ...(label !== undefined && { label }),
          ...(children !== undefined && { children: JSON.stringify(children || []) }),
          ...(implementation !== undefined && { implementation }),
          ...(detailDocs !== undefined && { detailDocs }),
          ...(order !== undefined && { order: order !== null ? Number(order) : 0 }),
        },
      });

      return serializeComponent(updated);
    } catch (prismaError) {
      if (prismaError.code === "P2025") {
        throw { status: 404, message: "Specimen not found" };
      }
      throw prismaError;
    }
  },

  //* Delete a specimen
  deleteComponent: async (id) => {
    if (!id) {
      throw { status: 400, message: "Specimen ID is required" };
    }

    try {
      const deleted = await prisma.uILibComponent.delete({ where: { id } });
      return serializeComponent(deleted);
    } catch (prismaError) {
      if (prismaError.code === "P2025") {
        throw { status: 404, message: "Specimen not found" };
      }
      throw prismaError;
    }
  },

  //* ==========================================
  // --- README (single shared doc) ---
  //* ==========================================

  //* Fetch the shared README doc
  getReadme: async () => {
    return await prisma.uILibDoc.findUnique({ where: { key: "main" } });
  },

  //* Create-or-update the shared README doc
  upsertReadme: async (content) => {
    if (content === undefined || content === null) {
      throw { status: 400, message: "README content is required" };
    }

    return await prisma.uILibDoc.upsert({
      where: { key: "main" },
      update: { content },
      create: { key: "main", content },
    });
  },
};
