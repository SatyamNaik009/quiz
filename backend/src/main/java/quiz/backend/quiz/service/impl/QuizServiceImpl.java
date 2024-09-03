package quiz.backend.quiz.service.impl;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import quiz.backend.quiz.dto.quiz.QuizDetails;
import quiz.backend.quiz.dto.quiz.QuizRegister;
import quiz.backend.quiz.dto.quiz.QuizList;
import quiz.backend.quiz.entity.Question;
import quiz.backend.quiz.entity.Quiz;
import quiz.backend.quiz.mapper.QuizMapper;
import quiz.backend.quiz.repository.QuestionRepository;
import quiz.backend.quiz.repository.QuizRepository;
import quiz.backend.quiz.service.interfac.QuizService;
import quiz.backend.quizAttempt.repository.QuestionResponseRepository;
import quiz.backend.quizAttempt.repository.QuizAttemptRepository;
import quiz.backend.user.entity.User;
import quiz.backend.user.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuizServiceImpl implements QuizService {
    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuizMapper quizMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionResponseRepository questionResponseRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;

    @Override
    public QuizDetails addQuiz(QuizRegister quizRegister, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Quiz quiz = quizMapper.toQuiz(quizRegister);
        quiz.setUser(user);
        Quiz savedQuiz = quizRepository.save(quiz);

        return quizMapper.toQuizDetails(savedQuiz);
    }

    @Override
    public QuizList getAllQuizzes(Long userId) {
        List<Quiz> quizzes = quizRepository.findAllByUserId(userId);
        List<QuizDetails> quizDetailsList = quizzes.stream()
                .map(quizMapper::toQuizDetails)
                .collect(Collectors.toList());
        return quizMapper.toQuizList(quizDetailsList);
    }

    @Override
    public QuizList getAllQuizzes() {
        List<Quiz> quizzes = quizRepository.findAll();
        List<QuizDetails> quizDetailsList = quizzes.stream()
                .map(quizMapper::toQuizDetails)
                .collect(Collectors.toList());
        return quizMapper.toQuizList(quizDetailsList);
    }

    @Override
    public QuizDetails getQuiz(Long quizId) {
        Quiz quiz=quizRepository.findById(quizId).orElseThrow(() -> new IllegalArgumentException("Quiz Not Found"));
        return quizMapper.toQuizDetails(quiz);
    }

    @Override
    public QuizDetails updateQuiz(QuizRegister quizRegister, Long quizId) {
        Quiz quiz=quizRepository.findById(quizId).orElseThrow(() -> new IllegalArgumentException("Quiz Not Found"));
        quizMapper.update(quizRegister,quiz);
        quiz=quizRepository.save(quiz);
        return quizMapper.toQuizDetails(quiz);
    }

    @Override
    @Transactional
    public void deleteQuiz(Long quizId) {
        Quiz quiz=quizRepository.findById(quizId).orElseThrow(() -> new IllegalArgumentException("Quiz Not Found"));

        List<Question> questions = questionRepository.findByQuizId(quizId);
        for (Question question : questions) {
            questionResponseRepository.deleteByQuestionId(question.getId());
        }

        // Then delete related QuizAttempts
        quizAttemptRepository.deleteByQuizId(quizId);
        quizRepository.delete(quiz);
    }
}
