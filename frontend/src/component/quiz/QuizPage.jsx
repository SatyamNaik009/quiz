import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import {
  Button,
  Typography,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const QuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState(new Set());
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!quizId) {
        console.error("Invalid quizId");
        return;
      }

      try {
        const questionsData = await ApiService.getQuestions(Number(quizId));
        setQuestions(questionsData.questions);
        setTotalQuestions(questionsData.questions.length);
        if (questionsData.questions.length > 0) {
          setCurrentQuestion(questionsData.questions[0]);
          setQuestionIndex(0);
        } else {
          console.error("No questions available for this quiz.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to load questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizId]);

  useEffect(() => {
    const fetchOptions = async (questionId) => {
      if (!questionId) {
        console.error("Invalid questionId");
        return;
      }

      try {
        const optionsData = await ApiService.getOptions(questionId);
        setOptions(optionsData.options);
      } catch (error) {
        console.error("Failed to load options:", error);
      }
    };

    if (currentQuestion) {
      fetchOptions(currentQuestion.questionId);
    }
  }, [currentQuestion]);

  const handleOptionChange = (event) => {
    const optionId = Number(event.target.value);
    setSelectedOptions((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(optionId)) {
        newSelection.delete(optionId);
      } else {
        newSelection.add(optionId);
      }
      return newSelection;
    });
  };

  const handleSubmit = async () => {
    if (currentQuestion) {
      try {
        const userIdStr = localStorage.getItem("userId");
        const userId = Number(userIdStr);
        const optionId = Array.from(selectedOptions)[0];
        const response = await ApiService.isOptionCorrect(
          Number(userId),
          Number(quizId),
          Number(currentQuestion.questionId),
          optionId
        );
        setFeedback(response);

        if (response.correct) {
          setScore((prevScore) => prevScore + 1);
        }
      } catch (error) {
        console.error("Failed to submit answer:", error);
      }
    }
  };

  const handleNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setCurrentQuestion(questions[questionIndex + 1]);
      setOptions([]);
      setSelectedOptions(new Set());
      setFeedback(null);
    } else {
      setCurrentQuestion(null);
    }
  };

  const handleGoHome = () => {
    navigate("/user");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="p-4 max-w-2xl mx-auto text-center">
        <h1 className="mb-8 mt-14 text-2xl text-center">
          Quiz finished! Thanks for participating.
        </h1>
        <h1 className="mb-8 mt-4 text-2xl text-center">
          Your total score: {score} / {totalQuestions}
        </h1>
        <Button variant="contained" color="primary" onClick={handleGoHome}>
          Go to Homepage
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="mb-8 text-2xl  mt-14">
        {currentQuestion.questionText}
        <span className="text-gray-600">
          {" "}
          <br></br>
          (Difficulty: {currentQuestion.difficultyLevel})
        </span>
      </h1>
      <FormControl component="fieldset">
        {options.map((option) => (
          <FormControlLabel
            key={option.optionId}
            control={
              <Checkbox
                value={option.optionId}
                checked={selectedOptions.has(option.optionId)}
                onChange={handleOptionChange}
              />
            }
            label={option.optionText}
          />
        ))}
      </FormControl>
      <div className="mt-4 flex gap-4">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={selectedOptions.size === 0}
        >
          Submit
        </Button>
        {feedback && (
          <div
            className={`mt-4 p-4 rounded ${
              feedback.correct ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <Typography
              variant="h6"
              className={feedback.correct ? "text-green-800" : "text-red-800"}
            >
              {feedback.message}
            </Typography>
            <Typography variant="body1">
              Selected Option: {feedback.selectedOption}
            </Typography>
            <Typography variant="body1">
              Correct Option: {feedback.correctOption}
            </Typography>
          </div>
        )}
        {feedback && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleNextQuestion}
            className="mt-4"
          >
            Next Question
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
