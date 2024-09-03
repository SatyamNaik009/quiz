package quiz.backend.quiz.mapper;

import org.mapstruct.*;
import quiz.backend.quiz.dto.option.OptionDetails;
import quiz.backend.quiz.dto.option.OptionRegister;
import quiz.backend.quiz.dto.option.OptionList;
import quiz.backend.quiz.entity.Option;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OptionMapper {
    @Mapping(target="question",ignore=true)
    @Mapping(target="correct",ignore=true)
    Option toOption(OptionRegister optionRegister);

    @Mapping(source="question.id",target="questionId")
    @Mapping(source="id",target="optionId")
    OptionDetails toOptionDetails(Option option);

    default OptionList toOptionList(List<OptionDetails> options){
        return new OptionList(options);
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(OptionRegister optionRegister, @MappingTarget Option option);
}
