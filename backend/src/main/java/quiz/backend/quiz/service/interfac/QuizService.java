package quiz.backend.quiz.service.interfac;

import quiz.backend.quiz.dto.quiz.QuizDetails;
import quiz.backend.quiz.dto.quiz.QuizRegister;
import quiz.backend.quiz.dto.quiz.QuizList;

public interface QuizService {

    QuizDetails addQuiz(QuizRegister quizRegister, Long userId);

    public QuizList getAllQuizzes(Long userId);

    public QuizList getAllQuizzes();

    QuizDetails getQuiz(Long quizId);

    QuizDetails updateQuiz(QuizRegister quizRegister, Long quizId);

    void deleteQuiz(Long quizId);
}
