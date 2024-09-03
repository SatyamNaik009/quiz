package quiz.backend.quizAttempt.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import quiz.backend.quizAttempt.dto.*;
import quiz.backend.quizAttempt.entity.QuestionResponse;
import quiz.backend.quizAttempt.entity.QuizAttempt;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuizAttemptMapper {


    @Mapping(source = "selectedOption.optionText", target = "selectedOption")
    @Mapping(source = "correctOption.optionText", target = "correctOption")
    @Mapping(source = "correct", target = "correct")
    @Mapping(expression = "java(generateMessage(questionResponse.isCorrect()))", target = "message")
    OptionResponse toOptionResponse(QuestionResponse questionResponse);

    default String generateMessage(boolean correct) {
        return correct ? "Your answer is correct!" : "Your answer is incorrect.";
    }

    @Mapping(source="user.id",target="userId")
    @Mapping(source="quiz.id",target="quizId")
    @Mapping(source="quiz.title",target="quizTitle")
    QuizAttemptDetails toQuizAttemptDetails(QuizAttempt quizAttempt);

    default QuizAttemptList toQuizAttemptList(List<QuizAttemptDetails> quizAttemptDetailsList){
        return new QuizAttemptList(quizAttemptDetailsList);
    }

    @Mapping(source = "user.id",target="userId")
    @Mapping(source = "user.name",target="userName")
    @Mapping(source = "correctAnswers",target="score")
    UserScoreDTO toUserScoreDto(QuizAttempt quizAttempt);

    default UserScoreDtoList toUserScoreDtoList(List<UserScoreDTO> userScoreDTOList){
        return new UserScoreDtoList(userScoreDTOList);
    }

}
