"use client";
import { createWord } from "@/store/slices/wordSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const CreateWordPopup = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    text: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.text || !formData.type) {
      alert("Please fill all fields!");
      return;
    }
    dispatch(createWord(formData));
    console.log(formData);
    console.log("Saved Word:", formData);
    setIsOpen(false);
    setFormData({ text: "", type: "" });
  };

  return (
    <>
      {/* Button to open popup */}

      {/* Popup / Modal */}
      {isOpen && (
        <>
          <div
            className="absolute flex items-center justify-center inset-0 bg-white/10 backdrop-blur-sm transition-all duration-300"
            // onClick={() => setIsOpen(false)}
          >
            {/* <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> */}
            <div className="bg-black text-white p-6 rounded-xl shadow-lg w-96 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Create a Word</h2>

              {/* Word Input */}
              <div className="mb-4">
                <label className="block text-sm mb-1">Word</label>
                <input
                  type="text"
                  name="text"
                  value={formData.text}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter word..."
                />
              </div>

              {/* Type Input */}
              <div className="mb-4">
                <label className="block text-sm mb-1">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select type...</option>
                  <option value="simple">Simple Word</option>
                  <option value="idiom">Idiom</option>
                  <option value="pair">Pair of Word</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  className="flex items-center space-x-2 border border-gray-400 bg-transparent hover:bg-gray-600 px-4 py-1 rounded-lg"
                  onClick={handleSave}
                >
                  <span>Save</span>
                </button>
                {/* <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700"
                >
                  Save
                </button> */}
              </div>
            </div>
          </div>
          {/* </div> */}
        </>
      )}
    </>
  );
};

export default CreateWordPopup;
