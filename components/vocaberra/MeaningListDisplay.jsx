import { fetchWords } from "@/store/actions/wordActions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MeaningListDisplay = () => {
  const dispatch = useDispatch();
  const { words, loading } = useSelector((state) => state.words);

  useEffect(() => {
    dispatch(fetchWords());
  }, [dispatch]);

  const typeLabels = {
    simple: "Simple Word",
    ideom: "Ideom",
    pair: "Pair of Word",
  };
  console.log(words);
  //   const handleAddWord = () => {
  //     dispatch(createWord({ word: "NewWord", type: "Noun" }));
  //   };
  return (
    <>
      <div className="mb-3">
        <div className="grid grid-cols-5 border-b gap-6">
          <label className="block text-lg font-bold mb-2">
            Word / Pharase / Text / Idiom / Pari of Word
          </label>
          <label className="block text-lg font-bold  mb-2">
            Effective Meanings
          </label>
          <label className="block text-lg font-bold  mb-2">Word Type</label>
          <label className="block text-lg font-bold  mb-2">Created By</label>
          <label className="block text-lg font-bold  mb-2">Delete</label>
        </div>
      </div>
      {words.map((word, index) => (
        <div key={index} className="flex flex-col gap-1">
          <div className="grid grid-cols-5 mb-2 gap-6">
            <button className="flex items-center space-x-2 border border-gray-400 bg-transparent hover:bg-gray-600 px-4 py-1 rounded-lg">
              <span>{word.text}</span>
            </button>
            <label className="block text-sm font-medium">
              Effective Meanings:
            </label>
            <label className="block text-sm font-medium">
              {typeLabels[word.type] || "Unknown Type"}
            </label>
            <label className="block text-sm font-medium">
              {word.created_by?.name}
            </label>
          </div>
          <div className="flex flex-row gap-3">
            <label className="block text-sm font-medium">Related Words:</label>
            <label className="block text-sm font-medium">Related Words</label>
          </div>
          <div className="flex flex-row gap-3">
            <label className="block text-sm font-medium">Summary:</label>
            <label className="block text-sm font-medium">
              This is the pretty summary
            </label>
          </div>
        </div>
      ))}
    </>
  );
};

export default MeaningListDisplay;
