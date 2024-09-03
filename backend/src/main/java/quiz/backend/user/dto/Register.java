package quiz.backend.user.dto;

import jakarta.validation.constraints.NotNull;

public record Register(@NotNull(message = "Email must not be null")String email,
                       @NotNull(message = "Password must not be null")String password,
                       @NotNull(message = "Name must not be null")String name) {
}
