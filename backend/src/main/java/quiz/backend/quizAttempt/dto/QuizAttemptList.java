package quiz.backend.quizAttempt.dto;

import quiz.backend.quizAttempt.entity.QuizAttempt;

import java.util.List;

public record QuizAttemptList(List<QuizAttemptDetails> quizAttemptDetailsList) {
}
