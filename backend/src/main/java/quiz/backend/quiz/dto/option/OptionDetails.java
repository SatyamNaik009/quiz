package quiz.backend.quiz.dto.option;

public record OptionDetails(Long questionId,Long optionId,String optionText,boolean correct) {
}
