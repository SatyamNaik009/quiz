package quiz.backend.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import quiz.backend.user.dto.LoginRequest;
import quiz.backend.user.dto.LoginResponse;
import quiz.backend.user.dto.Register;
import quiz.backend.user.dto.UserProfile;
import quiz.backend.user.entity.User;
import quiz.backend.user.mapper.UserMapper;
import quiz.backend.user.repository.UserRepository;
import quiz.backend.user.util.JwtUtils;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserProfile register(Register register) throws Exception {


            if (userRepository.existsByEmail(register.email())) {
                throw new Exception(register.email() + "Already Exists");
            }
            User user=userMapper.toUser(register);
            user.setRole("NORMAL");
            user.setPassword(passwordEncoder.encode(register.password()));
            User savedUser = userRepository.save(user);
            return userMapper.toUserProfile(savedUser);

    }

    @Override
    public LoginResponse login(LoginRequest loginRequest) throws Exception {

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password()));
        var user = userRepository.findByEmail(loginRequest.email()).orElseThrow(() -> new UsernameNotFoundException("Username/Email not Found"));
        var token = jwtUtils.generateToken(user);

        return new LoginResponse(user.getName(),user.getId(), token, user.getRole(), "7days","Successful");
    }
}
