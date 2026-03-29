'use client'
import TaskStats from '@/components/taskings/TasksStats'
import { fetchTasks } from '@/store/slices/taskSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const TaskingStats = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(fetchTasks());
   }, [])
   return (
      <TaskStats />
   )
}

export default TaskingStats
