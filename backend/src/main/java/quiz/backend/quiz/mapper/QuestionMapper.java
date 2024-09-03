package quiz.backend.quiz.mapper;

import org.mapstruct.*;
import quiz.backend.quiz.dto.option.OptionRegister;
import quiz.backend.quiz.dto.question.QuestionDetails;
import quiz.backend.quiz.dto.question.QuestionRegister;
import quiz.backend.quiz.dto.question.QuestionList;
import quiz.backend.quiz.entity.Option;
import quiz.backend.quiz.entity.Question;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    @Mapping(target="quiz",ignore = true)
    @Mapping(target="options",ignore = true)
    Question toQuestion(QuestionRegister questionRegister);

    @Mapping(target="quizId",source="quiz.id")
    @Mapping(source = "id", target = "questionId")
    QuestionDetails toQuestionDetails(Question question);

    default QuestionList toQuestionList(List<QuestionDetails> questions){
        return new QuestionList(questions);
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(QuestionRegister questionRegister, @MappingTarget Question question);
}
