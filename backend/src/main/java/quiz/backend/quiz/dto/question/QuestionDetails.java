package quiz.backend.quiz.dto.question;

public record QuestionDetails(Long quizId,Long questionId,String questionText, String difficultyLevel) {
}
