package quiz.backend.quiz.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import quiz.backend.quiz.entity.Option;

import java.util.List;

public interface OptionRepository extends JpaRepository<Option,Long> {

    List<Option> findAllByQuestionId(Long questionId);
}
