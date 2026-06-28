"use client";
import React, { useEffect } from "react";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchSkills,
  fetchTopics,
} from "@/store/actions/skillActions";
import ManageCategoryPopup from "./ManageCategoryPopup";
import DeleteCategoryPopup from "./DeleteCategoryPopup";
import { SKILL_FORM_DOMAINS } from "@/store/constants/skillsConstants";
import {
  openSkillManagePopup,
  resetSkillFormState,
} from "@/store/slices/skillSlices/skillFormSlice";
import SkillGraphicalDashboard from "./GraficCategories";
import ContentTitleArrayButtons from "@/components/ContentTitleArrayButtons";
import ManageSkillPopup from "../skills/ManageSkillPopup";
import { selectAllNotes } from "@/store/selectors/notesSelectors";
import { fetchNotes } from "@/store/actions/notesActions";
import DeleteSkillPopup from "../skills/DeleteSkillPopup";
import ManageTopicPopup from "../topics/ManageTopicPopup";
import DeleteTopicPopup from "../topics/DeleteTopicPopup";

const CategoriesPage = ({ route }) => {
  const dispatch = useDispatch();
  const categoryDomain = SKILL_FORM_DOMAINS.CATEGORIES;
  const skillDomain = SKILL_FORM_DOMAINS.SKILLS;
  const topicDomain = SKILL_FORM_DOMAINS.TOPICS;

  const allNotes = useSelector(selectAllNotes);

  console.log("all Notes", allNotes);

  useEffect(() => {
    // dispatch(resetSkillFormState());
    dispatch(fetchCategories());
    dispatch(fetchSkills());
    dispatch(fetchTopics());
    dispatch(fetchNotes());
  }, []);

  return (
    <>
      <ContentTitleArrayButtons title={"Manage Categories"} />
      <SkillGraphicalDashboard
        route={route}
        skillDomain={skillDomain}
        categoryDomain={categoryDomain}
      />
      <ManageCategoryPopup domain={categoryDomain} />
      <ManageSkillPopup domain={skillDomain} />
      <ManageTopicPopup domain={topicDomain} />
      <DeleteSkillPopup domain={skillDomain} />
      <DeleteCategoryPopup domain={categoryDomain} />
      <DeleteTopicPopup domain={topicDomain} />
    </>
  );
};

export default CategoriesPage;
