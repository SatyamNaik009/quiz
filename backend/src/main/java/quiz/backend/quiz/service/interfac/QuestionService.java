package quiz.backend.quiz.service.interfac;

import quiz.backend.quiz.dto.question.QuestionDetails;
import quiz.backend.quiz.dto.question.QuestionRegister;
import quiz.backend.quiz.dto.question.QuestionList;

public interface QuestionService {

    QuestionDetails addQuestion(QuestionRegister questionRegister,Long quizId);

    QuestionList getAllQuestions(Long quizId);

    QuestionDetails getQuestion(Long questionId);

    void deleteQuestion(Long questionId);

    QuestionDetails updateQuestion(QuestionRegister questionRegister, Long questionId);
}
