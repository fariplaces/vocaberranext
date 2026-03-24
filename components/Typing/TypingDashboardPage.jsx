"use client";
import TypingBarChart from "@/components/Typing/TypingBarChart";
import { fetchTypings } from "@/store/slices/typingSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TypingDashboardPage = ({ route }) => {
  const { typings } = useSelector((state) => state.typing);
  const dispatch = useDispatch();

  const isExercises = route === "exercises";
  const isTests = route === "tests";


  useEffect(() => {
    dispatch(fetchTypings());
  }, []);

  const groupedLessons = isExercises
    ? typings.reduce((acc, item) => {
      const lessonName = item.exercise.lesson.lesson;

      if (lessonName.toUpperCase() === "TEST") return acc;

      if (!acc[lessonName]) acc[lessonName] = [];

      acc[lessonName].push({
        name: item.exercise.exerciseNo,
        gross: item.gross,
        net: item.net,
        fullTitle: item.exercise.title,
      });

      return acc;
    }, {})
    : {};


  const groupedTestsByDuration = isTests
    ? typings.reduce((acc, item) => {
      if (item.exercise.lesson.lesson.toUpperCase() !== "TEST")
        return acc;

      const durationLabel = item.duration.duration;

      if (!acc[durationLabel]) acc[durationLabel] = [];

      acc[durationLabel].push({
        name: item.exercise.title,
        gross: item.gross,
        net: item.net,
      });

      return acc;
    }, {})
    : {};


  const sortedLessonNames = Object.keys(groupedLessons).sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true })
  );

  const sortedDurations = Object.keys(groupedTestsByDuration).sort(
    (a, b) => parseInt(a) - parseInt(b)
  );



  return (
    <>
      <div className="w-full text-center text-3xl py-6">
        {isExercises ? "Typing Course Stats" : "Typing Test Stats"}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {isExercises &&
          sortedLessonNames.map((lessonName) => (
            <TypingBarChart
              key={lessonName}
              title={`${lessonName} Performance`}
              data={groupedLessons[lessonName]}
            />
          ))}

        {isTests &&
          sortedDurations.map((duration) => (
            <TypingBarChart
              key={duration}
              title={`Test Performance (${duration} Duration)`}
              data={groupedTestsByDuration[duration]}
            />
          ))}
      </div>
    </>
  );
};

export default TypingDashboardPage;
