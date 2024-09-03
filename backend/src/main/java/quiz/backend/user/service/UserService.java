package quiz.backend.user.service;

import quiz.backend.user.dto.LoginRequest;
import quiz.backend.user.dto.LoginResponse;
import quiz.backend.user.dto.Register;
import quiz.backend.user.dto.UserProfile;

public interface UserService {
    UserProfile register(Register register) throws Exception;

    LoginResponse login(LoginRequest loginRequest) throws Exception;
}
