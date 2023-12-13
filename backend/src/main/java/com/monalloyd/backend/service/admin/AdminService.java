package com.monalloyd.backend.service.admin;

import com.monalloyd.backend.model.User;
import com.monalloyd.backend.repository.UserRepository;
import com.monalloyd.backend.service.user.UserDeleter;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    private final UserRepository userRepository;
    private final UserDeleter userDeleter;

    public AdminService(UserRepository userRepository, UserDeleter userDeleter) {
        this.userRepository = userRepository;
        this.userDeleter = userDeleter;
    }

    public void delete(long id) {
        User user = userRepository.findById(id).get();
        User deletedUser = userDeleter.deleteUser(user);
        userRepository.save(deletedUser);
    }
}
