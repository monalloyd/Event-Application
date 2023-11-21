package com.monalloyd.backend.controller;

import com.monalloyd.backend.service.user.UserDTO;
import com.monalloyd.backend.service.user.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    List<UserDTO> getAll() {
        return userService.findAll();
    }

    @DeleteMapping("/{id}")
    void delete(@PathVariable long id) {
        userService.delete(id);
    }
}
