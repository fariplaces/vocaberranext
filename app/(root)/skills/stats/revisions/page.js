'use client'
import RevisionStats from '@/components/skills/RevisionStatsPage'
import { fetchRevisions } from '@/store/slices/skillSlice';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const RevisionStat = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchRevisions());
   }, []);

   return (
      <RevisionStats />
   )
}

export default RevisionStat
