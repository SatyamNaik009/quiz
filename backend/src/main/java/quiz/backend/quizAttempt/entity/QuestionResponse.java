package quiz.backend.quizAttempt.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import quiz.backend.quiz.entity.Option;
import quiz.backend.quiz.entity.Question;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "question_response")
public class QuestionResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "attempt_id")
    private QuizAttempt quizAttempt;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "selected_option_id")
    private Option selectedOption;

    @ManyToOne
    @JoinColumn(name = "correct_option_id")
    private Option correctOption;

    private boolean correct;
}
