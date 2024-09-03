package quiz.backend.quizAttempt.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import quiz.backend.quiz.entity.Option;
import quiz.backend.quiz.entity.Question;
import quiz.backend.quiz.entity.Quiz;
import quiz.backend.quiz.repository.OptionRepository;
import quiz.backend.quiz.repository.QuestionRepository;
import quiz.backend.quiz.repository.QuizRepository;
import quiz.backend.quizAttempt.dto.*;
import quiz.backend.quizAttempt.entity.QuestionResponse;
import quiz.backend.quizAttempt.entity.QuizAttempt;
import quiz.backend.quizAttempt.mapper.QuestionResponseMapper;
import quiz.backend.quizAttempt.mapper.QuizAttemptMapper;
import quiz.backend.quizAttempt.repository.QuestionResponseRepository;
import quiz.backend.quizAttempt.repository.QuizAttemptRepository;
import quiz.backend.quizAttempt.service.interfac.QuizAttemptService;
import quiz.backend.user.entity.User;
import quiz.backend.user.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuizAttemptServiceImpl implements QuizAttemptService {
    @Autowired
    private QuizAttemptRepository quizAttemptRepository;
    @Autowired
    private QuestionResponseRepository questionResponseRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private OptionRepository optionRepository;

    @Autowired
    private QuizAttemptMapper quizAttemptMapper;
    @Autowired
    private QuestionResponseMapper questionResponseMapper;


    @Override
    public QuizAttemptDetails getQuizAttemptedByUser(Long userId, Long quizId) {

        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new IllegalArgumentException("Quiz not found"));
        QuizAttempt quizAttempt=quizAttemptRepository.findByUserIdAndQuizId(userId,quizId);

        return quizAttemptMapper.toQuizAttemptDetails(quizAttempt);
    }

    @Override
    public OptionResponse isOptionCorrect(Long userId, Long quizId, Long questionId, Long optionId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new IllegalArgumentException("Quiz not found"));
        Question question = questionRepository.findById(questionId).orElseThrow(() -> new IllegalArgumentException("Question not found"));
        Option selectedOption = optionRepository.findById(optionId).orElseThrow(() -> new IllegalArgumentException("Option not found"));

        QuizAttempt attempt = quizAttemptRepository.findByUserAndQuiz(user, quiz)
                .orElseGet(() -> {
                    QuizAttempt newAttempt = new QuizAttempt();
                    newAttempt.setUser(user);
                    newAttempt.setQuiz(quiz);
                    newAttempt.setCorrectAnswers(0);
                    newAttempt.setTotalQuestions(quiz.getQuestions().size());
                    return quizAttemptRepository.save(newAttempt);
                });

        boolean isCorrect = selectedOption.isCorrect();
        if(!isCorrect){
            Option correctOption = question.getOptions().stream()
                    .filter(Option::isCorrect)
                    .findFirst()
                    .orElseThrow(() -> new IllegalStateException("Correct option not found"));
            QuestionResponse response = new QuestionResponse();
            response.setQuizAttempt(attempt);
            response.setQuestion(question);
            response.setSelectedOption(selectedOption);
            response.setCorrectOption(correctOption);
            response.setCorrect(false);
            questionResponseRepository.save(response);
            return quizAttemptMapper.toOptionResponse(response);
        }else{

            attempt.setCorrectAnswers(attempt.getCorrectAnswers() + 1);
            quizAttemptRepository.save(attempt);

            QuestionResponse response = new QuestionResponse();
            response.setQuizAttempt(attempt);
            response.setQuestion(question);
            response.setSelectedOption(selectedOption);
            response.setCorrectOption(selectedOption);
            response.setCorrect(true);
            questionResponseRepository.save(response);

            return quizAttemptMapper.toOptionResponse(response);
        }
    }

    @Override
    public QuizAttemptList getAllQuizAttemptsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        List<QuizAttempt> quizAttempts = quizAttemptRepository.findByUser(user);
        List<QuizAttemptDetails> quizAttemptDetailsList=quizAttempts.stream()
                .map(quizAttemptMapper::toQuizAttemptDetails)
                .collect(Collectors.toList());
        return quizAttemptMapper.toQuizAttemptList(quizAttemptDetailsList);
    }

    @Override
    public QuestionResponseList getAllQuestionResponsesOfQuizByUser(Long userId, Long quizId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new IllegalArgumentException("Quiz not found"));

        QuizAttempt quizAttempt = quizAttemptRepository.findByUserAndQuiz(user, quiz)
                .orElseThrow(() -> new IllegalArgumentException("No quiz attempt found for this user and quiz"));

        List<QuestionResponse> questionResponses = questionResponseRepository.findByQuizAttempt(quizAttempt);
        List<QuestionResponseDto> questionResponseDtoList=questionResponses.stream()
                .map(questionResponseMapper::toQuestionResponseDto)
                .collect(Collectors.toList());
        return questionResponseMapper.toQuestionResponseList(questionResponseDtoList);
    }

    @Override
    public UserScoreDtoList getUserScoresForQuiz(Long quizId) {
        List<QuizAttempt> quizAttemptAllUserDetails=quizAttemptRepository.findByQuizId(quizId);
        List<UserScoreDTO> userScoreDTOList=quizAttemptAllUserDetails.stream()
                .map(quizAttemptMapper::toUserScoreDto)
                .sorted((dto1, dto2) -> Integer.compare(dto2.score(), dto1.score()))
                .collect(Collectors.toList());


        return quizAttemptMapper.toUserScoreDtoList(userScoreDTOList);
    }

    @Override
    public Boolean getQuizAttemptedQuizByUser(Long userId, Long quizId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new IllegalArgumentException("Quiz not found"));
        QuizAttempt quizAttempt=quizAttemptRepository.findByUserIdAndQuizId(userId,quizId);
        if(quizAttempt==null)
        {
            return false;
        }
        else {
            return true;
        }
    }
}
