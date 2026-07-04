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
import {
  selectAllNotes,
  selectNotesMetaData,
} from "@/store/selectors/notesSelectors";
import { fetchNotes } from "@/store/actions/notesActions";
import DeleteSkillPopup from "../skills/DeleteSkillPopup";
import ManageTopicPopup from "../topics/ManageTopicPopup";
import DeleteTopicPopup from "../topics/DeleteTopicPopup";
import ManageRevisionPopup from "../revisions/ManageRevisionPopup";
import ReadNotes from "./ReadNotes";
import { EMPTY_ARRAY } from "@/store/constants/sliceConstants";
import { setActiveNote } from "@/store/slices/notesSlice";

const CategoriesPage = ({ route }) => {
  const dispatch = useDispatch();
  const categoryDomain = SKILL_FORM_DOMAINS.CATEGORIES;
  const skillDomain = SKILL_FORM_DOMAINS.SKILLS;
  const topicDomain = SKILL_FORM_DOMAINS.TOPICS;
  const revisionDomain = SKILL_FORM_DOMAINS.REVISIONS;
  const [isOpen, setIsOpen] = React.useState(false);
  const [filterNotes, setFilterNotes] = React.useState(EMPTY_ARRAY);

  const { notes } = useSelector(selectNotesMetaData) || EMPTY_ARRAY;

  const filterNotesByTopic = (targetId) => {
    setIsOpen(true);
    dispatch(setActiveNote(null));
    if (targetId) {
      setFilterNotes(notes.filter((note) => note.targetId === targetId));
    } else {
      setFilterNotes(notes);
    }
  };

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
        topicDomain={topicDomain}
        filterNotesByTopic={filterNotesByTopic}
      />
      <ManageCategoryPopup domain={categoryDomain} />
      <ManageSkillPopup domain={skillDomain} />
      <ManageTopicPopup domain={topicDomain} />
      <ManageRevisionPopup domain={revisionDomain} />
      <DeleteSkillPopup domain={skillDomain} />
      <DeleteCategoryPopup domain={categoryDomain} />
      <DeleteTopicPopup domain={topicDomain} />
      {isOpen && <ReadNotes notes={filterNotes} setIsOpen={setIsOpen} />}
    </>
  );
};

export default CategoriesPage;
