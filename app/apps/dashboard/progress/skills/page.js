'use client'
import SkillProgress from '@/components/skills/SkillProgress';
import { fetchRevisions, fetchSkills } from '@/store/actions/skillActions';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const SkillStats = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchSkills());
      dispatch(fetchRevisions());
   }, []);

   return (
      <SkillProgress />
   )
}

export default SkillStats
