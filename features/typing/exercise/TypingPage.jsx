"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ContentTitle from "@/components/ContentTitle";
import { Plus } from "lucide-react";
import {
  fetchDurations,
  fetchLessons,
  fetchTypings,
} from "@/store/actions/typingActions";
import { openManagePopup } from "@/store/slices/typingSlices/typingFormSlice";
import {
  resetTypingState,
  setFilterMode,
} from "@/store/slices/typingSlices/typingSlice";
import { FORM_DOMAINS } from "@/store/constants/typingConstants";
import RenderTyping from "./RenderTyping";
import ManageTypingPopup from "./ManageTypingPopup";
import DeleteTypingPopup from "./DeleteTypingPopup";

const TypingPage = ({ route }) => {
  const dispatch = useDispatch();
  const domain = FORM_DOMAINS.TYPINGS;

  useEffect(() => {
    dispatch(fetchLessons());
    dispatch(fetchDurations());
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetTypingState());
    dispatch(setFilterMode(route));
    dispatch(fetchTypings({ page: 1, route }));
  }, [route, dispatch]);

  const handleAddClick = () => {
    dispatch(
      openManagePopup({
        domain,
        defaults:
          route === "course"
            ? { durationId: "ed238f81-d08b-4315-912b-a7df01aa7f46" }
            : "",
      }),
    );
  };

  return (
    <>
      <ContentTitle
        title={route === "course" ? "Typing Exercises" : "Typing Tests"}
        btnTitle={route === "course" ? "Add Exercise" : "Add Test"}
        Icon={Plus}
        handleMethod={handleAddClick}
      />
      <RenderTyping route={route} domain={domain} />
      <ManageTypingPopup domain={domain} />
      <DeleteTypingPopup domain={domain} />
    </>
  );
};

export default TypingPage;
