import React from "react";
import SkillRIII from "@/components/skills/SkillRIII";

const SkillImprovement = async ({ params }) => {
   const { route } = await params;
   return (

      <>

         <SkillRIII route={route} />
      </>

   );
};

export default SkillImprovement;
