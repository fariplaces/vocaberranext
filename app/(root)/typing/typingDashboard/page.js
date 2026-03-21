"use client";
import ExerciseBarChart from "@/components/Typing/ExerciseBarChart";
import ExerciseSingleBarChart from "@/components/Typing/ExerciseSingleBarChart";
import { fetchTypings } from "@/store/slices/typingSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TypingDashboard = () => {
  const { typingData } = useSelector((state) => state.typing);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTypings());
  }, []);
  // Exercise Chart Data
  const groupedLessons = typingData.reduce((acc, item) => {
    const lessonName = item.exercise.lesson.lesson;

    // 1. Skip the record if the lesson is "TEST"
    if (lessonName.toUpperCase() === "TEST") return acc;

    if (!acc[lessonName]) acc[lessonName] = [];

    acc[lessonName].push({
      name: item.exercise.exerciseNo,
      gross: item.gross,
      net: item.net,
      fullTitle: item.exercise.title,
    });

    return acc;
  }, {});

  // 2. Sort the lessons numerically (so Lesson 2 comes before Lesson 10)
  const sortedLessonNames = Object.keys(groupedLessons).sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true })
  );

  // Test Chart Data
  const groupedTestsByDuration = typingData.reduce((acc, item) => {
    // 1. Only process if the lesson is "TEST"
    if (item.exercise.lesson.lesson.toUpperCase() !== "TEST") return acc;

    const durationLabel = item.duration.duration; // e.g., "2M", "5M"

    if (!acc[durationLabel]) acc[durationLabel] = [];

    acc[durationLabel].push({
      name: item.exercise.title, // For Tests, use Title as X-Axis since exerciseNo is null
      gross: item.gross,
      net: item.net,
    });

    return acc;
  }, {});

  // 2. Sort the duration labels (optional: e.g., 2M, 5M, 10M)
  const sortedDurations = Object.keys(groupedTestsByDuration).sort(
    (a, b) => parseInt(a) - parseInt(b)
  );

  return (
    <>
      <div className="w-full text-center text-6xl py-6">
        Typing Course Stats
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {sortedLessonNames.map((lessonName) => (
          <ExerciseBarChart
            key={lessonName}
            title={`${lessonName} Performance`}
            data={groupedLessons[lessonName]}
          />
        ))}
      </div>
      <div className="w-full text-center text-6xl py-6">Typing Test Stats</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {sortedDurations.map((duration) => (
          <ExerciseBarChart
            key={duration}
            title={`Test Performance (${duration} Duration)`}
            data={groupedTestsByDuration[duration]}
          />
        ))}
      </div>
    </>
  );
};

export default TypingDashboard;
