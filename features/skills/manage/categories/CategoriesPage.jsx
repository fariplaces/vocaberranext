"use client";
import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  fetchCategories,
  fetchSkills,
  fetchTopics,
} from "@/store/actions/skillActions";
import ManageCategoryPopup from "./ManageCategoryPopup";
import DeleteCategoryPopup from "./DeleteCategoryPopup";
import RenderCategories from "./RenderCategories";
import { SKILL_FORM_DOMAINS } from "@/store/constants/skillsConstants";
import {
  openSkillDeletePopup,
  openSkillManagePopup,
  resetSkillFormState,
} from "@/store/slices/skillSlices/skillFormSlice";
import SkillGraphicalDashboard from "./GraficCategories";
import ContentTitleArrayButtons from "@/components/ContentTitleArrayButtons";
import ManageSkillPopup from "../skills/ManageSkillPopup";
import { selectAllNotes } from "@/store/selectors/notesSelectors";
import { fetchNotes } from "@/store/actions/notesActions";

const CategoriesPage = ({ route }) => {
  const dispatch = useDispatch();
  const categoryDomain = SKILL_FORM_DOMAINS.CATEGORIES;
  const skillDomain = SKILL_FORM_DOMAINS.SKILLS;

  const allNotes = useSelector(selectAllNotes);

  console.log("all Notes", allNotes);

  const handleAddSkill = () => {
    dispatch(
      openSkillManagePopup({
        domain: skillDomain,
        editData: null,
        defaults: {},
      }),
    );
  };

  // Clicking this sets the popup to explicitly handle root/parent categories
  const handleAddParentCategory = () => {
    dispatch(
      openSkillManagePopup({
        domain: categoryDomain,
        defaults: {
          title: "",
          order: "",
          parentId: "",
          skillId: "",
          formMode: "parent", // 🌟 Dynamic Mode Flag
        },
      }),
    );
  };

  // Clicking this sets the popup to explicitly handle subcategories
  const handleAddChildCategory = () => {
    dispatch(
      openSkillManagePopup({
        domain: categoryDomain,
        defaults: {
          title: "",
          order: "",
          parentId: "",
          skillId: "",
          formMode: "sub", // 🌟 Dynamic Mode Flag
        },
      }),
    );
  };

  const btns = [
    {
      title: "Add Skill",
      icon: Plus,
      handleMethod: handleAddSkill,
    },
    {
      title: "Add Parent-Category",
      icon: Plus,
      handleMethod: handleAddParentCategory,
    },
    {
      title: "Add Category",
      icon: Plus,
      handleMethod: handleAddChildCategory,
    },
    {
      title: "Add Topic",
      icon: Plus,
      handleMethod: () => {
        console.log("Add Topic Clicked");
      },
    },
  ];
  useEffect(() => {
    // dispatch(resetSkillFormState());
    dispatch(fetchCategories());
    dispatch(fetchSkills());
    dispatch(fetchTopics());
    dispatch(fetchNotes());
  }, []);

  return (
    <>
      <ContentTitleArrayButtons title={"Manage Categories"} btns={btns} />
      <SkillGraphicalDashboard route={route} />
      {/* <RenderCategories route={route} domain={domain} /> */}
      <ManageCategoryPopup domain={categoryDomain} />
      <ManageSkillPopup domain={skillDomain} />
      <DeleteCategoryPopup domain={categoryDomain} />
    </>
  );
};

export default CategoriesPage;
