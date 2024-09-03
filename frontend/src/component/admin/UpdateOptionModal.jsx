import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";

const UpdateOptionModal = ({ optionId, onClose, onOptionUpdated }) => {
  const [optionText, setOptionText] = useState("");
  const [correct, setCorrect] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOptionDetails = async () => {
      try {
        const response = await ApiService.getOption(Number(optionId));
        setOptionText(response.optionText);
        setCorrect(response.correct);
      } catch (error) {
        setError("Failed to load option details. Please try again later.");
        console.error(error);
      }
    };

    fetchOptionDetails();
  }, [optionId]);

  const handleUpdate = async () => {
    try {
      await ApiService.updateOption(Number(optionId), { optionText, correct });
      onOptionUpdated();
      onClose();
    } catch (error) {
      setError("Failed to update option. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Update Option</h2>
        {error && (
          <p className="mb-4 text-sm text-red-700 bg-red-100 p-2 rounded">
            {error}
          </p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Option Text</label>
          <input
            type="text"
            value={optionText}
            onChange={(e) => setOptionText(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            <input
              type="checkbox"
              checked={correct}
              onChange={(e) => setCorrect(e.target.checked)}
              className="mr-2"
            />
            Correct
          </label>
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

export default UpdateOptionModal;
