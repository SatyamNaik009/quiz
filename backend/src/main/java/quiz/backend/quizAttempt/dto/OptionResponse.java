package quiz.backend.quizAttempt.dto;

public record OptionResponse(String message,String selectedOption,String correctOption,boolean correct) {
}
