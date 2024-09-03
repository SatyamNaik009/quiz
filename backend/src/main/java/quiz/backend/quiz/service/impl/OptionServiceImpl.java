package quiz.backend.quiz.service.impl;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import quiz.backend.quiz.dto.option.OptionDetails;
import quiz.backend.quiz.dto.option.OptionRegister;
import quiz.backend.quiz.dto.option.OptionList;
import quiz.backend.quiz.entity.Option;
import quiz.backend.quiz.entity.Question;
import quiz.backend.quiz.mapper.OptionMapper;
import quiz.backend.quiz.repository.OptionRepository;
import quiz.backend.quiz.repository.QuestionRepository;
import quiz.backend.quiz.service.interfac.OptionService;
import quiz.backend.quizAttempt.repository.QuestionResponseRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OptionServiceImpl implements OptionService {
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private OptionRepository optionRepository;
    @Autowired
    private OptionMapper optionMapper;
    @Autowired
    private QuestionResponseRepository questionResponseRepository;

    @Override
    public OptionDetails addOption(OptionRegister optionRegister, Long questionId) {
        System.out.println("isCorrect in OptionRegister: " + optionRegister.correct());

        Question question = questionRepository.findById(questionId).orElseThrow(() -> new IllegalArgumentException("question not found"));
        Option option = optionMapper.toOption(optionRegister);

        System.out.println("isCorrect in Option after mapping: " + option.isCorrect());

        option.setQuestion(question);
        option.setCorrect(optionRegister.correct());
        Option savedOption = optionRepository.save(option);

        System.out.println("isCorrect in saved Option: " + savedOption.isCorrect());

        return optionMapper.toOptionDetails(savedOption);
    }

    @Override
    public OptionList getAllOptions(Long questionId) {
        List<Option> options=optionRepository.findAllByQuestionId(questionId);
        List<OptionDetails> optionDetailsList=options.stream()
                .map(optionMapper::toOptionDetails)
                .collect(Collectors.toList());
        return optionMapper.toOptionList(optionDetailsList);
    }

    @Override
    @Transactional
    public void deleteOption(Long optionId) {
        Option option=optionRepository.findById(optionId).orElseThrow(()-> new IllegalArgumentException("Option Not found"));
        questionResponseRepository.deleteBySelectedOptionId(optionId);
        questionResponseRepository.deleteByCorrectOptionId(optionId);
        optionRepository.delete(option);
    }

    @Override
    public OptionDetails updateOption(OptionRegister optionRegister, Long optionId) {
        Option option=optionRepository.findById(optionId).orElseThrow(()-> new IllegalArgumentException("Option Not found"));
        optionMapper.update(optionRegister,option);
        option=optionRepository.save(option);
        return optionMapper.toOptionDetails(option);
    }

    @Override
    public OptionDetails getOption(Long optionId) {
        Option option=optionRepository.findById(optionId).orElseThrow(()-> new IllegalArgumentException("Option Not found"));

        return optionMapper.toOptionDetails(option);
    }


}
