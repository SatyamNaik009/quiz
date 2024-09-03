package quiz.backend.quizAttempt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import quiz.backend.quizAttempt.dto.*;
import quiz.backend.quizAttempt.service.interfac.QuizAttemptService;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class QuizAttemptController {
    @Autowired
    private QuizAttemptService quizAttemptService;

    @PostMapping("/{userId}/quiz/{quizId}/question/{questionId}/submit/{optionId}")
    ResponseEntity<OptionResponse> isOptionCorrect(@PathVariable Long userId,@PathVariable Long quizId,@PathVariable Long questionId,@PathVariable Long optionId){
        OptionResponse optionResponse=quizAttemptService.isOptionCorrect(userId,quizId,questionId,optionId);
        return ResponseEntity.status(HttpStatus.CREATED).body(optionResponse);
    }

    @GetMapping("/{userId}/getAllAttemptedQuizzes")
    ResponseEntity<QuizAttemptList> getAllAttemptedQuizList(@PathVariable Long userId){
        QuizAttemptList quizAttemptList=quizAttemptService.getAllQuizAttemptsByUser(userId);
        return ResponseEntity.status(HttpStatus.OK).body(quizAttemptList);
    }

    @GetMapping("/{userId}/getAttemptedQuiz/{quizId}")
    ResponseEntity<QuizAttemptDetails> getAttemptedQuizList(@PathVariable Long userId, @PathVariable Long quizId){
        QuizAttemptDetails quizAttemptDetails=quizAttemptService.getQuizAttemptedByUser(userId,quizId);
        return ResponseEntity.status(HttpStatus.OK).body(quizAttemptDetails);
    }

    @GetMapping("/{userId}/getAttemptedQuizByUser/{quizId}")
    ResponseEntity<Boolean> getAttemptedQuizByUser(@PathVariable Long userId, @PathVariable Long quizId){
        Boolean f=quizAttemptService.getQuizAttemptedQuizByUser(userId,quizId);
        return ResponseEntity.status(HttpStatus.OK).body(f);
    }

    @GetMapping("/{userId}/getAttemptedQuizQuestionResponses/{quizId}")
    ResponseEntity<QuestionResponseList> getAllQuestionResponsesOfQuizByUser(@PathVariable Long userId,@PathVariable Long quizId){
        QuestionResponseList questionResponseList=quizAttemptService.getAllQuestionResponsesOfQuizByUser(userId,quizId);
        return ResponseEntity.status(HttpStatus.OK).body(questionResponseList);
    }

    @GetMapping("/quiz/{quizId}/scores")
    public ResponseEntity<UserScoreDtoList> getUserScores(@PathVariable Long quizId) {
        UserScoreDtoList userScores = quizAttemptService.getUserScoresForQuiz(quizId);
        return ResponseEntity.status(HttpStatus.OK).body(userScores);
    }
}
