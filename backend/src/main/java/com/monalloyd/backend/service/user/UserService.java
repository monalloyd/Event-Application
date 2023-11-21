package com.monalloyd.backend.service.user;

import com.monalloyd.backend.model.User;
import com.monalloyd.backend.repository.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final UserDTOMapper userDTOMapper;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserDTOMapper userDTOMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userDTOMapper = userDTOMapper;
    }

    public UserRegistrationResult save(User user) {
        String password = passwordEncoder.encode(user.getPassword());
        user.setPassword(password);
        user.setAuthorities(Set.of("ROLE_USER"));

        try {
            User newUser = userRepository.save(user);
            return new UserRegistrationResult(Optional.of(newUser), Optional.empty());
        } catch(DataIntegrityViolationException exception) {
            String exceptionMsg = exception.getCause().getLocalizedMessage();
            String errorMessage = "";
            if(exceptionMsg.contains(user.getEmail())) {
                errorMessage = "Email already exists";
            }
            if(exceptionMsg.contains(user.getUsername())) {
                errorMessage = "Username already exists";
            }
            return new UserRegistrationResult(Optional.empty(), Optional.of(errorMessage));
        }
    }

    public List<UserDTO> findAll() {
        return userRepository.findAll(Sort.by("username"))
                .stream().map(userDTOMapper::userToDTO).toList();
    }

    public void delete(long id) {
        userRepository.deleteById(id);
    }
}
