package quiz.backend.quiz.mapper;

import org.mapstruct.*;
import quiz.backend.quiz.dto.question.QuestionRegister;
import quiz.backend.quiz.dto.quiz.QuizDetails;
import quiz.backend.quiz.dto.quiz.QuizRegister;
import quiz.backend.quiz.dto.quiz.QuizList;
import quiz.backend.quiz.entity.Question;
import quiz.backend.quiz.entity.Quiz;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuizMapper {

    @Mapping(target = "user", ignore = true)
    Quiz toQuiz(QuizRegister quizRegister);

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "id", target = "quizId")
    QuizDetails toQuizDetails(Quiz quiz);

    default QuizList toQuizList(List<QuizDetails> quizzes) {
        return new QuizList(quizzes);
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(QuizRegister quizRegister, @MappingTarget Quiz quiz);
}
