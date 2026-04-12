"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ContentTitle from "@/components/ContentTitle";
import { Plus } from "lucide-react";
import RenderTyping from "@/components/Typing/RenderTyping";
import ManageTypingPopup from "@/components/Typing/ManageTypingPopup";
import DeleteTypingPopup from "@/components/Typing/DeleteTypingPopup";
import { fetchDurations, fetchLessons, fetchTypings } from "@/store/actions/typingActions";
import { openManagePopup } from "@/store/slices/typingSlices/typingFormSlice";
import { resetTypingState, setFilterMode } from "@/store/slices/typingSlices/typingSlice";

const TypingPage = ({ route }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLessons());
    dispatch(fetchDurations());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setFilterMode(route));
    dispatch(resetTypingState());
    dispatch(fetchTypings({ page: 1, route }));
  }, [route, dispatch]);

  const handleAddClick = () => {
    dispatch(openManagePopup({
      route,
      defaultDurationId: "ed238f81-d08b-4315-912b-a7df01aa7f46"
    }));
  };

  return (
    <>
      <ContentTitle
        title={route === "course" ? "Typing Exercises" : "Typing Tests"}
        btnTitle={route === "course" ? "Add Exercise" : "Add Test"}
        Icon={Plus}
        handleMethod={handleAddClick}
      />
      <RenderTyping route={route} />
      <ManageTypingPopup route={route} />
      <DeleteTypingPopup />
    </>
  );
};

export default TypingPage;