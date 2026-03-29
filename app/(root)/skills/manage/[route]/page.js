import CategoriesPage from '@/components/skills/CategoriesPage'
import React from 'react'

const Categories = async ({ params }) => {
   const { route } = await params;
   return (
      <CategoriesPage route={route} />
   )
}

export default Categories