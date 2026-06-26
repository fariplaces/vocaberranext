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

const CategoriesPage = ({ route }) => {
  const dispatch = useDispatch();
  const categoryDomain = SKILL_FORM_DOMAINS.CATEGORIES;
  const skillDomain = SKILL_FORM_DOMAINS.SKILLS;

  const allNotes = useSelector(selectAllNotes);

  console.log("all Notes", allNotes);

  // const btns = [
  //   {
  //     title: "Add Skill",
  //     icon: Plus,
  //     handleMethod: handleAddSkill,
  //   },
  //   {
  //     title: "Add Parent-Category",
  //     icon: Plus,
  //     handleMethod: handleAddParentCategory,
  //   },
  //   {
  //     title: "Add Category",
  //     icon: Plus,
  //     handleMethod: handleAddChildCategory,
  //   },
  //   {
  //     title: "Add Topic",
  //     icon: Plus,
  //     handleMethod: () => {
  //       console.log("Add Topic Clicked");
  //     },
  //   },
  // ];
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
      <DeleteSkillPopup domain={skillDomain} />
      <DeleteCategoryPopup domain={categoryDomain} />
    </>
  );
};

export default CategoriesPage;
