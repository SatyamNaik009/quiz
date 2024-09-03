package quiz.backend.quiz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import quiz.backend.quiz.dto.question.QuestionDetails;
import quiz.backend.quiz.dto.question.QuestionRegister;
import quiz.backend.quiz.dto.quiz.QuizDetails;
import quiz.backend.quiz.dto.quiz.QuizRegister;
import quiz.backend.quiz.dto.quiz.QuizList;
import quiz.backend.quiz.service.interfac.QuizService;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {
    @Autowired
    private QuizService quizService;

    @PostMapping("/admin/add/{userId}")
    public ResponseEntity<QuizDetails> addQuiz(@RequestBody QuizRegister quizRegister, @PathVariable Long userId) {
        QuizDetails createdQuizDetails = quizService.addQuiz(quizRegister, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdQuizDetails);
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<QuizList> getQuizzes(@PathVariable Long userId) {
        QuizList quizList = quizService.getAllQuizzes(userId);
        return ResponseEntity.ok(quizList);
    }


    @GetMapping("/user/get/{quizId}")
    public ResponseEntity<QuizDetails> getQuiz(@PathVariable Long quizId) {
        QuizDetails quiz = quizService.getQuiz(quizId);
        return ResponseEntity.ok(quiz);
    }

    @PutMapping("/admin/update/{quizId}")
    public ResponseEntity<QuizDetails> updateQuiz(@RequestBody QuizRegister quizRegister, @PathVariable Long quizId){
        QuizDetails updatedQuizDetails =quizService.updateQuiz(quizRegister,quizId);
        return ResponseEntity.status(HttpStatus.CREATED).body(updatedQuizDetails);
    }

    @DeleteMapping("/admin/delete/{quizId}")
    public void deleteQuiz(@PathVariable Long quizId){
        quizService.deleteQuiz(quizId);
    }


}
