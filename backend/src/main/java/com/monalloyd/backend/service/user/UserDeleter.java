package com.monalloyd.backend.service.user;

import com.monalloyd.backend.model.User;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
public class UserDeleter {
    public User deleteUser(User user) {
        user.setAuthorities(new HashSet<>());
        user.setPassword("deleted" + user.getId());
        user.setEmail("deleted" + user.getId() + "@email.com");
        user.setUsername("deleted" + user.getId());
        user.setDeleted(true);
        return user;
    }
}
