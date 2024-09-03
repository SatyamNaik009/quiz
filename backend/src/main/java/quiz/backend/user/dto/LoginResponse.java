package quiz.backend.user.dto;

public record LoginResponse(String name,Long userId,String token,String role,String expirationTime,String message) {
}
