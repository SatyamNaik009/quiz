package quiz.backend.quiz.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="options")
public class Option {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String optionText;
    private boolean correct;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="Question_id")
    private Question question;
}
