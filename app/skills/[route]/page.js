import React from 'react'
import TopicsPage from '@/components/skills/topic2/TopicsPage';

const Topics = async ({ params }) => {
   const { route } = await params;
   return (
      <TopicsPage route={route} />
   )
}

export default Topics