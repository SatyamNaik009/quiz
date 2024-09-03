import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";
import UpdateOptionModal from "./UpdateOptionModal";
import UpdateQuestionModal from "./UpdateQuestionModal";
import AddOptionModal from "./AddOptionModal";
import AddQuestionModal from "./AddQuestionModal";

const QuizDetailPage = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [userScores, setUserScores] = useState([]);
  const [questionOptions, setQuestionOptions] = useState({});
  const [error, setError] = useState("");
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [addingOptionForQuestionId, setAddingOptionForQuestionId] =
    useState(null);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizData = await ApiService.getQuiz(Number(quizId));
        setQuiz(quizData);

        const questionsData = await ApiService.getQuestions(Number(quizId));
        setQuestions(questionsData.questions);

        const scoresData = await ApiService.getUserScores(Number(quizId));
        setUserScores(scoresData.userScoreDTOList);

        const optionsPromises = questionsData.questions.map((question) =>
          ApiService.getOptions(question.questionId)
        );
        const optionsResponses = await Promise.all(optionsPromises);

        const optionsMap = {};
        questionsData.questions.forEach((question, index) => {
          optionsMap[question.questionId] = optionsResponses[index].options;
        });
        setQuestionOptions(optionsMap);
      } catch (error) {
        setError("Failed to load data. Please try again later.");
        console.error(error);
      }
    };

    fetchData();
  }, [quizId]);

  const handleDeleteOption = async (optionId) => {
    try {
      await ApiService.deleteOption(optionId);
      const updatedQuestionsData = await ApiService.getQuestions(
        Number(quizId)
      );
      const optionsPromises = updatedQuestionsData.questions.map((question) =>
        ApiService.getOptions(question.questionId)
      );
      const optionsResponses = await Promise.all(optionsPromises);
      const optionsMap = {};
      updatedQuestionsData.questions.forEach((question, index) => {
        optionsMap[question.questionId] = optionsResponses[index].options;
      });
      setQuestionOptions(optionsMap);
    } catch (error) {
      setError("Failed to delete option. Please try again later.");
      console.error(error);
    }
  };

  const handleOptionUpdated = async () => {
    try {
      const updatedQuestionsData = await ApiService.getQuestions(
        Number(quizId)
      );
      const optionsPromises = updatedQuestionsData.questions.map((question) =>
        ApiService.getOptions(question.questionId)
      );
      const optionsResponses = await Promise.all(optionsPromises);
      const optionsMap = {};
      updatedQuestionsData.questions.forEach((question, index) => {
        optionsMap[question.questionId] = optionsResponses[index].options;
      });
      setQuestionOptions(optionsMap);
    } catch (error) {
      setError("Failed to refresh options after update.");
      console.error(error);
    }
  };

  const handleQuestionUpdated = async () => {
    try {
      const updatedQuestionsData = await ApiService.getQuestions(
        Number(quizId)
      );
      setQuestions(updatedQuestionsData.questions);

      const optionsPromises = updatedQuestionsData.questions.map((question) =>
        ApiService.getOptions(question.questionId)
      );
      const optionsResponses = await Promise.all(optionsPromises);

      const optionsMap = {};
      updatedQuestionsData.questions.forEach((question, index) => {
        optionsMap[question.questionId] = optionsResponses[index].options;
      });
      setQuestionOptions(optionsMap);
    } catch (error) {
      setError("Failed to refresh questions after update.");
      console.error(error);
    }
  };

  const handleAddOption = async (optionRegister, questionId) => {
    try {
      await ApiService.addOption(optionRegister, questionId);
      setAddingOptionForQuestionId(null);
      await handleOptionUpdated();
    } catch (error) {
      setError("Failed to add option. Please try again later.");
      console.error(error);
    }
  };

  const handleAddQuestion = async (questionRegister) => {
    try {
      await ApiService.addQuestion(questionRegister, Number(quizId));
      setShowAddQuestionModal(false);
      await handleQuestionUpdated();
    } catch (error) {
      setError("Failed to add question. Please try again later.");
      console.error(error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await ApiService.deleteQuestion(questionId);
      const updatedQuestionsData = await ApiService.getQuestions(
        Number(quizId)
      );
      setQuestions(updatedQuestionsData.questions);

      const optionsPromises = updatedQuestionsData.questions.map((question) =>
        ApiService.getOptions(question.questionId)
      );
      const optionsResponses = await Promise.all(optionsPromises);

      const optionsMap = {};
      updatedQuestionsData.questions.forEach((question, index) => {
        optionsMap[question.questionId] = optionsResponses[index].options;
      });
      setQuestionOptions(optionsMap);
    } catch (error) {
      setError("Failed to delete question. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-slate-600 flex">
      {" "}
      <div className="flex-3 p-4 border-r border-gray-300">
        <h2 className="mb-8 mt-12 text-3xl font-bold text-center text-gray-100">
          User Scores
        </h2>
        {userScores.length > 0 ? (
          <div>
            <ul>
              {userScores.map((score, index) => (
                <li
                  key={index}
                  className="mb-4 p-4 bg-white rounded-lg shadow-md"
                >
                  <p className="text-gray-600">Name: {score.userName}</p>
                  <p className="text-gray-600">Score: {score.score}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center text-gray-100">No scores available.</p>
        )}
      </div>
      <div className="flex-1 p-4">
        <h1 className="mb-8 mt-12 text-3xl font-bold text-center text-gray-100">
          Quiz Details
        </h1>
        {error && (
          <p className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded">
            {error}
          </p>
        )}
        {quiz ? (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-100">
              Quiz: {quiz.title}
            </h2>
            <p className="text-gray-100">Description: {quiz.description}</p>
          </div>
        ) : (
          <p className="text-center text-gray-100">Loading quiz details...</p>
        )}
        {questions.length > 0 ? (
          <div className="mb-8">
            <div className="flex justify-center">
              <button
                onClick={() => setShowAddQuestionModal(true)}
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Add Question
              </button>
            </div>
            <h2 className="text-xl font-semibold text-gray-100">Questions</h2>
            <ul>
              {questions.map((question) => (
                <li
                  key={question.questionId}
                  className="mb-4 p-4 bg-white rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">
                        {question.questionText}
                      </p>
                      <p className="text-gray-600">
                        Difficulty: {question.difficultyLevel}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handleDeleteQuestion(question.questionId)
                        }
                        className="px-2 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() =>
                          setSelectedQuestionId(question.questionId)
                        }
                        className="px-2 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
                      >
                        Update
                      </button>
                      <button
                        onClick={() =>
                          setAddingOptionForQuestionId(question.questionId)
                        }
                        className="px-2 py-1 text-white bg-green-600 rounded hover:bg-green-700"
                      >
                        Add Option
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mt-4">
                    Options
                  </h3>
                  <ul>
                    {questionOptions[question.questionId]?.map((option) => (
                      <li
                        key={option.optionId}
                        className="mt-2 flex justify-between items-center bg-gray-50 p-2 rounded"
                      >
                        <p
                          className={`${
                            option.correct ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {option.optionText}
                        </p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedOptionId(option.optionId)}
                            className="px-2 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDeleteOption(option.optionId)}
                            className="px-2 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center text-gray-100">No questions available.</p>
        )}
      </div>
      {selectedOptionId && (
        <UpdateOptionModal
          optionId={selectedOptionId}
          onClose={() => setSelectedOptionId(null)}
          onOptionUpdated={handleOptionUpdated}
        />
      )}
      {selectedQuestionId && (
        <UpdateQuestionModal
          questionId={selectedQuestionId}
          onClose={() => setSelectedQuestionId(null)}
          onQuestionUpdated={handleQuestionUpdated}
        />
      )}
      {addingOptionForQuestionId && (
        <AddOptionModal
          questionId={addingOptionForQuestionId}
          onClose={() => setAddingOptionForQuestionId(null)}
          onOptionAdded={handleAddOption}
        />
      )}
      {showAddQuestionModal && (
        <AddQuestionModal
          onClose={() => setShowAddQuestionModal(false)}
          onQuestionAdded={handleAddQuestion}
        />
      )}
    </div>
  );
};

export default QuizDetailPage;
