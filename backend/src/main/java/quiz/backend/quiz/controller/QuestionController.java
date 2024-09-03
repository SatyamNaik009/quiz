package quiz.backend.quiz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import quiz.backend.quiz.dto.question.QuestionDetails;
import quiz.backend.quiz.dto.question.QuestionRegister;
import quiz.backend.quiz.dto.question.QuestionList;
import quiz.backend.quiz.service.interfac.QuestionService;

@RestController
@RequestMapping("/api/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping("/admin/add/{quizId}")
    public ResponseEntity<QuestionDetails> addQuestion(@RequestBody QuestionRegister questionRegister, @PathVariable Long quizId){
        QuestionDetails createdQuestionDetails=questionService.addQuestion(questionRegister,quizId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdQuestionDetails);
    }

    @GetMapping("/user/{quizId}")
    public ResponseEntity<QuestionList> getQuestions(@PathVariable Long quizId){
        QuestionList questionList=questionService.getAllQuestions(quizId);
        return ResponseEntity.ok(questionList);
    }

    @GetMapping("/user/question/{questionId}")
    public ResponseEntity<QuestionDetails> getQuestion(@PathVariable Long questionId) {
        QuestionDetails questionDetails = questionService.getQuestion(questionId);
        return ResponseEntity.ok(questionDetails);
    }

    @PutMapping("/admin/update/{questionId}")
    public ResponseEntity<QuestionDetails> updateQuestion(@RequestBody QuestionRegister questionRegister, @PathVariable Long questionId){
        QuestionDetails updatedQuestionDetails =questionService.updateQuestion(questionRegister,questionId);
        return ResponseEntity.status(HttpStatus.CREATED).body(updatedQuestionDetails);
    }

    @DeleteMapping("/admin/delete/{questionId}")
    public void deleteQuestion(@PathVariable Long questionId){
        questionService.deleteQuestion(questionId);
    }
}
