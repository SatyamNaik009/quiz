import React, { useState } from "react";

const AddOptionModal = ({ questionId, onClose, onOptionAdded }) => {
  const [optionText, setOptionText] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = async () => {
    try {
      const optionRegister = { optionText, correct: isCorrect };
      await onOptionAdded(optionRegister, questionId);
      onClose();
    } catch (error) {
      console.error("Failed to add option:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Option</h2>
        <input
          type="text"
          placeholder="Option Text"
          value={optionText}
          onChange={(e) => setOptionText(e.target.value)}
          className="mb-4 px-4 py-2 border rounded w-full"
        />
        <label className="inline-flex items-center mb-4">
          <input
            type="checkbox"
            checked={isCorrect}
            onChange={(e) => setIsCorrect(e.target.checked)}
            className="form-checkbox"
          />
          <span className="ml-2">Correct Option</span>
        </label>
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Add Option
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOptionModal;
