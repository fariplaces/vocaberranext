import React from "react";

const ContentTitleArrayButtons = ({
  title = "VocabErra",
  btns = [{ title: "Back", icon: null, handleMethod: null }],
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center space-x-3">
        {btns &&
          btns !== "Null" &&
          btns.map((btn, idx) => (
            <button
              key={btn.key ?? btn.title ?? idx}
              className="flex items-center space-x-2 border border-gray-400 bg-transparent hover:bg-gray-600 px-4 py-2 rounded-lg"
              onClick={btn.handleMethod}
            >
              {btn.icon && <btn.icon className="w-4 h-4" />}
              <span>{btn.title}</span>
            </button>
          ))}
      </div>
    </div>
  );
};

export default ContentTitleArrayButtons;
