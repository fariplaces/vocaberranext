import ManageExercisePage from '@/components/Typing/ManageExercisePage'
import React from 'react'

const MangeExercisesPage = async ({ params }) => {
   const { route } = await params;
   return (
      <ManageExercisePage route={route} />
   )
}

export default MangeExercisesPage