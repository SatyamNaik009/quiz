package quiz.backend.quiz.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import quiz.backend.quiz.dto.question.QuestionDetails;
import quiz.backend.quiz.dto.question.QuestionRegister;
import quiz.backend.quiz.dto.question.QuestionList;
import quiz.backend.quiz.entity.Question;
import quiz.backend.quiz.entity.Quiz;
import quiz.backend.quiz.mapper.QuestionMapper;
import quiz.backend.quiz.repository.QuestionRepository;
import quiz.backend.quiz.repository.QuizRepository;
import quiz.backend.quiz.service.interfac.QuestionService;
import quiz.backend.quizAttempt.entity.QuestionResponse;
import quiz.backend.quizAttempt.repository.QuestionResponseRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl implements QuestionService {
    @Autowired
    private QuizRepository quizRepository;
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private QuestionMapper questionMapper;
    @Autowired
    private QuestionResponseRepository questionResponseRepository;

    @Override
    public QuestionDetails addQuestion(QuestionRegister questionRegister, Long quizId) {
        Quiz quiz=quizRepository.findById(quizId).orElseThrow(()->new IllegalArgumentException("Quiz not found"));

        Question question=questionMapper.toQuestion(questionRegister);
        question.setQuiz(quiz);
        Question savedQuestion =questionRepository.save(question);
        return questionMapper.toQuestionDetails(savedQuestion);
    }

    @Override
    public QuestionList getAllQuestions(Long quizId) {
        List<Question> questions=questionRepository.findAllByQuizId(quizId);
        List<QuestionDetails> questionDetailsList=questions.stream()
                .map(questionMapper::toQuestionDetails)
                .collect(Collectors.toList());
        return questionMapper.toQuestionList(questionDetailsList);
    }

    @Override
    public QuestionDetails getQuestion(Long questionId) {
        Question question=questionRepository.findById(questionId).orElseThrow(()->new IllegalArgumentException("question not found"));
        return questionMapper.toQuestionDetails(question);
    }

    @Override
    public void deleteQuestion(Long questionId) {
        Question question=questionRepository.findById(questionId).orElseThrow(()->new IllegalArgumentException("question not found"));
        List<QuestionResponse> responses = questionResponseRepository.findByQuestionId(questionId);
        questionResponseRepository.deleteAll(responses);
        questionRepository.delete(question);
    }

    @Override
    public QuestionDetails updateQuestion(QuestionRegister questionRegister, Long questionId) {
        Question question=questionRepository.findById(questionId).orElseThrow(()->new IllegalArgumentException("question not found"));
        questionMapper.update(questionRegister,question);
        question=questionRepository.save(question);
        return questionMapper.toQuestionDetails(question);
    }

}
