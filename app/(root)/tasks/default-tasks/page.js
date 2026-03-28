import React from "react";
import DefaultTasksPage from "@/components/taskings/DefaultTasksPage";

const DefaultTasks = async ({ params }) => {
   const { route } = await params;
   return (

      <>
         {/* <DefaultTasksPage route={route} /> */}
      </>

   );
};

export default DefaultTasks;
