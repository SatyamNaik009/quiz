package quiz.backend.quiz.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import quiz.backend.quizAttempt.entity.QuizAttempt;
import quiz.backend.user.entity.User;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="quizzes")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="user_id")
    private User user;

    @OneToMany(mappedBy = "quiz",fetch = FetchType.LAZY,cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions=new ArrayList<>();

    @OneToMany(mappedBy = "quiz", fetch = FetchType.LAZY,cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuizAttempt> quizAttempts = new ArrayList<>();
}
