package quiz.backend.quiz.service.interfac;

import quiz.backend.quiz.dto.option.OptionDetails;
import quiz.backend.quiz.dto.option.OptionRegister;
import quiz.backend.quiz.dto.option.OptionList;

public interface OptionService {

    OptionDetails addOption(OptionRegister optionRegister,Long questionId);

    OptionList getAllOptions(Long questionId);

    void deleteOption(Long optionId);

    OptionDetails updateOption(OptionRegister optionRegister, Long optionId);

    OptionDetails getOption(Long optionId);
}
