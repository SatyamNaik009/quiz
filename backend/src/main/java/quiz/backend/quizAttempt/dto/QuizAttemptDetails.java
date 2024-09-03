package quiz.backend.quizAttempt.dto;

public record QuizAttemptDetails(Long userId, Long quizId,String quizTitle,int correctAnswers,int totalQuestions) {
}
