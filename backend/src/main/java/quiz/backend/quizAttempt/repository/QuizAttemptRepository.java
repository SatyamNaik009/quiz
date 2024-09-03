package quiz.backend.quizAttempt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import quiz.backend.quiz.entity.Quiz;
import quiz.backend.quizAttempt.dto.UserScoreDTO;
import quiz.backend.quizAttempt.entity.QuizAttempt;
import quiz.backend.user.entity.User;

import java.util.List;
import java.util.Optional;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt,Long> {
    Optional<QuizAttempt> findByUserAndQuiz(User user, Quiz quiz);
    List<QuizAttempt> findByUser(User user);
    QuizAttempt findByUserIdAndQuizId(Long userId, Long quizId);

    List<QuizAttempt> findByQuizId(Long quizId);

    void deleteByQuizId(Long quizId);
}
