package quiz.backend.quizAttempt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quiz.backend.quizAttempt.entity.QuestionResponse;
import quiz.backend.quizAttempt.entity.QuizAttempt;

import java.util.List;

public interface QuestionResponseRepository extends JpaRepository<QuestionResponse,Long> {
    List<QuestionResponse> findByQuizAttempt(QuizAttempt quizAttempt);

    List<QuestionResponse> findByQuestionId(Long questionId);

    void deleteBySelectedOptionId(Long optionId);

    void deleteByCorrectOptionId(Long optionId);

    void deleteByQuestionId(Long id);
}
