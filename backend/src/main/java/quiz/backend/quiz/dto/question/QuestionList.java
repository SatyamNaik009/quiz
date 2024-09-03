package quiz.backend.quiz.dto.question;

import quiz.backend.quiz.dto.question.QuestionDetails;

import java.util.List;

public record QuestionList(List<QuestionDetails> questions) {
}
