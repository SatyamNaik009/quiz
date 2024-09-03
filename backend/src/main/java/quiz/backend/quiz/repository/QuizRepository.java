package quiz.backend.quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quiz.backend.quiz.entity.Quiz;

import java.util.List;
import java.util.Optional;

public interface QuizRepository extends JpaRepository<Quiz,Long> {

    List<Quiz> findAllByUserId(Long userId);
}
