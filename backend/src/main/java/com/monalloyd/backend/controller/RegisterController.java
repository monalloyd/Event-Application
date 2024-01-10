package com.monalloyd.backend.controller;

import com.monalloyd.backend.model.User;
import com.monalloyd.backend.service.user.UserRegistrationResult;
import com.monalloyd.backend.service.user.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("register")
public class RegisterController {
    private final UserService userService;

    public RegisterController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    UserRegistrationResult save(@RequestBody User user) {
        return userService.save(user);
    }
}
