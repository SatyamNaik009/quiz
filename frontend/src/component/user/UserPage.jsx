import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const UserPage = () => {
  const [availableQuizzes, setAvailableQuizzes] = useState([]);
  const [attemptedQuizzes, setAttemptedQuizzes] = useState([]);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState("info");
  const [attemptStatus, setAttemptStatus] = useState({});
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const availableResponse = await ApiService.getAllQuizzes();
        console.log("Available Quizzes API response:", availableResponse);

        if (
          availableResponse.quizzes &&
          Array.isArray(availableResponse.quizzes)
        ) {
          setAvailableQuizzes(availableResponse.quizzes);
        } else {
          setError("Unexpected data format received for available quizzes.");
        }

        const attemptedResponse = await ApiService.getAllAttemptedQuizList(
          userId
        );
        console.log("Attempted Quizzes API response:", attemptedResponse);

        if (
          attemptedResponse.quizAttemptDetailsList &&
          Array.isArray(attemptedResponse.quizAttemptDetailsList)
        ) {
          setAttemptedQuizzes(attemptedResponse.quizAttemptDetailsList);
        } else {
          setError("Unexpected data format received for attempted quizzes.");
        }

        const attemptedMap = attemptedResponse.quizAttemptDetailsList.reduce(
          (acc, quiz) => {
            acc[quiz.quizId] = true;
            return acc;
          },
          {}
        );
        setAttemptStatus(attemptedMap);
      } catch (error) {
        setError("Failed to load quizzes. Please try again later.");
        console.error(error);
      }
    };

    fetchQuizzes();
  }, [userId]);

  const handleStartQuiz = async (quizId) => {
    try {
      const attempted = await ApiService.getAttemptedQuizByUser(userId, quizId);
      if (attempted) {
        setNotification("You have already attempted this quiz.");
        setNotificationType("error");
      } else {
        navigate(`/quiz/${quizId}/start`);
      }
    } catch (error) {
      setNotification("Failed to check quiz attempt status. Please try again.");
      setNotificationType("error");
      console.error(error);
    }
  };

  const renderNotification = () => {
    if (!notification) return null;

    const notificationClasses = {
      info: "bg-blue-100 border-blue-400 text-blue-700",
      success: "bg-green-100 border-green-400 text-green-700",
      error: "bg-red-100 border-red-400 text-red-700",
    };

    return (
      <div
        className={`p-4 mb-4 border rounded ${notificationClasses[notificationType]}`}
      >
        <p>{notification}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-8 bg-slate-600 text-white">
      <h1 className="mb-8 mt-12 text-3xl font-bold text-center">
        Available Quizzes
      </h1>
      {error && (
        <p className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded">
          {error}
        </p>
      )}
      {renderNotification()}

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {availableQuizzes.length > 0 ? (
          availableQuizzes.map((quiz) => (
            <div
              key={quiz.quizId}
              className="p-6 bg-white rounded-lg shadow-md"
            >
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                {quiz.title}
              </h2>
              <p className="mb-4 text-gray-600">{quiz.description}</p>
              <button
                onClick={() => handleStartQuiz(quiz.quizId)}
                className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
              >
                Start Quiz
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-200">No quizzes available.</p>
        )}
      </div>

      <h1 className="mb-8 mt-16 text-3xl font-bold text-center">
        Attempted Quizzes
      </h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {attemptedQuizzes.length > 0 ? (
          attemptedQuizzes.map((quiz) => (
            <div
              key={quiz.quizId}
              className="p-6 bg-white rounded-lg shadow-md"
            >
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                Quiz ID: {quiz.quizTitle}
              </h2>
              <p className="mb-4 text-gray-600">
                Total Questions: {quiz.totalQuestions}
              </p>
              <p className="mb-4 text-gray-600">
                Correct Answers: {quiz.correctAnswers}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-200">
            No attempted quizzes available.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserPage;
