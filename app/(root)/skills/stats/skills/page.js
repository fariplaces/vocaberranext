'use client'
import RevisionStats from '@/components/skills/RevisionStatsPage'
import SkillProgress from '@/components/skills/SkillProgress';
import { fetchRevisions, fetchSkills, fetchTopics } from '@/store/slices/skillSlice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const SkillStats = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchSkills());
      // dispatch(fetchTopics());
      dispatch(fetchRevisions());
   }, []);

   return (
      <SkillProgress />
   )
}

export default SkillStats
