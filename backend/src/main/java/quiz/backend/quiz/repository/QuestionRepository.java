package quiz.backend.quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quiz.backend.quiz.entity.Question;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question,Long> {

    List<Question> findAllByQuizId(Long quizId);

    List<Question> findByQuizId(Long quizId);
}
