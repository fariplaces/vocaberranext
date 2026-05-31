"use client";
import React, { useEffect, useState } from "react";
import ContentTitle from "@/components/ContentTitle";
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
  openSkillManagePopup,
  resetSkillFormState,
} from "@/store/slices/skillSlices/skillFormSlice";
import SkillGraphicalDashboard from "./GraficCategories";

const CategoriesPage = ({ route }) => {
  const dispatch = useDispatch();
  const domain = SKILL_FORM_DOMAINS.CATEGORIES;

  const handleAddClick = () => {
    dispatch(openSkillManagePopup({ domain }));
  };

  useEffect(() => {
    // dispatch(resetSkillFormState());
    dispatch(fetchCategories());
    dispatch(fetchSkills());
    dispatch(fetchTopics());
  }, []);

  return (
    <>
      <ContentTitle
        title={"Manage Categories"}
        btnTitle={"Add Category"}
        Icon={Plus}
        handleMethod={handleAddClick}
      />
      <SkillGraphicalDashboard />
      {/* <RenderCategories route={route} domain={domain} /> */}
      <ManageCategoryPopup route={route} domain={domain} />
      <DeleteCategoryPopup route={route} domain={domain} />
    </>
  );
};

export default CategoriesPage;
