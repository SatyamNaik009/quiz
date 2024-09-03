package quiz.backend.user.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import quiz.backend.quiz.dto.quiz.QuizList;
import quiz.backend.quiz.service.interfac.QuizService;
import quiz.backend.user.dto.LoginRequest;
import quiz.backend.user.dto.LoginResponse;
import quiz.backend.user.dto.Register;
import quiz.backend.user.dto.UserProfile;
import quiz.backend.user.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;
    @Autowired
    private QuizService quizService;

    @PostMapping("/register")
    public ResponseEntity<UserProfile> register(@RequestBody Register register) throws Exception {
        UserProfile response = userService.register(register);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) throws Exception {
        LoginResponse response = userService.login(loginRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/getAll")
    public ResponseEntity<QuizList> getAllQuizzes() {
        QuizList quizList = quizService.getAllQuizzes();
        return ResponseEntity.ok(quizList);
    }
}
