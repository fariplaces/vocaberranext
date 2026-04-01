"use client";
import React, { useEffect, useState } from "react";
import ContentTitle from "@/components/ContentTitle";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import RenderRevisions from "./RenderRevisions";
import ManageRevisionPopup from "./ManageRevisionPopup";
import DeleteRevisionPopup from "./DeleteRevisionPopup";
import { formatForInput } from "@/lib/utils";
import { deleteRevision, fetchRevisions, fetchSkills, fetchTopics, updateRevision } from "@/store/actions/skillActions";

const RevisionPage = ({ route }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDelPopupOpen, setIsDelPopupOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const { loading } = useSelector((state) => state.skill);

  const handleEditClick = (item) => {
    const dateFields = ["scheduled", "practiced", "revision1date", "revision2date", "revision3date"];

    setSelectedItem({
      ...item,
      ...Object.fromEntries(
        dateFields.map((field) => [field, formatForInput(item[field])])
      ),
    });

    setIsPopupOpen(true);
  };


  const handleUpdateRevisionClick = (item) => {
    console.log(item);
    dispatch(updateRevision(item));
  }


  const handleAddClick = () => {
    setSelectedItem(null);
    setIsPopupOpen(true);
  };
  const handleDelClick = (item) => {
    setItemToDelete(item);
    setIsDelPopupOpen(true);
  };

  const handleDelete = async () => {
    if (itemToDelete?.id) {
      dispatch(deleteRevision(itemToDelete.id));
      setIsDelPopupOpen(false);
      setItemToDelete(null);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSkills());
    dispatch(fetchTopics());
    dispatch(fetchRevisions());
  }, [updateRevision]);

  return (
    <>
      <ContentTitle
        title={"Manage Revisions"}
        btnTitle={
          ["pendingri", "pendingrii", "pendingriii", "scheduled"].includes(route)
            ? "Null"
            : "Add Revision"
        }
        Icon={Plus}
        handleMethod={handleAddClick}
      />
      <RenderRevisions
        route={route}
        handleUpdateRevisionClick={handleUpdateRevisionClick}
        handleEditClick={handleEditClick}
        handleDelClick={handleDelClick}
      />
      <ManageRevisionPopup
        route={route}
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        editData={selectedItem}
        setEditData={setSelectedItem}
      />
      <DeleteRevisionPopup
        isDelPopupOpen={isDelPopupOpen}
        setIsDelPopupOpen={setIsDelPopupOpen}
        itemName={`${itemToDelete?.topic.title} - ${itemToDelete?.topic.category?.skill?.title}`}
        onDelete={handleDelete}
        isLoading={loading}
      />
    </>
  );
};

export default RevisionPage;
