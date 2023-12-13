package com.monalloyd.backend.controller;

import com.monalloyd.backend.service.admin.AdminService;
import com.monalloyd.backend.service.user.UserDTO;
import com.monalloyd.backend.service.user.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("admin")
public class AdminController {
    private final UserService userService;
    private final AdminService adminService;

    public AdminController(UserService userService, AdminService adminService) {
        this.userService = userService;
        this.adminService = adminService;
    }

    @GetMapping("/users")
    List<UserDTO> getAll() {
        return userService.findAll();
    }

    @DeleteMapping("/{id}")
    void deleteUserById(@PathVariable long id) {
        adminService.delete(id);
    }


}
