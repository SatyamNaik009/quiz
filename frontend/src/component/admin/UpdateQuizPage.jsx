import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const UpdateQuizPage = () => {
  const { quizId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quiz = await ApiService.getQuiz(quizId);
        setTitle(quiz.title);
        setDescription(quiz.description);
      } catch (error) {
        setError("Failed to load quiz details.");
        console.error(error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await ApiService.updateQuiz(quizId, { title, description });
      navigate("/admin");
    } catch (error) {
      setError("Failed to update quiz.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-600 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-gray-800 text-center">
          Update Quiz
        </h1>
        {error && (
          <p className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            Update Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateQuizPage;
