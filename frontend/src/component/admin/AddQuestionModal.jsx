import React, { useState } from "react";

const AddQuestionModal = ({ onClose, onQuestionAdded }) => {
  const [questionText, setQuestionText] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");

  const handleSubmit = async () => {
    try {
      const optionRegister = { questionText, difficultyLevel };
      await onQuestionAdded(optionRegister);
      onClose();
    } catch (error) {
      console.error("Failed to add question:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Question</h2>
        <input
          type="text"
          placeholder="Question Text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="mb-4 px-4 py-2 border rounded w-full"
        />
        <div className="mb-4">
          <label className="block text-gray-700">Difficulty Level</label>
          <select
            value={difficultyLevel}
            onChange={(e) => setDifficultyLevel(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Add Question
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

export default AddQuestionModal;
