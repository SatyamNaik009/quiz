package quiz.backend.quiz.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String questionText;
    private String difficultyLevel;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="quiz_id")
    private Quiz quiz;

    @OneToMany(mappedBy = "question", fetch = FetchType.LAZY,cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Option> options=new ArrayList<>();
}
