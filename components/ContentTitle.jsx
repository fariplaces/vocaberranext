import React from "react";

const ContentTitle = ({
  title = "VocabErra",
  btnTitle = "Back",
  Icon,
  handleMethod,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      {btnTitle !== "Null" &&
        <button
          className="flex items-center space-x-2 border border-gray-400 bg-transparent hover:bg-gray-600 px-4 py-2 rounded-lg"
          onClick={handleMethod}
        >
          {Icon && <Icon className="w-4 h-4" />}
          <span>{btnTitle}</span>
        </button>
      }
    </div>
  );
};

export default ContentTitle;
