import React from "react";
import TaskingPage from "@/components/taskings/TaskingPage";

const Taskings = async ({ params }) => {
   const { route } = await params;
   return (

      <>
         <TaskingPage route={route} />
      </>

   );
};

export default Taskings;
