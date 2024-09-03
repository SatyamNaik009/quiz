import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const AdminPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState("");
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [selectedQuizTitle, setSelectedQuizTitle] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [optionText, setOptionText] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [newQuestionId, setNewQuestionId] = useState(null);
  const [showAddQuizForm, setShowAddQuizForm] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [selectedQuestionText, setSelectedQuestionText] = useState("");
  const [addingOptions, setAddingOptions] = useState(false);
  const [addingQuestions, setAddingQuestions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const userIdStr = localStorage.getItem("userId");
        const userId = Number(userIdStr);
        if (!userId) {
          setError("User ID not found. Please log in.");
          return;
        }

        const response = await ApiService.getQuizzes(Number(userId));
        console.log("API response:", response);

        if (response.quizzes && Array.isArray(response.quizzes)) {
          setQuizzes(response.quizzes);
        } else {
          setError("Unexpected data format received.");
        }
      } catch (error) {
        setError("Failed to load quizzes. Please try again later.");
        console.error(error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleViewScores = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  const handleUpdateQuiz = async (quizId) => {
    navigate(`/admin/update-quiz/${quizId}`);
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      await ApiService.deleteQuiz(quizId);
      setQuizzes(quizzes.filter((quiz) => quiz.quizId !== quizId));
    } catch (error) {
      setError("Failed to delete quiz. Please try again later.");
      console.error(error);
    }
  };

  const handleAddQuestion = async () => {
    try {
      if (!selectedQuizId || !questionText || !difficultyLevel) {
        setError("All fields are required.");
        return;
      }

      const questionRegister = { questionText, difficultyLevel };
      const response = await ApiService.addQuestion(
        questionRegister,
        selectedQuizId
      );
      setNewQuestionId(response.questionId);
      setSelectedQuestionText(questionText);
      setQuestionText("");
      setDifficultyLevel("");
      setAddingOptions(true);
      setAddingQuestions(false);
      setError("Question added successfully. Now add options.");
    } catch (error) {
      setError("Failed to add question. Please try again later.");
      console.error(error);
    }
  };

  const handleAddOption = async () => {
    try {
      if (!newQuestionId || !optionText) {
        setError("Option text is required.");
        return;
      }

      const optionRegister = { optionText, correct: isCorrect };
      await ApiService.addOption(optionRegister, newQuestionId);
      setOptionText("");
      setIsCorrect(false);
      setError("Option added successfully.");
    } catch (error) {
      setError("Failed to add option. Please try again later.");
      console.error(error);
    }
  };

  const handleAddQuiz = async () => {
    try {
      const userIdStr = localStorage.getItem("userId");
      const userId = Number(userIdStr);
      if (!userId || !quizTitle || !quizDescription) {
        setError("All fields are required.");
        return;
      }

      const quizRegister = { title: quizTitle, description: quizDescription };
      const response = await ApiService.addQuiz(quizRegister, userId);
      setQuizzes([...quizzes, response]);
      setQuizTitle("");
      setQuizDescription("");
      setShowAddQuizForm(false);
      setError("Quiz added successfully.");
    } catch (error) {
      setError("Failed to add quiz. Please try again later.");
      console.error(error);
    }
  };

  const handleDoneAddingOptions = () => {
    setAddingOptions(false);
    setNewQuestionId(null);
    setSelectedQuestionText("");
  };

  const handleDoneAddingQuestions = () => {
    setSelectedQuizId(null);
    setSelectedQuizTitle("");
    setAddingQuestions(false);
  };

  return (
    <div className="min-h-screen p-8 bg-slate-600">
      <h1 className="mb-8 mt-12 text-3xl font-bold text-center text-white">
        Available Quizzes
      </h1>
      {error && (
        <p className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded">
          {error}
        </p>
      )}
      <div className="mb-8 text-center">
        <button
          onClick={() => setShowAddQuizForm(true)}
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Add New Quiz
        </button>
      </div>
      {showAddQuizForm && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Add New Quiz
          </h2>
          <input
            type="text"
            placeholder="Quiz Title"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="mb-4 px-4 py-2 border rounded w-full"
          />
          <textarea
            placeholder="Quiz Description"
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
            className="mb-4 px-4 py-2 border rounded w-full"
          />
          <button
            onClick={handleAddQuiz}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Add Quiz
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div
              key={quiz.quizId}
              className="p-6 bg-white rounded-lg shadow-md"
            >
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                {quiz.title}
              </h2>
              <p className="mb-4 text-gray-600">{quiz.description}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleViewScores(quiz.quizId)}
                  className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleUpdateQuiz(quiz.quizId)}
                  className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteQuiz(quiz.quizId)}
                  className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setSelectedQuizId(quiz.quizId);
                    setSelectedQuizTitle(quiz.title);
                    setSelectedQuestionText(null);
                    setAddingQuestions(true);
                  }}
                  className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                >
                  Add Question
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white">No quizzes available.</p>
        )}
      </div>
      {selectedQuizId && !newQuestionId && addingQuestions && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Adding Question to "{selectedQuizTitle}"
          </h2>
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
          <div className="flex justify-between">
            <button
              onClick={handleAddQuestion}
              className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
            >
              Add Question
            </button>
            <button
              onClick={handleDoneAddingQuestions}
              className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
            >
              Done Adding Questions
            </button>
          </div>
        </div>
      )}
      {selectedQuestionText && addingOptions && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Adding Options to Question "{selectedQuestionText}"
          </h2>
          <input
            type="text"
            placeholder="Option Text"
            value={optionText}
            onChange={(e) => setOptionText(e.target.value)}
            className="mb-4 px-4 py-2 border rounded w-full"
          />
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={isCorrect}
              onChange={(e) => setIsCorrect(e.target.checked)}
              className="mr-2"
            />
            <label className="text-gray-700">Is Correct Option?</label>
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleAddOption}
              className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
            >
              Add Option
            </button>
            <button
              onClick={handleDoneAddingOptions}
              className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
            >
              Done Adding Options
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
