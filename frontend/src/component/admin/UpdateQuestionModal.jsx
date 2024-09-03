import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";

const UpdateQuestionModal = ({ questionId, onClose, onQuestionUpdated }) => {
  const [questionText, setQuestionText] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        const response = await ApiService.getQuestion(Number(questionId));
        setQuestionText(response.questionText);
        setDifficultyLevel(response.difficultyLevel);
      } catch (error) {
        setError("Failed to load question details. Please try again later.");
        console.error(error);
      }
    };

    fetchQuestionDetails();
  }, [questionId]);

  const handleUpdate = async () => {
    try {
      await ApiService.updateQuestion(Number(questionId), {
        questionText,
        difficultyLevel,
      });
      onQuestionUpdated();
      onClose();
    } catch (error) {
      setError("Failed to update question. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Update Question</h2>
        {error && (
          <p className="mb-4 text-sm text-red-700 bg-red-100 p-2 rounded">
            {error}
          </p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Question Text</label>
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
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
        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="ml-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateQuestionModal;
