package quiz.backend.quizAttempt.service.interfac;

import quiz.backend.quizAttempt.dto.*;
import quiz.backend.quizAttempt.entity.QuizAttempt;

import java.util.List;

public interface QuizAttemptService {
    QuizAttemptDetails getQuizAttemptedByUser(Long userId, Long quizId);

    OptionResponse isOptionCorrect(Long userId, Long quizId, Long questionId, Long optionId);

    QuizAttemptList getAllQuizAttemptsByUser(Long userId);

    QuestionResponseList getAllQuestionResponsesOfQuizByUser(Long userId, Long quizId);

    UserScoreDtoList getUserScoresForQuiz(Long quizId);

    Boolean getQuizAttemptedQuizByUser(Long userId, Long quizId);
}
