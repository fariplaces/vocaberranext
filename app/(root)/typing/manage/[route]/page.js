import ExercisePage from '@/components/Typing/ExercisePage';
import React from 'react'

const Exercise = async ({ params }) => {
   const { route } = await params;
   return (
      <ExercisePage route={route} />
   )
}

export default Exercise