package com.monalloyd.backend.controller;

import com.monalloyd.backend.service.user.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @DeleteMapping
    void delete(Authentication authentication) {
        userService.delete(authentication);
    }
}
