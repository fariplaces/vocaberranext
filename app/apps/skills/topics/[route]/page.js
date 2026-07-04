import React from "react";
import RevisionPage from "@/features/skills/manage/revisions/RevisionPage";

const Revision = async ({ params }) => {
  const { route } = await params;
  return <RevisionPage route={route} />;
};

export default Revision;
