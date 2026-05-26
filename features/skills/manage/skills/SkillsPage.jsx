"use client";
import React, { useEffect, useState } from "react";
import ContentTitle from "@/components/ContentTitle";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import RenderSkills from "./RenderSkills";
import ManageSkillPopup from "./ManageSkillPopup";
import DeleteSkillPopup from "./DeleteSkillPopup";
import { deleteSkill, fetchSkills } from "@/store/actions/skillActions";
import { resetSkillState } from "@/store/slices/skillSlices/skillSlice";
import { INITIAL_FETCH_PARAMS } from "@/store/constants/sliceConstants";
import { openSkillManagePopup } from "@/store/slices/skillSlices/skillFormSlice";
import { SKILL_FORM_DOMAINS } from "@/store/constants/skillsConstants";

const SkillsPage = () => {
  const dispatch = useDispatch();
  const domain = SKILL_FORM_DOMAINS.SKILLS;

  const handleAddClick = () => {
    dispatch(openSkillManagePopup({ domain, editData: null, defaults: {} }));
  };

  useEffect(() => {
    dispatch(resetSkillState());
    dispatch(fetchSkills(INITIAL_FETCH_PARAMS));
  }, []);

  return (
    <>
      <ContentTitle
        title={"Manage Skills"}
        btnTitle={"Add Skill"}
        Icon={Plus}
        handleMethod={handleAddClick}
      />
      <RenderSkills domain={domain} />
      <ManageSkillPopup domain={domain} />
      <DeleteSkillPopup domain={domain} />
    </>
  );
};

export default SkillsPage;
