package quiz.backend.quiz.dto.quiz;

import quiz.backend.quiz.dto.quiz.QuizDetails;

import java.util.List;

public record QuizList(List<QuizDetails> quizzes) {
}
