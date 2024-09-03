package quiz.backend.quizAttempt.dto;

public record QuestionResponseDto(String questionText,
                                  String selectedOption,
                                  String correctOption,
                                  boolean isCorrect) {
}
