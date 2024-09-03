package quiz.backend.user.dto;

import jakarta.validation.constraints.NotNull;

public record LoginRequest(@NotNull(message = "Email must not be null") String email,
                           @NotNull(message = "Password must not be null") String password) {
}
