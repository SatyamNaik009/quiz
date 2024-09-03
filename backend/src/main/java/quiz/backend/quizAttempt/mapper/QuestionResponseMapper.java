package quiz.backend.quizAttempt.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import quiz.backend.quizAttempt.dto.QuestionResponseDto;
import quiz.backend.quizAttempt.dto.QuestionResponseList;
import quiz.backend.quizAttempt.entity.QuestionResponse;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionResponseMapper {
    @Mapping(source = "question.questionText", target = "questionText")
    @Mapping(source = "selectedOption.optionText", target = "selectedOption")
    @Mapping(source = "correctOption.optionText", target = "correctOption")
    @Mapping(source = "correct", target = "isCorrect")
    QuestionResponseDto toQuestionResponseDto(QuestionResponse questionResponse);



    default QuestionResponseList toQuestionResponseList(List<QuestionResponseDto> questionResponseDtoList){
        return new QuestionResponseList(questionResponseDtoList);
    }
}
